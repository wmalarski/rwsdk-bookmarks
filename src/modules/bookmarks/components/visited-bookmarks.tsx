import { use } from "react";

import { useBookmarksHistory } from "~/modules/bookmarks/contexts/bookmarks-history";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { ClientOnly } from "~/ui/client-only/client-only";
import { selectBookmarksByIdsServerQuery } from "../server";
import { BookmarkListContainer, BookmarkListPart } from "./bookmark-list";

export const VisitedBookmarks = () => {
  return (
    <ClientOnly>
      <ClientVisitedBookmarks />
    </ClientOnly>
  );
};

const ClientVisitedBookmarks = () => {
  const history = useBookmarksHistory();

  const bookmarks = use(async () =>
    selectBookmarksByIdsServerQuery({
      bookmarkIds: history().ids,
    }),
  );

  return (
    <RpcShow result={bookmarks()}>
      {(bookmarks) => {
        const map = new Map(bookmarks().data.map((entry) => [entry.id, entry]));
        const matched = history().ids.flatMap((id) => {
          const value = map.get(id);
          return value ? [value] : [];
        });
        return (
          <BookmarkListContainer>
            <BookmarkListPart bookmarks={matched} />
          </BookmarkListContainer>
        );
      }}
    </RpcShow>
  );
};
