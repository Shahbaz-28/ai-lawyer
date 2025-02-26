import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="AI Lawyer Logo"
              width={48}
              height={48}
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Reset your password
            </h2>
          </div>
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  )
} 