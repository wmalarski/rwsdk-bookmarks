import type { PropsWithChildren } from "react";
import { Link } from "react-aria-components";
import { useTranslation } from "react-i18next";

import { link } from "@/lib/links";

export const PageTitle = () => {
  const { t } = useTranslation();

  return (
    <h1 className="my-16 flex items-center text-center text-4xl uppercase sm:text-6xl">
      <Link href={link("/")}>{t("info.title")}</Link>
    </h1>
  );
};

export const PageFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="p-4">
      <Link
        className="text-xs"
        href="https://github.com/wmalarski/rwsdk-bookmarks"
      >
        {t("info.madeBy")}
      </Link>
    </footer>
  );
};

export const FormLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-auto flex flex-col items-center p-4">{children}</main>
  );
};

export const PageLayout = ({ children }: PropsWithChildren) => {
  return <main className="mx-auto flex flex-col items-center">{children}</main>;
};
