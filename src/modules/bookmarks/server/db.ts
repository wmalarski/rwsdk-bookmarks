"use server";

import { db } from "@/db";

export type SelectBookmarksArgs = {
  userId: string;
  page: number;
};

const SELECT_BOOKMARKS_PAGE_SIZE = 10;

export const selectBookmarks = ({ userId, page }: SelectBookmarksArgs) => {
  return db.bookmark.findMany({
    include: { BookmarkTag: true },
    skip: SELECT_BOOKMARKS_PAGE_SIZE * page,
    take: SELECT_BOOKMARKS_PAGE_SIZE,
    where: { userId },
  });
};

export type BookmarkWithTags = Awaited<ReturnType<typeof selectBookmarks>>[0];

type DeleteBookmarkArgs = {
  bookmarkId: string;
  userId: string;
};

export const deleteBookmark = ({ userId, bookmarkId }: DeleteBookmarkArgs) => {
  return db.bookmark.delete({
    where: { id: bookmarkId, userId },
  });
};
