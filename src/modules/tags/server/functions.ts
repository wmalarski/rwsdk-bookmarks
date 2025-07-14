"use server";

import { requestInfo } from "rwsdk/worker";

import { createTag } from "./db";

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
