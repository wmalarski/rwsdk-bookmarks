import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { selectTags } from "@/modules/tags/server/functions";

import { BookmarkList } from "../components/bookmark-list";
import { selectBookmarks } from "../server/functions";
import { parseFiltersSearchParams } from "../utils/bookmarks-filters-search-params";

export const BookmarkListRoute = async ({
  ctx,
  request,
}: ProtectedRequestInfo) => {
  const userId = ctx.user.id;
  const url = new URL(request.url);
  const params = parseFiltersSearchParams(url.searchParams);

  const [bookmarks, tags] = await Promise.all([
    selectBookmarks({ page: 0, userId }),
    selectTags({ page: 0, userId }),
  ]);

  return (
    <BookmarkList
      filterSearchParams={params}
      initialBookmarks={bookmarks}
      queryArgs={{ page: 0, userId }}
      tags={tags}
      user={ctx.user}
    />
  );
};
