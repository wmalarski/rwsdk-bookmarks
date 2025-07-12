import type { Tag } from "@/db";

import { TagsListItem } from "./tag-list-item";

type TagsListProps = {
  tags: Tag[];
};

export const TagsList = ({ tags }: TagsListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {tags.map((tag) => (
        <li key={tag.id}>
          <TagsListItem tag={tag} />
        </li>
      ))}
    </ul>
  );
};
