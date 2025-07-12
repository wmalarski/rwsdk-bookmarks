import { IconTrash } from "@intentui/icons";

import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/button";
import type { Tag } from "@/db";

type DeleteTagFormProps = {
  tag: Tag;
};

export const DeleteTagForm = ({ tag }: DeleteTagFormProps) => {
  // const submission = useSubmission(
  //   deleteTagServerAction,
  //   ([form]) => form.get("tagId") === String(props.tag.id),
  // );

  // const onSubmit = useActionOnSubmit({
  //   action: deleteTagServerAction,
  //   onSuccess: () => closeDialog(dialogId()),
  // });

  const onSubmit = () => {
    //
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="tagId" type="hidden" value={tag.id} />
      <Button intent="danger" size="sm">
        <IconTrash className="size-4" />
        Delete
      </Button>
      <AlertDialog
        confirm="Delete"
        confirmIntent="danger"
        pending={false}
        title="Delete"
      />
    </form>
  );
};
