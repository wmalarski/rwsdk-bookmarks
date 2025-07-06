import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "@/db";

export let auth: ReturnType<typeof getAuth>;

const getAuth = () => {
  return betterAuth({
    database: prismaAdapter(db, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
    },
  });
};

export const setupAuth = () => {
  auth = getAuth();
};
