import { getServerSessionRedirect } from '@/lib';

export default async function MePage() {
  const session = await getServerSessionRedirect();

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
