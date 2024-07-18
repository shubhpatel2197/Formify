import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, signIn } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { forms } from '@/db/schema'
import { getUserSubscription } from '@/app/actions/userSubscriptions'
import { Button } from '@/components/ui/button';

type Props = {}

const Page = async (props: Props) => {

  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    signIn();
    return;
  }

  const subscription = await getUserSubscription({ userId });
 
  // console.log(`User ID: ${userId}`);
  // console.log(`Number of forms: ${userForms.length}`);

  return (
    <div>
    {!subscription && (
      <div>Upgrade to premium to view analytics</div>
    )}
    {subscription && (
      <>
         <a href="https://plausible.io/formify-gold.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Button>View Analytics</Button>
        </a>
        <h1 className='py-4'>Go to Top pages and watch analytics of your forms</h1> 
      </>
    )}
  </div>
  )
}

export const metadata = {
    title: "Formify",
    description: "Generate and publish forms with the help of AI",
  }

export  default Page;
