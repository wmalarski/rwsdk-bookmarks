"use server";

import { requestInfo } from "rwsdk/worker";

import { completeBookmark, deleteBookmark } from "./db";

type DeleteBookmarkActionArgs = {
  bookmarkId: string;
};

export const deleteBookmarkAction = async (args: DeleteBookmarkActionArgs) => {
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

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
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  await completeBookmark({ userId, ...args });
};
