import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { selectTags } from "@/modules/tags/server/functions";

import { BookmarkListItem } from "../components/bookmark-list-item";
import { selectBookmark } from "../server/functions";

export const BookmarkDetailsRoute = async ({
  ctx,
  params,
}: ProtectedRequestInfo) => {
  const userId = ctx.user.id;

  const [bookmark, tags] = await Promise.all([
    selectBookmark({ bookmarkId: params.id, userId }),
    selectTags({ page: 0, userId }),
  ]);

  if (!bookmark) {
    return new Response("Bookmark not found", { status: 404 });
  }

  return (
    <div className="p-4">
      <BookmarkListItem bookmark={bookmark} tags={tags} />
    </div>
  );
};
