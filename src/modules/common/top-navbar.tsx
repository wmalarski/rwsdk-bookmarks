import { Link } from "@/components/ui/link";
import { link } from "@/lib/links";

import { useUserContext } from "~/modules/auth/contexts/user-context";
import { BookmarkIcon } from "~/ui/icons/bookmark-icon";
import { Navbar, NavbarEnd, NavbarStart } from "~/ui/navbar/navbar";
import { SignOutButton } from "../auth/sign-out-button";
import { useI18n } from "../contexts/i18n";

export const TopNavbar = () => {
  const { t } = useI18n();

  const user = useUserContext();

  return (
    <Navbar>
      <NavbarStart class="gap-2">
        <h1>
          <Link
            className="flex items-center gap-1 text-md uppercase sm:text-xl lg:text-3xl"
            href={link("/")}
          >
            <BookmarkIcon class="size-6 min-w-6" />
            {t("info.title")}
          </Link>
        </h1>
        <Link
          className="text-sm uppercase sm:text-md lg:text-xl"
          href={link("/app/bookmark/tags")}
        >
          {t("tags.heading")}
        </Link>
        <Link
          className="text-sm uppercase sm:text-md lg:text-xl"
          href={link("/app/bookmark/share")}
        >
          {t("bookmarks.share")}
        </Link>
        <Link
          className="text-sm uppercase sm:text-md lg:text-xl"
          href={link("/app/bookmark/share")}
        >
          {t("bookmarks.history")}
        </Link>
      </NavbarStart>
      <NavbarEnd>
        {user() ? (
          <SignOutButton />
        ) : (
          <>
            <Link href={link("/user/signup")}>{t("auth.signUp")}</Link>
            <Link href={link("/user/login")}>{t("auth.signIn")}</Link>
          </>
        )}
      </NavbarEnd>
    </Navbar>
  );
};
