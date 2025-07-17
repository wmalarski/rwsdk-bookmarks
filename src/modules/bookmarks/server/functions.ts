"use server";

import { requestInfo } from "rwsdk/worker";

import { deleteBookmark } from "./db";

type DeleteBookmarkActionArgs = {
  bookmarkId: string;
};

export const deleteBookmarkAction = async ({
  bookmarkId,
}: DeleteBookmarkActionArgs) => {
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  await deleteBookmark({ bookmarkId, userId });
};
