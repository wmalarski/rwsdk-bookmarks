import { createAsync } from "@solidjs/router";
import { type Component, createMemo, For, Suspense } from "solid-js";

import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectTagsServerQuery } from "~/modules/tags/server";
import { Checkbox } from "~/ui/checkbox/checkbox";
import { FieldsetLabel } from "~/ui/fieldset/fieldset";

type BookmarkTagsFieldProps = {
  initialTags?: number[];
  disabled?: boolean;
};

export const BookmarkTagsField: Component<BookmarkTagsFieldProps> = (props) => {
  const tags = createAsync(() => selectTagsServerQuery({}));

  const initialTagIds = createMemo(() => {
    return new Set(props.initialTags);
  });

  return (
    <Suspense>
      <RpcShow result={tags()}>
        {(tags) => (
          <ul class="flex flex-col gap-2 pt-4">
            <For each={tags().data}>
              {(tag) => (
                <li>
                  <FieldsetLabel>
                    <Checkbox
                      checked={initialTagIds().has(tag.id)}
                      disabled={props.disabled}
                      name="tags[]"
                      type="checkbox"
                      value={tag.id}
                    />
                    {tag.name}
                  </FieldsetLabel>
                </li>
              )}
            </For>
          </ul>
        )}
      </RpcShow>
    </Suspense>
  );
};
