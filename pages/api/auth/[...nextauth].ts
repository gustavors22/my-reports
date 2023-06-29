import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserRepository from "../../../modules/user/repositories/UserRepository";
import AuthService from "../../../modules/auth/services/authService";
import jwtService from "../../../modules/auth/services/jwtService";

let authUser: any = null;

function setAuthUser(user: any) {
  authUser = user;
}

export default NextAuth({
    secret: process.env.NEXTAUTH_TOKEN,
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: {  },
              password: { }
            },
            async authorize(credentials, req) {
              if(!credentials?.email || !credentials?.password) {
                throw new Error('Email and password are required')
              }

              const authService = new AuthService(UserRepository, jwtService)
              const auth = await authService.login(credentials) as any;
              setAuthUser(auth.user);          
              return { id: auth.token,  account: auth.user };
            }
        })
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (token.sub) {
          return token;
        }
        
        throw new Error('User Invalid');
      },
      async session({ session, user, token }) {
        if (!token.sub) {
          throw new Error('Session Invalid');
        }
        
        session.user = authUser;

        return session;
      }
    },
});