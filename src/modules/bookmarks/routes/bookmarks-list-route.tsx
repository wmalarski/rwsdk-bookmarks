import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { selectTags } from "@/modules/tags/server/db";

import { BookmarkList } from "../components/bookmark-list";
import { selectBookmarks } from "../server/db";

export const BookmarkListRoute = async ({ ctx }: ProtectedRequestInfo) => {
  const [bookmarks, tags] = await Promise.all([
    selectBookmarks({ page: 0, userId: ctx.user.id }),
    selectTags({ page: 0, userId: ctx.user.id }),
  ]);

  return (
    <BookmarkList
      filterSearchParams={{ done: "all", random: "off", "tags[]": [] }}
      initialBookmarks={bookmarks}
      queryArgs={{ page: 0, userId: ctx.user.id }}
      tags={tags}
    />
  );
};
