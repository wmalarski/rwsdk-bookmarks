"use client";
import { useTransition } from "react";

import { Button } from "@/components/button";
import { link } from "@/lib/links";

import { authClient } from "../auth-client";

export const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();

  const onSignOut = () => {
    startTransition(() => {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = link("/user/login");
          },
        },
      });
    });
  };

  return (
    <Button isDisabled={isPending} onPress={onSignOut}>
      {isPending ? "Logging out..." : "Log Out"}
    </Button>
  );
};
