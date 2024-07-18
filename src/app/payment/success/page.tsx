import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'


const page = () => {
  return (
    <Alert variant="default">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your account has been updated. <Link href="/view-forms" className='underline'>Go to the dashboard</Link> to create more forms</AlertDescription>
    </Alert>
  )
}

export const metadata = {
  title: "Formify",
  description: "Generate and publish forms with the help of AI",
}

export default page