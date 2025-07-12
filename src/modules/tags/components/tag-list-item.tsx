import type { Component } from "solid-js";

import { createDateFormatter } from "~/modules/common/utils/formatters";
import { Card, CardActions, CardBody } from "~/ui/card/card";
import type { TagModel } from "../server";
import { DeleteTagForm } from "./delete-tag-form";
import { UpdateTagDialog } from "./update-tag-dialog";

type TagsListItemProps = {
  tag: TagModel;
};

export const TagsListItem: Component<TagsListItemProps> = (props) => {
  const formatDate = createDateFormatter();

  return (
    <Card size="sm" variant="bordered">
      <CardBody class="flex flex-col gap-2">
        <div class="flex grow flex-col gap-2 pr-6">
          <span class="text-lg">{props.tag.name}</span>
          <span>{formatDate(props.tag.created_at)}</span>
        </div>
        <CardActions>
          <UpdateTagDialog tag={props.tag} />
          <DeleteTagForm tag={props.tag} />
        </CardActions>
      </CardBody>
    </Card>
  );
};
