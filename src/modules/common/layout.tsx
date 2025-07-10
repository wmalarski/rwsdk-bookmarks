"use client";

import type { PropsWithChildren } from "react";
import { Link } from "react-aria-components";

import { link } from "@/lib/links";

import { TopNavbar } from "./top-navbar";

export const PageTitle = () => {
  return (
    <h1 className="my-16 flex items-center text-center text-4xl uppercase sm:text-6xl">
      <Link href={link("/")}>Rwsdk Bookmarks</Link>
    </h1>
  );
};

export const PageFooter = () => {
  return (
    <footer className="p-4">
      <Link
        className="text-xs"
        href="https://github.com/wmalarski/rwsdk-bookmarks"
      >
        Made by wmalarski
      </Link>
    </footer>
  );
};

export const FormLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center p-4">
      {children}
    </main>
  );
};

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto flex flex-col items-center">
      <TopNavbar />
      {children}
    </main>
  );
};

export const FormsLayout = ({ children }: PropsWithChildren) => {
  return (
    <FormLayout>
      <PageTitle />
      {children}
      <PageFooter />
    </FormLayout>
  );
};
