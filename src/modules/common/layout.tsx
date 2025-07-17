import type { PropsWithChildren } from "react";
import type { RequestInfo } from "rwsdk/worker";

import { Link } from "@/components/link";
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

type PageLayoutProps = PropsWithChildren<{
  requestInfo?: RequestInfo;
}>;

export const PageLayout = ({ children, requestInfo }: PageLayoutProps) => {
  return (
    <main className="mx-auto flex min-h-screen flex-col items-center bg-bg">
      <TopNavbar user={requestInfo?.ctx.user} />
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
