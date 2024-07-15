import NextAuth from "next-auth";
import { User, Role } from "@prisma/client"; // Import Role here if needed

declare module "next-auth" {
  interface User {
    role: Role; // Add role to the User type
  }

  interface Session {
    user: {
      role: Role; // Add role to the session user
    } & DefaultSession['user'];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role; // Add role to the JWT token
  }
}
