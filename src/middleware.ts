import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    
    // Create supabase client with proper configuration
    const supabase = createMiddlewareClient(
      { 
        req, 
        res,
      },
      {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // Check if the current route is an auth route (login, register, etc.)
    const isAuthRoute = req.nextUrl.pathname.startsWith('/login') || 
                       req.nextUrl.pathname.startsWith('/register') || 
                       req.nextUrl.pathname.startsWith('/forgot-password')
    
    const isApiRoute = req.nextUrl.pathname.startsWith('/api')
    const isPublicRoute = req.nextUrl.pathname === '/'
    const isStaticFile = req.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)

    // Allow public routes, API routes, and static files
    if (isPublicRoute || isApiRoute || isStaticFile) {
      return res
    }

    // If user is signed in and tries to access auth routes, redirect to dashboard
    if (session && isAuthRoute) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      return NextResponse.redirect(redirectUrl)
    }

    // If user is not signed in and tries to access protected routes, redirect to login
    if (!session && !isAuthRoute) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (logo.png, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js)$).*)',
  ],
} 