"use client";

import { useUser } from "@/modules/auth/user-context";

export const TagsList = () => {
  const user = useUser();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};
