import type { RequestInfo } from "rwsdk/worker";

import { Link } from "@/components/link";
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
      <Link href={link("/user/login")}>Login</Link>
      <Link href={link("/bookmarks")}>Bookmarks</Link>
    </div>
  );
};
