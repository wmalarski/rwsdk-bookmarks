import { db } from "@/db";

type SelectTagsArgs = {
  userId: string;
  page: number;
};

const SELECT_TAGS_PAGE_SIZE = 20;

export const selectTags = ({ userId, page }: SelectTagsArgs) => {
  return db.tag.findMany({
    skip: SELECT_TAGS_PAGE_SIZE * page,
    take: SELECT_TAGS_PAGE_SIZE,
    where: { userId },
  });
};

type CreateTagArgs = {
  userId: string;
  name: string;
};

export const createTag = ({ userId, name }: CreateTagArgs) => {
  const now = new Date();
  const id = crypto.randomUUID();

  return db.tag.create({
    data: { createdAt: now, id, name, updatedAt: now, userId },
  });
};

type UpdateTagArgs = {
  tagId: string;
  userId: string;
  name: string;
};

export const updateTag = ({ userId, name, tagId }: UpdateTagArgs) => {
  const now = new Date();

  return db.tag.update({
    data: { name, updatedAt: now },
    where: { id: tagId, userId },
  });
};

type DeleteTagArgs = {
  tagId: string;
  userId: string;
};

export const deleteTag = ({ userId, tagId }: DeleteTagArgs) => {
  return db.tag.delete({
    where: { id: tagId, userId },
  });
};
