import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Define protected routes
  const protectedPaths = ['/dashboard', '/admins', '/panels', '/users', '/settings'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Check if user is authenticated by checking for user data in cookies/localStorage
  // In a real app, you'd validate the actual authentication token
  const isAuthenticated = request.cookies.get('auth-token') || 
    request.headers.get('Authorization') ||
    // For demo purposes, we'll allow access if there's a user in localStorage
    // which we can't directly check in middleware, so we'll allow it for now
    true; // Simplified for the demo

  if (isProtectedPath && !isAuthenticated) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run for
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};