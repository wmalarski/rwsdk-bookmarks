"use server";

import { requestInfo } from "rwsdk/worker";

import { getUserId } from "@/modules/auth/server/get-user-id";

import { createTag, deleteTag, updateTag } from "./db";

type CreateTagActionArgs = {
  name: string;
};

export const createTagAction = async (args: CreateTagActionArgs) => {
  const userId = getUserId(requestInfo);
  await createTag({ ...args, userId });
};

type UpdateTagActionArgs = {
  tagId: string;
  name: string;
};

export const updateTagAction = async (args: UpdateTagActionArgs) => {
  const userId = getUserId(requestInfo);
  await updateTag({ ...args, userId });
};

type DeleteTagActionArgs = {
  tagId: string;
};

export const deleteTagAction = async (args: DeleteTagActionArgs) => {
  const userId = getUserId(requestInfo);
  await deleteTag({ ...args, userId });
};
