import Header from "@/components/ui/header";
import { SessionProvider } from 'next-auth/react';
import LandingPage from './landing-page';
import { auth } from '@/auth'
import { getUserSubscription } from '@/app/actions/userSubscriptions'
import { db } from '@/db'
import { forms } from '@/db/schema'
import { eq } from 'drizzle-orm'


export default  async function Home() {

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return null;
  }
  const subscription = await getUserSubscription({ userId });
  const userForms = await db.query.forms.findMany({
    where: eq(forms.userId, userId)
  })
  const userFormsCount = userForms.length;
 
  return (
    <SessionProvider>
      <Header />
      <main className="flex min-h-screen flex-col items-center relative p-24 bg:dark z-10 antialiased">
        <LandingPage  cnt={userFormsCount} />
      </main>
    </SessionProvider>
  );
}
