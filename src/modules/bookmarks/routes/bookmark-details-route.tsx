import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { selectTags } from "@/modules/tags/server/functions";

import { BookmarkDetails } from "../components/bookmark-details";
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

  return <BookmarkDetails bookmark={bookmark} tags={tags} user={ctx.user} />;
};
