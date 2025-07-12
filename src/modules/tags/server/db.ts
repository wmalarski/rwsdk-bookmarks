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
