import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from 'database';

export const AUTH_OPTIONS: NextAuthOptions = {
  debug: process.env['NODE_ENV'] === 'development',
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env['GITHUB_CLIENT_ID'],
      clientSecret: process.env['GITHUB_CLIENT_SECRET']
    }),
    DiscordProvider({
      clientId: process.env['DISCORD_CLIENT_ID'],
      clientSecret: process.env['DISCORD_CLIENT_SECRET']
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/' // TODO: Change this to the sign in page
  },
  secret: process.env['NEXTAUTH_SECRET']
};

const handler = NextAuth(AUTH_OPTIONS);

export { handler as GET, handler as POST };
