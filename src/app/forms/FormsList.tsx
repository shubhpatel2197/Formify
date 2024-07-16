"use client"
import React from 'react'
import { forms } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HoverEffect } from '@/components/ui/card-hover-effect';


type Form = InferSelectModel<typeof forms>;

type Props = {
  forms: Form[]
}

const FormsList = (props: Props) => {
  const forms = props.forms.map((form) => ({
    title: form.name ?? "Untitled Form",
    description: form.description ?? "No description available",
    link: `/forms/edit/${form.id}`
  }));
  return (
    <div >
      {/* {props.forms.map((form: Form) => (<Card key={form.id} className='max-w-[350px] flex flex-col'>
      <CardHeader className='flex-1'>
        <CardTitle>
          {form.name}
        </CardTitle>
        <CardDescription>
          {form.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link className="w-full" href={`/forms/edit/${form.id}`}>
          <Button className='w-full'>View</Button>
        </Link>
      </CardFooter> */}
    {/* </Card>))} */}
    {forms.length > 0 ? (
        <HoverEffect items={forms} />
      ) : (
        <div>No forms available</div>
      )}
    </div>
    
  )
}

export default FormsList