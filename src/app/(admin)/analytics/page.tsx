import React from 'react'
import { auth, signIn } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

type Props = {}

const page = async (props: Props) => {

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    signIn();
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id)
  })

  const plan = user?.subscribed ? 'premium' : 'free';

  return (
    <div >
      <iframe
        plausible-embed="true"
        src="https://plausible.io/formify-gold.vercel.app/analytics?embed=true&theme=dark&background=transparent"
        scrolling="no"
        frameBorder="0"
        loading="lazy"
        style={{ width: '1px', minWidth: '100%', height: '1600px' }}
      ></iframe>

      <div style={{ fontSize: '14px', paddingBottom: '14px' }}>
        Stats powered by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#4F46E5', textDecoration: 'underline' }}
          href="https://plausible.io"
        >
          Plausible Analytics
        </a>
      </div>
      <script async src="https://plausible.io/js/embed.host.js"></script>
      </div>
  )
}

export default page