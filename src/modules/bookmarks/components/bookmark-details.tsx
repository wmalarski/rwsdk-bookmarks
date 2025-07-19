"use client";

import { useMemo } from "react";

import type { Tag, User } from "@/db";

import { BookmarkListItem } from "../components/bookmark-list-item";
import type { BookmarkWithTags } from "../server/functions";
import { BookmarksHistoryProvider } from "../utils/bookmarks-history";

type BookmarkDetailsProps = {
  bookmark: BookmarkWithTags;
  user: User;
  tags: Tag[];
};

export const BookmarkDetails = ({
  bookmark,
  tags,
  user,
}: BookmarkDetailsProps) => {
  const tagsMap = useMemo(() => {
    return new Map(tags.map((tag) => [tag.id, tag]));
  }, [tags]);

  return (
    <BookmarksHistoryProvider userId={user.id}>
      <div className="p-4">
        <BookmarkListItem bookmark={bookmark} tags={tags} tagsMap={tagsMap} />
      </div>
    </BookmarksHistoryProvider>
  );
};
