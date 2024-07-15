import NextAuth from "next-auth"
// import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import prisma from './connect'
import { Role } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    profile(profile) {
      return {
        id: profile.sub,
        name: `${profile.given_name} ${profile.family_name}`,
        email: profile.email,
        image: profile.picture,
        role: (profile.role as Role) || Role.USER,
      };
    },
  })
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
})