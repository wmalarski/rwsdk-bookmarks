import { Checkbox } from "@/components/checkbox";
import type { Tag } from "@/db";

type BookmarkTagsFieldProps = {
  initialTags?: string[];
  disabled?: boolean;
  tags: Tag[];
};

export const BookmarkTagsField = ({
  disabled,
  initialTags,
  tags,
}: BookmarkTagsFieldProps) => {
  const initialTagIds = new Set(initialTags);

  return (
    <ul className="flex flex-col gap-2 pt-4">
      {tags.map((tag) => (
        <li key={tag.id}>
          <Checkbox
            defaultSelected={initialTagIds.has(tag.id)}
            isDisabled={disabled}
            name="tags[]"
            value={tag.id}
          >
            {tag.name}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
};
