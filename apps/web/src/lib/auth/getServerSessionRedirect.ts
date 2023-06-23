import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/route';

export async function getServerSessionRedirect() {
  // Use for protected server page components, it will redirect to root page if not authenticated, else it will return the session
  // Note: Don't use in root page component, it will cause infinite redirect loop
  const session = await getServerSession(AUTH_OPTIONS);
  if (session == null) {
    return redirect('/');
  }

  return session;
}
