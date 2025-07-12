import { useSubmission } from "@solidjs/router";
import { type Component, createMemo } from "solid-js";

import { useI18n } from "~/modules/common/contexts/i18n";
import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
import { Button } from "~/ui/button/button";
import {
  closeDialog,
  Dialog,
  DialogActions,
  DialogBackdrop,
  DialogBox,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog/dialog";
import { PencilIcon } from "~/ui/icons/pencil-icon";
import { type TagModel, updateTagServerAction } from "../server";
import { TagFields } from "./tag-fields";

type UpdateTagDialogProps = {
  tag: TagModel;
};

export const UpdateTagDialog: Component<UpdateTagDialogProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `update-dialog-${props.tag.id}`);
  const formId = createMemo(() => `update-form-${props.tag.id}`);

  const submission = useSubmission(
    updateTagServerAction,
    ([form]) => form.get("tagId") === String(props.tag.id),
  );

  const onSubmit = useActionOnSubmit({
    action: updateTagServerAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  return (
    <>
      <DialogTrigger color="secondary" for={dialogId()} size="sm">
        <PencilIcon class="size-4" />
        {t("common.update")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("common.update")}</DialogTitle>
          <form id={formId()} onSubmit={onSubmit}>
            <input name="tagId" type="hidden" value={props.tag.id} />
            <TagFields
              pending={submission.pending}
              result={
                submission.result?.success ? undefined : submission.result
              }
            />
          </form>
          <DialogActions>
            <DialogClose />
            <Button
              color="primary"
              disabled={submission.pending}
              form={formId()}
              isLoading={submission.pending}
              type="submit"
            >
              {t("common.save")}
            </Button>
          </DialogActions>
        </DialogBox>
        <DialogBackdrop />
      </Dialog>
    </>
  );
};
