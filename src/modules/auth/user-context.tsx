"use client";

import { createContext, type PropsWithChildren, useContext } from "react";

import type { User } from "@/db";

const UserContext = createContext<User | null>(null);

type UserProviderProps = PropsWithChildren<{
  user: User | null;
}>;

export const UserProvider = ({ children, user }: UserProviderProps) => {
  return <UserContext value={user}>{children}</UserContext>;
};

export const useUser = () => {
  return useContext(UserContext);
};

export const useProtectedUser = () => {
  const user = useUser();

  if (!user) {
    throw new Error("User is not defined");
  }

  return user;
};
