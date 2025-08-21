import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn signUpUrl="/sign-up" />
    </div>
  )
}