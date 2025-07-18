import type { RequestInfo } from "rwsdk/worker";

import { LinkButton } from "@/components/link-button";
import { link } from "@/lib/links";
import { SignOutButton } from "@/modules/auth/components/sign-out-button";

export const Home = ({ ctx }: RequestInfo) => {
  return (
    <div>
      <p>
        {ctx.user?.email
          ? `You are logged in as user email ${ctx.user.email}`
          : "You are not logged in"}
      </p>
      {ctx.user?.email ? <SignOutButton /> : null}
      <LinkButton href={link("/user/login")} intent="primary">
        Login
      </LinkButton>
      <LinkButton href={link("/bookmarks")} intent="secondary">
        Bookmarks
      </LinkButton>
      <LinkButton href={link("/tags")}>Tags</LinkButton>
    </div>
  );
};
