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
      <Card.Header>
        <Card.Title>{tag.name}</Card.Title>
        {tag.createdAt ? (
          <Card.Description>{formatDate(tag.createdAt)}</Card.Description>
        ) : null}
      </Card.Header>
      <Card.Footer className="gap-2">
        <UpdateTagDialog tag={tag} />
        <DeleteTagForm tag={tag} />
      </Card.Footer>
    </Card>
  );
};
