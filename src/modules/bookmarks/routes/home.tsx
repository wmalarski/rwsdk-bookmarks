import type { RequestInfo } from "rwsdk/worker";

import { SignOutButton } from "@/modules/auth/components/sign-out-button";
import { UserProvider } from "@/modules/auth/user-context";

export const Home = ({ ctx }: RequestInfo) => {
  return (
    <UserProvider user={ctx.user}>
      <div>
        <p>
          {ctx.user?.email
            ? `You are logged in as user email ${ctx.user.email}`
            : "You are not logged in"}
        </p>
        {ctx.user?.email ? <SignOutButton /> : null}
      </div>
    </UserProvider>
  );
};
