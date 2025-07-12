import { layout, route } from "rwsdk/router";

import { PageLayout } from "@/modules/common/layout";

import { BookmarkDetailsRoute } from "./bookmark-details-route";
import { BookmarkHistoryRoute } from "./bookmark-history-route";
import { BookmarkListRoute } from "./bookmarks-list-route";
import { ShareBookmarkRoute } from "./share-bookmark-route";

export const bookmarkRoutes = layout(PageLayout, [
  route("/", BookmarkListRoute),
  route("/share", ShareBookmarkRoute),
  route("/history", BookmarkHistoryRoute),
  route("/bookmark/:id", BookmarkDetailsRoute),
]);
