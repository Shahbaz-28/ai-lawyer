'use client'

import { useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }, [router])

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">AI Lawyer</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleSignOut}
              className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 