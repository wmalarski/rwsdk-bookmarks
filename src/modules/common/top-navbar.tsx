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

export const TopNavbar = () => {
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
              Rwsdk Bookmarks
            </Link>
          </h1>
          <NavbarItem
            className="text-sm uppercase sm:text-md lg:text-xl"
            href={link("/app/bookmark/tags")}
          >
            Tags
          </NavbarItem>
          <NavbarItem
            className="text-sm uppercase sm:text-md lg:text-xl"
            href={link("/app/bookmark/share")}
          >
            Share
          </NavbarItem>
          <NavbarItem
            className="text-sm uppercase sm:text-md lg:text-xl"
            href={link("/app/bookmark/share")}
          >
            History
          </NavbarItem>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          {user ? (
            <SignOutButton />
          ) : (
            <>
              <NavbarItem href={link("/user/signup")}>Sign Up</NavbarItem>
              <NavbarItem href={link("/user/login")}>Sign In</NavbarItem>
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
