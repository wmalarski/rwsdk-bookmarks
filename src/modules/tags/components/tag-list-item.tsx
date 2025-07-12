import { Card } from "@/components/card";
import type { Tag } from "@/db";
import { useDateFormatter } from "@/lib/formatters";

import { DeleteTagForm } from "./delete-tag-form";
import { UpdateTagDialog } from "./update-tag-dialog";

type TagsListItemProps = {
  tag: Tag;
};

export const TagsListItem = ({ tag }: TagsListItemProps) => {
  const formatDate = useDateFormatter();

  return (
    <Card>
      <Card.Content className="flex flex-col gap-2">
        <div className="flex grow flex-col gap-2 pr-6">
          <span className="text-lg">{tag.name}</span>
          {tag.createdAt ? <span>{formatDate(tag.createdAt)}</span> : null}
        </div>
      </Card.Content>
      <Card.Footer>
        <UpdateTagDialog tag={tag} />
        <DeleteTagForm tag={tag} />
      </Card.Footer>
    </Card>
  );
};
