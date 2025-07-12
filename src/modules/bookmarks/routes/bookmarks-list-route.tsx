import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";

import { selectBookmarks } from "../server/db";

export const BookmarkListRoute = async ({ ctx }: ProtectedRequestInfo) => {
  const bookmarks = await selectBookmarks({
    page: 0,
    userId: ctx.user.id,
  });

  return <pre>{JSON.stringify({ bookmarks, user: ctx.user }, null, 2)}</pre>;
};
