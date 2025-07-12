import { type Component, For } from "solid-js";

import type { TagModel } from "../server";
import { TagsListItem } from "./tag-list-item";

type TagsListProps = {
  tags: TagModel[];
};

export const TagsList: Component<TagsListProps> = (props) => {
  return (
    <ul class="flex flex-col gap-2">
      <For each={props.tags}>
        {(tag) => (
          <li>
            <TagsListItem tag={tag} />
          </li>
        )}
      </For>
    </ul>
  );
};
