import { db } from "@/db";

type SelectBookmarksArgs = {
  userId: string;
  page: number;
};

const SELECT_BOOKMARKS_PAGE_SIZE = 10;

export const selectBookmarks = ({ userId, page }: SelectBookmarksArgs) => {
  return db.bookmark.findMany({
    skip: SELECT_BOOKMARKS_PAGE_SIZE * page,
    take: SELECT_BOOKMARKS_PAGE_SIZE,
    where: { userId },
  });
};
