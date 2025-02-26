import LoginForm from '@/components/auth/LoginForm'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
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
              Welcome back
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Right side - Image/Banner */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 to-indigo-700">
          <div className="absolute inset-0 bg-opacity-75 flex flex-col justify-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">
              AI-Powered Legal Assistance
            </h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Instant Legal Guidance
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Document Analysis
              </li>
              <li className="flex items-center">
                <svg
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                24/7 Assistance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 