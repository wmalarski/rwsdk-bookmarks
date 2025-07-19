"use server";

import { requestInfo } from "rwsdk/worker";

import { db } from "@/db";
import { getUserId } from "@/modules/auth/server/get-user-id";

export type SelectBookmarksArgs = {
  userId: string;
  page: number;
};

const SELECT_BOOKMARKS_PAGE_SIZE = 10;

export const selectBookmarks = ({ page, userId }: SelectBookmarksArgs) => {
  return db.bookmark.findMany({
    include: { BookmarkTag: true },
    skip: SELECT_BOOKMARKS_PAGE_SIZE * page,
    take: SELECT_BOOKMARKS_PAGE_SIZE,
    where: { userId },
  });
};

export type BookmarkWithTags = Awaited<ReturnType<typeof selectBookmarks>>[0];

export type DeleteBookmarkArgs = {
  bookmarkId: string;
};

export const deleteBookmark = ({ bookmarkId }: DeleteBookmarkArgs) => {
  const userId = getUserId(requestInfo);

  return db.bookmark.delete({
    where: { id: bookmarkId, userId },
  });
};

export type CompleteBookmarkArgs = {
  bookmarkId: string;
  done: boolean;
  note?: string;
  rate?: number;
};

export const completeBookmark = ({
  bookmarkId,
  done,
  note,
  rate,
}: CompleteBookmarkArgs) => {
  const userId = getUserId(requestInfo);
  const date = new Date();

  return db.bookmark.update({
    data: { done, doneAt: date, note, rate, updatedAt: date },
    where: { id: bookmarkId, userId },
  });
};

export type UpdateBookmarkArgs = {
  bookmarkId: string;
  preview?: string;
  text?: string;
  url?: string;
};

export const updateBookmark = ({
  bookmarkId,
  preview,
  text,
  url,
}: UpdateBookmarkArgs) => {
  const userId = getUserId(requestInfo);
  const date = new Date();

  return db.bookmark.update({
    data: { preview, text, updatedAt: date, url },
    where: { id: bookmarkId, userId },
  });
};
