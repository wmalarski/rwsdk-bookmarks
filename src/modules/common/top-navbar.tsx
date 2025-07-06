import { IconBookmark } from "@intentui/icons";

import { Link } from "@/components/link";
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/navbar";
import { link } from "@/lib/links";

import { SignOutButton } from "../auth/components/sign-out-button";
import { useUser } from "../auth/user-context";
import { useI18n } from "../contexts/i18n";

export const TopNavbar = () => {
  const { t } = useI18n();

  const user = useUser();

  return (
    <NavbarProvider>
      <Navbar>
        <NavbarStart className="gap-2">
          <h1>
            <Link
              className="flex items-center gap-1 text-md uppercase sm:text-xl lg:text-3xl"
              href={link("/")}
            >
              <IconBookmark className="size-6 min-w-6" />
              {t("info.title")}
            </Link>
          </h1>
          <NavbarItem
            className="text-sm uppercase sm:text-md lg:text-xl"
            href={link("/app/bookmark/tags")}
          >
            {t("tags.heading")}
          </NavbarItem>
          <NavbarItem
            className="text-sm uppercase sm:text-md lg:text-xl"
            href={link("/app/bookmark/share")}
          >
            {t("bookmarks.share")}
          </NavbarItem>
          <NavbarItem
            className="text-sm uppercase sm:text-md lg:text-xl"
            href={link("/app/bookmark/share")}
          >
            {t("bookmarks.history")}
          </NavbarItem>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          {user ? (
            <SignOutButton />
          ) : (
            <>
              <NavbarItem href={link("/user/signup")}>
                {t("auth.signUp")}
              </NavbarItem>
              <NavbarItem href={link("/user/login")}>
                {t("auth.signIn")}
              </NavbarItem>
            </>
          )}
        </NavbarSection>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
      </NavbarMobile>
    </NavbarProvider>
  );
};
