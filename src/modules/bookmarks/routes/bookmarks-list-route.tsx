import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { selectTags } from "@/modules/tags/server/functions";

import { BookmarkList } from "../components/bookmark-list";
import { selectBookmarks } from "../server/functions";

export const BookmarkListRoute = async ({ ctx }: ProtectedRequestInfo) => {
  const userId = ctx.user.id;

  const [bookmarks, tags] = await Promise.all([
    selectBookmarks({ page: 0, userId }),
    selectTags({ page: 0, userId }),
  ]);

  return (
    <BookmarkList
      filterSearchParams={{ done: "all", random: "off", "tags[]": [] }}
      initialBookmarks={bookmarks}
      queryArgs={{ page: 0, userId }}
      tags={tags}
      user={ctx.user}
    />
  );
};
