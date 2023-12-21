import authConfig from "./utils/auth.config";
import NextAuth from "next-auth";
export const { auth: middleware } = NextAuth(authConfig);
