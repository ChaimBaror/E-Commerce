import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is admin
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
    const userEmail = req.nextauth.token?.email as string | undefined;

    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!userEmail) {
        return NextResponse.redirect(new URL('/auth/signin?error=AccessDenied&callbackUrl=' + encodeURIComponent(req.nextUrl.pathname), req.url));
      }
      
      if (!adminEmails.includes(userEmail)) {
        console.log('Access denied for:', userEmail, 'Admin emails:', adminEmails);
        return NextResponse.redirect(new URL('/auth/signin?error=AccessDenied&callbackUrl=' + encodeURIComponent(req.nextUrl.pathname), req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Require authentication for admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};

