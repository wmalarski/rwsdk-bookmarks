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

export type SelectBookmarkArgs = {
  userId: string;
  bookmarkId: string;
};

export const selectBookmark = ({ bookmarkId, userId }: SelectBookmarkArgs) => {
  return db.bookmark.findFirst({
    include: { BookmarkTag: true },
    where: { id: bookmarkId, userId },
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
  tags?: string[];
};

export const updateBookmark = async ({
  bookmarkId,
  preview,
  text,
  url,
  tags,
}: UpdateBookmarkArgs) => {
  const userId = getUserId(requestInfo);
  const date = new Date();

  const bookmark = await db.bookmark.findFirst({
    include: { BookmarkTag: true },
    where: { id: bookmarkId, userId },
  });

  if (!bookmark) {
    throw new Response("Invalid bookmarkId", { status: 404 });
  }

  const currentTags = new Map(
    bookmark.BookmarkTag.map((tag) => [tag.tagId, tag]),
  );
  const tagsToAdd: string[] = [];

  tags?.forEach((tagId) => {
    if (currentTags.has(tagId)) {
      currentTags.delete(tagId);
      return;
    }
    tagsToAdd.push(tagId);
  });

  return db.bookmark.update({
    data: {
      BookmarkTag: {
        createMany: {
          data: tagsToAdd.map((tagId) => ({
            createdAt: date,
            id: crypto.randomUUID(),
            tagId,
            updatedAt: date,
            userId,
          })),
        },
        deleteMany: {
          tagId: {
            in: [...currentTags.keys()],
          },
        },
      },
      preview,
      text,
      updatedAt: date,
      url,
    },
    where: { id: bookmarkId, userId },
  });
};
