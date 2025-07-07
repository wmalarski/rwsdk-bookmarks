import { createWritableMemo } from "@solid-primitives/memo";
import { createAsync } from "@solidjs/router";
import { type Component, For, type ParentProps, Suspense } from "solid-js";

import { RpcShow } from "~/modules/common/components/rpc-show";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { Skeleton } from "~/ui/skeleton/skeleton";
import {
  type BookmarkWithTagsModel,
  SELECT_BOOKMARKS_DEFAULT_LIMIT,
  type SelectBookmarksArgs,
  selectBookmarksServerQuery,
} from "../server";
import type { FiltersSearchParams } from "../utils/use-filters-search-params";
import { BookmarkFilters } from "./bookmark-filters";
import { BookmarkListItem } from "./bookmark-list-item";

type BookmarkListProps = {
  queryArgs: SelectBookmarksArgs;
  filterSearchParams: FiltersSearchParams;
  initialBookmarks: BookmarkWithTagsModel[];
  count: number;
};

export const BookmarkList: Component<BookmarkListProps> = (props) => {
  const { t } = useI18n();

  const [offsets, setOffsets] = createWritableMemo<number[]>(
    () => props.filterSearchParams && [],
  );

  const onLoadMoreClick = () => {
    setOffsets((current) => {
      const lastOffset = current[current.length - 1] ?? 0;
      return [...current, lastOffset + SELECT_BOOKMARKS_DEFAULT_LIMIT + 1];
    });
  };

  return (
    <div class="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <div class="flex w-full justify-between gap-2">
        <h2 class="text-xl">{t("bookmarks.title")}</h2>
        <BookmarkFilters params={props.filterSearchParams} />
      </div>
      <BookmarkListContainer>
        <BookmarkListPart bookmarks={props.initialBookmarks} />
        <For each={offsets()}>
          {(offset) => (
            <BookmarkLazy offset={offset} queryArgs={props.queryArgs} />
          )}
        </For>
      </BookmarkListContainer>
      <Button color="secondary" onClick={onLoadMoreClick} size="sm">
        {t("bookmarks.loadMore")}
      </Button>
    </div>
  );
};

type BookmarkLazyProps = {
  queryArgs: SelectBookmarksArgs;
  offset: number;
};

const BookmarkLazy: Component<BookmarkLazyProps> = (props) => {
  const bookmarks = createAsync(() =>
    selectBookmarksServerQuery({ offset: props.offset, ...props.queryArgs }),
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
  bookmarks: BookmarkWithTagsModel[];
};

export const BookmarkListPart: Component<BookmarkListPartProps> = (props) => {
  return (
    <For each={props.bookmarks}>
      {(bookmark) => (
        <li>
          <BookmarkListItem bookmark={bookmark} />
        </li>
      )}
    </For>
  );
};

export const BookmarkListContainer: Component<ParentProps> = (props) => {
  return <ul class="flex flex-col gap-4">{props.children}</ul>;
};

export const BookmarkListPlaceholder: Component = () => {
  return (
    <ul class="flex w-full max-w-xl flex-col gap-2 px-2 py-4">
      <BookmarkListLoadingPlaceholder />
    </ul>
  );
};

const BookmarkListLoadingPlaceholder: Component = () => {
  const list = Array.from({ length: 3 });

  return (
    <For each={list}>
      {() => (
        <li>
          <Skeleton class="h-48 w-full" />
        </li>
      )}
    </For>
  );
};
