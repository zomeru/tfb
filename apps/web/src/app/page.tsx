import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turborepo - Next.js + Express.js',
};

export default function Home() {
  return (
    <main className='min-h-screen min-w-screen flex items-center justify-center'>
      <h1>Turborepo - Next.js + Express.js</h1>
    </main>
  );
}
