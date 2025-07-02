"use client";
import { useTransition } from "react";
import type { RequestInfo } from "rwsdk/worker";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function Home({ ctx }: RequestInfo) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/user/login";
          },
        },
      });
    });
  };

  return (
    <div>
      <p>
        {ctx.user?.email
          ? `You are logged in as user email ${ctx.user.email}`
          : "You are not logged in"}
      </p>
      <Button isDisabled={isPending} onClick={handleSignOut}>
        {isPending ? "Logging out..." : "Log Out"}
      </Button>
    </div>
  );
}
