import { Checkbox } from "@/components/checkbox";
import type { Tag } from "@/db";

type BookmarkTagsFieldProps = {
  selectedTags?: string[];
  disabled?: boolean;
  tags: Tag[];
  onChange: (tags: string[]) => void;
};

export const BookmarkTagsField = ({
  disabled,
  selectedTags,
  tags,
  onChange,
}: BookmarkTagsFieldProps) => {
  const selectedTagsSet = new Set(selectedTags);

  const onChangeFactory = (tag: Tag) => (isSelected: boolean) => {
    const updatedTags = new Set(selectedTagsSet);

    if (isSelected) {
      updatedTags.add(tag.id);
    } else {
      updatedTags.delete(tag.id);
    }

    onChange([...updatedTags]);
  };

  return (
    <ul className="flex flex-col gap-2 pt-4">
      {tags.map((tag) => (
        <li key={tag.id}>
          <Checkbox
            isDisabled={disabled}
            isSelected={selectedTagsSet.has(tag.id)}
            onChange={onChangeFactory(tag)}
            value={tag.id}
          >
            {tag.name}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
};
