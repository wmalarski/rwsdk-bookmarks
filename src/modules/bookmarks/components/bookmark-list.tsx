"use client";

import { type PropsWithChildren, useMemo, useState } from "react";

import { Button } from "@/components/button";
import { Skeleton } from "@/components/skeleton";
import type { Tag, User } from "@/db";

import {
  type BookmarkWithTags,
  type SelectBookmarksArgs,
  selectMoreBookmarks,
} from "../server/functions";
import type { BookmarkFiltersSearchParams } from "../utils/bookmarks-filters-search-params";
import { BookmarksHistoryProvider } from "../utils/bookmarks-history";
import { BookmarkFilters } from "./bookmark-filters";
import { BookmarkListItem } from "./bookmark-list-item";

type BookmarkListPage = {
  page: number;
  items: BookmarkWithTags[];
};

type BookmarkListProps = {
  queryArgs: SelectBookmarksArgs;
  filterSearchParams: BookmarkFiltersSearchParams;
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
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState<BookmarkListPage[]>([]);

  const onLoadMoreClick = async () => {
    setIsLoading(true);

    try {
      const page = pages.length;
      const items = await selectMoreBookmarks({ ...queryArgs, page });
      setPages((current) => [...current, { items, page }]);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("[BookmarkList]", pages);

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
          {pages.map((page) => (
            <BookmarkListPart
              bookmarks={page.items}
              key={page.page}
              tags={tags}
              tagsMap={tagsMap}
            />
          ))}
          {isLoading ? <BookmarkListPlaceholder /> : null}
        </BookmarkListContainer>
        <Button
          intent="secondary"
          isDisabled={isLoading}
          isPending={isLoading}
          onPress={onLoadMoreClick}
          size="sm"
          type="button"
        >
          Load more
        </Button>
      </div>
    </BookmarksHistoryProvider>
  );
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
  const list = Array.from({ length: 3 }, (_value, index) => index);

  return (
    <>
      {list.map((index) => (
        <li key={index}>
          <Skeleton className="h-48 w-full" />
        </li>
      ))}
    </>
  );
};
