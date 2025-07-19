"use server";

import { requestInfo } from "rwsdk/worker";

import { getUserId } from "@/modules/auth/server/get-user-id";

import { completeBookmark, deleteBookmark, selectBookmarks } from "./db";

type SelectBookmarksActionArgs = {
  page: number;
};

export const selectBookmarksAction = async (
  args: SelectBookmarksActionArgs,
) => {
  const userId = getUserId(requestInfo);
  return selectBookmarks({ ...args, userId });
};

type DeleteBookmarkActionArgs = {
  bookmarkId: string;
};

export const deleteBookmarkAction = async (args: DeleteBookmarkActionArgs) => {
  const userId = getUserId(requestInfo);
  await deleteBookmark({ ...args, userId });
};

type CompleteBookmarkActionArgs = {
  bookmarkId: string;
  note?: string;
  rate?: number;
  done: boolean;
};

export const complateBookmarkAction = async (
  args: CompleteBookmarkActionArgs,
) => {
  const userId = getUserId(requestInfo);
  await completeBookmark({ userId, ...args });
};
