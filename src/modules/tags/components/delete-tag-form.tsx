import { useSubmission } from "@solidjs/router";
import { type Component, createMemo } from "solid-js";

import { useI18n } from "~/modules/common/contexts/i18n";
import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
import { AlertDialog } from "~/ui/alert-dialog/alert-dialog";
import { closeDialog, DialogTrigger } from "~/ui/dialog/dialog";
import { TrashIcon } from "~/ui/icons/trash-icon";
import { deleteTagServerAction, type TagModel } from "../server";

type DeleteTagFormProps = {
  tag: TagModel;
};

export const DeleteTagForm: Component<DeleteTagFormProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `delete-dialog-${props.tag.id}`);

  const submission = useSubmission(
    deleteTagServerAction,
    ([form]) => form.get("tagId") === String(props.tag.id),
  );

  const onSubmit = useActionOnSubmit({
    action: deleteTagServerAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  return (
    <form onSubmit={onSubmit}>
      <input name="tagId" type="hidden" value={props.tag.id} />
      <DialogTrigger color="error" for={dialogId()} size="sm">
        <TrashIcon class="size-4" />
        {t("common.delete")}
      </DialogTrigger>
      <AlertDialog
        confirm={t("common.delete")}
        confirmColor="error"
        errorMessage={
          submission.result?.success ? undefined : submission.result?.error
        }
        id={dialogId()}
        pending={submission.pending}
        title={t("common.delete")}
      />
    </form>
  );
};
