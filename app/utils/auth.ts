import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../prisma/prisma";
import authConfig from "./auth.config";
import type { Adapter } from "@auth/core/adapters";

const adapter: Adapter = {
  ...PrismaAdapter(prisma),
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
