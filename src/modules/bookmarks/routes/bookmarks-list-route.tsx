import { withUserProvider } from "@/modules/auth/with-user-provider";

import { selectBookmarks } from "../server/db";

export const BookmarkListRoute = withUserProvider(async (_request, user) => {
  const bookmarks = await selectBookmarks({
    page: 0,
    userId: user.id,
  });

  return <pre>{JSON.stringify({ bookmarks, user }, null, 2)}</pre>;
});
