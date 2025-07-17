"use server";

import { requestInfo } from "rwsdk/worker";

import { createTag, deleteTag, updateTag } from "./db";

type CreateTagActionArgs = {
  name: string;
};

export const createTagAction = async (args: CreateTagActionArgs) => {
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  await createTag({ ...args, userId });
};

type UpdateTagActionArgs = {
  tagId: string;
  name: string;
};

export const updateTagAction = async (args: UpdateTagActionArgs) => {
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  await updateTag({ ...args, userId });
};

type DeleteTagActionArgs = {
  tagId: string;
};

export const deleteTagAction = async (args: DeleteTagActionArgs) => {
  const { ctx } = requestInfo;
  const userId = ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  await deleteTag({ ...args, userId });
};
