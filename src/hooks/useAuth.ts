'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@/types'

export function useAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await fetchUserProfile(session.user.id)
          // Only redirect on initial sign in and if on an auth page
          if (event === 'INITIAL_SESSION' && (
            pathname === '/login' ||
            pathname === '/register' ||
            pathname === '/forgot-password'
          )) {
            router.push('/dashboard')
          }
        } else {
          setUser(null)
          // Only redirect on sign out and if not on an auth page
          if (event === 'SIGNED_OUT' && !pathname.startsWith('/login')) {
            router.push('/login')
          }
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, pathname])

  async function fetchUserProfile(userId: string) {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUser(profile)
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setUser(null)
    }
  }

  return { user, loading }
} 