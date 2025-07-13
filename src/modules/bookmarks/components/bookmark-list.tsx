import { type PropsWithChildren, Suspense } from "react";

import { Button } from "@/components/button";

import { RpcShow } from "~/modules/common/components/rpc-show";
import { Skeleton } from "~/ui/skeleton/skeleton";
import {
  SELECT_BOOKMARKS_DEFAULT_LIMIT,
  type SelectBookmarksArgs,
  selectBookmarksServerQuery,
} from "../server";
import type { BookmarkWithTags } from "../server/db";
import type { FiltersSearchParams } from "../utils/use-filters-search-params";
import { BookmarkFilters } from "./bookmark-filters";
import { BookmarkListItem } from "./bookmark-list-item";

type BookmarkListProps = {
  queryArgs: SelectBookmarksArgs;
  filterSearchParams: FiltersSearchParams;
  initialBookmarks: BookmarkWithTags[];
  count: number;
};

export const BookmarkList = ({
  filterSearchParams,
  initialBookmarks,
  queryArgs,
}: BookmarkListProps) => {
  const [offsets, setOffsets] = createWritableMemo<number[]>(
    () => filterSearchParams && [],
  );

  const onLoadMoreClick = () => {
    setOffsets((current) => {
      const lastOffset = current[current.length - 1] ?? 0;
      return [...current, lastOffset + SELECT_BOOKMARKS_DEFAULT_LIMIT + 1];
    });
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <div className="flex w-full justify-between gap-2">
        <h2 className="text-xl">Bookmarks</h2>
        <BookmarkFilters params={filterSearchParams} />
      </div>
      <BookmarkListContainer>
        <BookmarkListPart bookmarks={initialBookmarks} />
        {offsets().map((offset) => (
          <BookmarkLazy key={offset} offset={offset} queryArgs={queryArgs} />
        ))}
      </BookmarkListContainer>
      <Button intent="secondary" onClick={onLoadMoreClick} size="sm">
        Load more
      </Button>
    </div>
  );
};

type BookmarkLazyProps = {
  queryArgs: SelectBookmarksArgs;
  offset: number;
};

const BookmarkLazy = ({ offset, queryArgs }: BookmarkLazyProps) => {
  const bookmarks = createAsync(() =>
    selectBookmarksServerQuery({ offset: offset, ...queryArgs }),
  );

  return (
    <Suspense fallback={<BookmarkListLoadingPlaceholder />}>
      <RpcShow result={bookmarks()}>
        {(bookmarks) => <BookmarkListPart bookmarks={bookmarks().data ?? []} />}
      </RpcShow>
    </Suspense>
  );
};

type BookmarkListPartProps = {
  bookmarks: BookmarkWithTags[];
};

export const BookmarkListPart = ({ bookmarks }: BookmarkListPartProps) => {
  return (
    <>
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <BookmarkListItem bookmark={bookmark} />
        </li>
      ))}
    </>
  );
};

export const BookmarkListContainer = ({ children }: PropsWithChildren) => {
  return <ul className="flex flex-col gap-4">{children}</ul>;
};

export const BookmarkListPlaceholder = () => {
  return (
    <ul className="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <BookmarkListLoadingPlaceholder />
    </ul>
  );
};

const BookmarkListLoadingPlaceholder = () => {
  const list = Array.from({ length: 3 });

  return (
    <>
      {list.map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: this is correct
        <li key={index}>
          <Skeleton className="h-48 w-full" />
        </li>
      ))}
    </>
  );
};
