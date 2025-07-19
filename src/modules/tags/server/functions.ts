"use server";

import { requestInfo } from "rwsdk/worker";

import { db } from "@/db";
import { getUserId } from "@/modules/auth/server/get-user-id";

export type SelectTagsArgs = {
  page: number;
  userId: string;
};

const SELECT_TAGS_PAGE_SIZE = 20;

export const selectTags = ({ page, userId }: SelectTagsArgs) => {
  return db.tag.findMany({
    skip: SELECT_TAGS_PAGE_SIZE * page,
    take: SELECT_TAGS_PAGE_SIZE,
    where: { userId },
  });
};

export type CreateTagArgs = {
  name: string;
};

export const createTag = ({ name }: CreateTagArgs) => {
  const userId = getUserId(requestInfo);
  const now = new Date();
  const id = crypto.randomUUID();

  return db.tag.create({
    data: { createdAt: now, id, name, updatedAt: now, userId },
  });
};

export type UpdateTagArgs = {
  tagId: string;
  name: string;
};

export const updateTag = ({ name, tagId }: UpdateTagArgs) => {
  const userId = getUserId(requestInfo);
  const now = new Date();

  return db.tag.update({
    data: { name, updatedAt: now },
    where: { id: tagId, userId },
  });
};

export type DeleteTagArgs = {
  tagId: string;
};

export const deleteTag = ({ tagId }: DeleteTagArgs) => {
  const userId = getUserId(requestInfo);

  return db.tag.delete({
    where: { id: tagId, userId },
  });
};
