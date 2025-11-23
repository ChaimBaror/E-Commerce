import { Session } from 'next-auth';

/**
 * Check if a user is an admin based on their email
 * @param session - NextAuth session object
 * @returns boolean indicating if user is admin
 */
export function isAdmin(session: Session | null): boolean {
  if (!session?.user?.email) {
    return false;
  }

  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  return adminEmails.includes(session.user.email);
}

/**
 * Get list of admin emails from environment variables
 * @returns array of admin email addresses
 */
export function getAdminEmails(): string[] {
  return process.env.ADMIN_EMAILS?.split(',').map((email) => email.trim()) || [];
}

