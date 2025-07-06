"use client";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const onSignOut = () => {
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
    <Button isDisabled={isPending} onClick={onSignOut}>
      {isPending ? "Logging out..." : "Log Out"}
    </Button>
  );
};
