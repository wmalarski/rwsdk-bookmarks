import type { RequestInfo } from "rwsdk/worker";

import { redirectToLoginResponse } from "@/modules/auth/server/middleware";

import { selectBookmarks } from "../services/db";

export const BookmarkListRoute = async ({ ctx }: RequestInfo) => {
  if (!ctx.user) {
    return redirectToLoginResponse();
  }

  const bookmarks = await selectBookmarks({
    page: 0,
    userId: ctx.user.id,
  });

  return <pre>{JSON.stringify(bookmarks, null, 2)}</pre>;
};
