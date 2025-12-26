import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 });
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
    const isAdmin = adminEmails.includes(session.user.email);

    return NextResponse.json({ 
      isAdmin,
      email: session.user.email,
      adminEmails: adminEmails.length > 0 ? adminEmails : 'No admin emails configured'
    });
  } catch (error: unknown) {
    console.error('Error checking admin status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { isAdmin: false, error: errorMessage },
      { status: 500 }
    );
  }
}

