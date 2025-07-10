import { Suspense } from "react";

import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectTagsServerQuery } from "~/modules/tags/server";
import { Checkbox } from "~/ui/checkbox/checkbox";
import { FieldsetLabel } from "~/ui/fieldset/fieldset";

type BookmarkTagsFieldProps = {
  initialTags?: number[];
  disabled?: boolean;
};

export const BookmarkTagsField = ({
  disabled,
  initialTags,
}: BookmarkTagsFieldProps) => {
  const tags = createAsync(() => selectTagsServerQuery({}));

  const initialTagIds = new Set(initialTags);

  return (
    <Suspense>
      <RpcShow result={tags()}>
        {(tags) => (
          <ul className="flex flex-col gap-2 pt-4">
            {tags().data.map((tag) => (
              <li key={tag.id}>
                <FieldsetLabel>
                  <Checkbox
                    checked={initialTagIds().has(tag.id)}
                    disabled={disabled}
                    name="tags[]"
                    type="checkbox"
                    value={tag.id}
                  />
                  {tag.name}
                </FieldsetLabel>
              </li>
            ))}
          </ul>
        )}
      </RpcShow>
    </Suspense>
  );
};
