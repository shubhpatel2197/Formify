"use client"
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { getUserSubscription } from '@/app/actions/userSubscriptions'
import { generateForm } from '@/actions/generateForm';
import { useFormState, useFormStatus } from 'react-dom';
import useSWR from 'swr';
import { auth } from '@/auth';
import { fetcher } from '@/app/utils/fetcher';
import { useSession, signIn } from "next-auth/react";
import { navigate } from '../actions/navigateToForm';
import { db } from '@/db'
import { users, forms } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Plus } from 'lucide-react';
import {usePlausible} from 'next-plausible'
import { SparklesCore } from '@/components/ui/sparklesCore';
import { cn } from '@/lib/utils';

type Props = {
  cnt:number
}

const initialState: {
  message: string;
  data?: any;
} = {
  message: ""
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Generating..." : "Generate"}
    </Button>
  );
}

const FormGenerator =   (props: Props) => {
 
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);
  const [active,setactive]= useState(true);
  const session = useSession();
  const plausible = usePlausible();

  useEffect(() => {
    if (state?.message === "success") {
      setOpen(false);
      navigate(state.data.formId);
    }

  }, [state?.message,state?.data?.formId])
  // const userId=session.data?.user;
  // const { data: forms, error } = useSWR(`/api/user/forms?userId=${userId}`, fetcher);
  // const formCount = forms ? forms.length : 0; // Handle case where forms might be undefined

  const onFormCreate = () => {
    plausible('create-form')
    console.log(props.cnt)
    if (session.data?.user){
      if(props.cnt<3){
        setOpen(true);
      }
    }
    else {
      signIn();
    }
  }
  
  // const s = await auth();
  // const userId = s?.user?.id;

  // if(userId){
  //   const subscription = await getUserSubscription({ userId });
  //   const userForms = await db.query.forms.findMany({
  //     where: eq(forms.userId, userId)
  //   })
  //   const userFormsCount = userForms.length;
  //   if(userFormsCount>3)setactive(false);
  // }

  return (
    
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={onFormCreate} disabled={!active}>
        <Plus className='w-4 h-4 mr-2 flex ' />
        Create Form</Button>
   
        
        {/* <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={1}
          particleDensity={1200}
          className="w-18 h-8 top-0"
          particleColor="#FFFFFF"
        /> */}
 
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-3 h-6 bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <div className='grid gap-4 py-4'>
            <Textarea id="description" name="description" required placeholder='Share what your form is about, who is it for, and what information you would like to collect. And AI will do the magic ✨' />
          </div>
          <DialogFooter>
            <SubmitButton />
            <Button variant="link">Create Manually</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormGenerator