import type { RequestInfo } from "rwsdk/worker";

import { redirectToLoginResponse } from "@/modules/auth/server/middleware";
import { UserProvider } from "@/modules/auth/user-context";

import { selectBookmarks } from "../server/db";

export const BookmarkListRoute = async ({ ctx }: RequestInfo) => {
  if (!ctx.user) {
    return redirectToLoginResponse();
  }

  const bookmarks = await selectBookmarks({
    page: 0,
    userId: ctx.user.id,
  });

  return (
    <UserProvider user={ctx.user}>
      <pre>{JSON.stringify(bookmarks, null, 2)}</pre>
    </UserProvider>
  );
};
