"use server";

import { requestInfo } from "rwsdk/worker";

import { createTag, updateTag } from "./db";

type CreateTagActionArgs = {
  name: string;
};

export const createTagAction = async ({ name }: CreateTagActionArgs) => {
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  await createTag({ name, userId });
};

type UpdateTagActionArgs = {
  tagId: string;
  name: string;
};

export const updateTagAction = async ({ name, tagId }: UpdateTagActionArgs) => {
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  await updateTag({ name, tagId, userId });
};
