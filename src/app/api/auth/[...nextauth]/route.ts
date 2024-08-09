import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import pool from "../../../data/data";
import UsersRepo from "../../../repos/user";

const authHandler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _req) {
        await pool.connect({
          connectionString: process.env.DATABASE_URL,
        });

        const user = await UsersRepo.findUserByEmail(credentials?.email || "");

        const comparePassword = await compare(
          credentials?.password || "",
          user.password
        );

        if (comparePassword) {
          return {
            id: user.id,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { authHandler as GET, authHandler as POST };
