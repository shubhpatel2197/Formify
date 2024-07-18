"use server";

import { db } from "@/db";
import { forms, questions as dbQuestions, fieldOptions } from "@/db/schema";
import { auth } from "@/auth";
import { InferInsertModel, eq } from "drizzle-orm";

type Form = InferInsertModel<typeof forms>;
type Question = InferInsertModel<typeof dbQuestions>;
type FieldOption = InferInsertModel<typeof fieldOptions>;

interface SaveFormData extends Form {
  questions: Array<Question & { fieldOptions?: FieldOption[] }>;
}

const CHUNK_SIZE = 5; // Adjust this size based on your needs

async function insertInChunks<T>(tx: any, items: T[], insertFn: (item: T) => Promise<void>) {
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(insertFn));
  }
}

export async function saveForm(data: SaveFormData) {
  const { name, description, questions } = data;
  const session = await auth();
  const userId = session?.user?.id;

  const newForm = await db
    .insert(forms)
    .values({
      name,
      description,
      userId,
      published: false,
    })
    .returning({ insertedId: forms.id });
  const formId = newForm[0].insertedId;

  const newQuestions = questions.map((question) => ({
    text: question.text,
    fieldType: question.fieldType,
    formId,
    fieldOptions: question.fieldOptions,
  }));

  await db.transaction(async (tx) => {
    await insertInChunks(tx, newQuestions, async (question) => {
      const [{ questionId }] = await tx
        .insert(dbQuestions)
        .values({
          text: question.text,
          fieldType: question.fieldType,
          formId: question.formId,
        })
        .returning({ questionId: dbQuestions.id });

      if (question.fieldOptions && question.fieldOptions.length > 0) {
        const options = question.fieldOptions.map((option) => ({
          text: option.text,
          value: option.value,
          questionId,
        }));
        await insertInChunks(tx, options, async (option: FieldOption) => {
          await tx.insert(fieldOptions).values(option);
        });
      }
    });
  });

  return formId;
}

export async function publishForm(formId: number) {
  await db.update(forms).set({ published: true }).where(eq(forms.id, formId));
}
