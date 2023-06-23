import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { AUTH_OPTIONS } from './api/auth/[...nextauth]/route';
import { DefaultButton, ProviderButton } from '@/components/Buttons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Turborepo - Next.js + Express.js, GraphQL, Apollo, Prisma',
  description: 'Turborepo - Next.js + Express.js, GraphQL, Apollo, Prisma'
};

export default async function Home() {
  const session = await getServerSession(AUTH_OPTIONS);

  return (
    <main className='min-w-screen flex min-h-screen flex-col items-center justify-center'>
      <h1 className='mb-2'>Turborepo - Next.js + Express.js, GraphQL, Apollo, Prisma</h1>

      {session ? (
        <div className='flex flex-col items-center space-y-2'>
          <div>You are logged in as {session.user.email}</div>
          <DefaultButton isLogout />
        </div>
      ) : (
        <div className='flex flex-col space-y-2'>
          <ProviderButton provider='discord' />
          <ProviderButton provider='github' />
        </div>
      )}

      <Link href='/me' className='mt-2'>
        Go to me page
      </Link>
    </main>
  );
}
