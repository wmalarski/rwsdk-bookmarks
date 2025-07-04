"use client";
import type { RequestInfo } from "rwsdk/worker";

import { SignOutButton } from "@/modules/auth/sign-out-button";

export const Home = ({ ctx }: RequestInfo) => {
  return (
    <div>
      <p>
        {ctx.user?.email
          ? `You are logged in as user email ${ctx.user.email}`
          : "You are not logged in"}
      </p>
      <SignOutButton />
    </div>
  );
};
