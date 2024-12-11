import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define public paths
  const isPublicPath = path === '/'

  // Check if user is authenticated (has email in localStorage)
  const hasAuth = request.cookies.has('userEmail')

  // Redirect logic
  if (!isPublicPath && !hasAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isPublicPath && hasAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure paths that need authentication
export const config = {
  matcher: ['/', '/dashboard/:path*']
} 