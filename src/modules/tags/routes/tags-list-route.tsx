import type { RequestInfo } from "rwsdk/worker";

import { redirectToLoginResponse } from "@/modules/auth/server/middleware";
import { UserProvider } from "@/modules/auth/user-context";

export const TagsListRoute = ({ ctx }: RequestInfo) => {
  if (!ctx.user) {
    return redirectToLoginResponse();
  }

  return (
    <UserProvider user={ctx.user}>
      <span>TagsListRoute</span>
    </UserProvider>
  );
};
