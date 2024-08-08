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
          host: process.env.DATABASE_SERVER_DOMAIN,
          port: Number(`${process.env.DATABASE_SERVER_PORT}`), // revisit
          database: process.env.DATABASE_NAME,
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
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
