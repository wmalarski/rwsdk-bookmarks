"use client";

import { type PropsWithChildren, useMemo, useState } from "react";

import { Button } from "@/components/button";
import { Skeleton } from "@/components/skeleton";
import type { Tag, User } from "@/db";

import type {
  BookmarkWithTags,
  SelectBookmarksArgs,
} from "../server/functions";
import { BookmarksHistoryProvider } from "../utils/bookmarks-history";
import type { FiltersSearchParams } from "../utils/use-filters-search-params";
import { BookmarkFilters } from "./bookmark-filters";
import { BookmarkListItem } from "./bookmark-list-item";

type BookmarkListProps = {
  queryArgs: SelectBookmarksArgs;
  filterSearchParams: FiltersSearchParams;
  initialBookmarks: BookmarkWithTags[];
  user: User;
  tags: Tag[];
};

export const BookmarkList = ({
  filterSearchParams,
  initialBookmarks,
  queryArgs,
  tags,
  user,
}: BookmarkListProps) => {
  const [offsets, setOffsets] = useState<number[]>(
    () => filterSearchParams && [],
  );

  const onLoadMoreClick = () => {
    setOffsets((current) => {
      const lastOffset = current[current.length - 1] ?? 0;
      return [...current, lastOffset + 1];
    });
  };

  const tagsMap = useMemo(() => {
    return new Map(tags.map((tag) => [tag.id, tag]));
  }, [tags]);

  return (
    <BookmarksHistoryProvider userId={user.id}>
      <div className="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
        <div className="flex w-full justify-between gap-2">
          <h2 className="text-xl">Bookmarks</h2>
          <BookmarkFilters params={filterSearchParams} tags={tags} />
        </div>
        <BookmarkListContainer>
          <BookmarkListPart
            bookmarks={initialBookmarks}
            tags={tags}
            tagsMap={tagsMap}
          />
          {offsets.map((offset) => (
            <BookmarkLazy key={offset} offset={offset} queryArgs={queryArgs} />
          ))}
        </BookmarkListContainer>
        <Button intent="secondary" onPress={onLoadMoreClick} size="sm">
          Load more
        </Button>
      </div>
    </BookmarksHistoryProvider>
  );
};

type BookmarkLazyProps = {
  queryArgs: SelectBookmarksArgs;
  offset: number;
};

const BookmarkLazy = ({
  offset: _offset,
  queryArgs: _queryArgs,
}: BookmarkLazyProps) => {
  // const bookmarks = createAsync(() =>
  //   selectBookmarksServerQuery({ offset: offset, ...queryArgs }),
  // );

  return null;
  // <Suspense fallback={<BookmarkListLoadingPlaceholder />}>
  //   <RpcShow result={bookmarks()}>
  //     {(bookmarks) => <BookmarkListPart bookmarks={bookmarks().data ?? []} />}
  //   </RpcShow>
  // </Suspense>
};

type BookmarkListPartProps = {
  bookmarks: BookmarkWithTags[];
  tags: Tag[];
  tagsMap: Map<string, Tag>;
};

export const BookmarkListPart = ({
  bookmarks,
  tags,
  tagsMap,
}: BookmarkListPartProps) => {
  return (
    <>
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <BookmarkListItem bookmark={bookmark} tags={tags} tagsMap={tagsMap} />
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
