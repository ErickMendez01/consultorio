import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        code: { label: "Código", type: "text", placeholder: "1234567890" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findFirst({
          where: {
            codigo: credentials?.code!,
            password: credentials?.password!,
          },
          select: {
            id: true,
            role: true,
            codigo: true,
          },
        });

        if (user) {
          return {
            id: user.id,
            role: user.role,
            codigo: user.codigo,
          };
        }
        return null
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id,
          role: token.role,
          codigo: token.codigo,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          id: user.id,
          role: user.role,
          codigo: user.codigo,
        };
      }

      const dbUser = await db.user.findFirst({
        where: {
          codigo: token.codigo,  
        },
        select: {
          id: true,
          role: true,
          codigo: true,
        },
      });

      if (dbUser) {
        return {
          id: dbUser.id,
          role: dbUser.role,
          codigo: dbUser.codigo,
        };
      }

      return token
    },
  },
};