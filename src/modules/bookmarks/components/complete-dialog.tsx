import { useSubmission } from "@solidjs/router";
import { type Component, createMemo } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
import { Button } from "~/ui/button/button";
import {
  closeDialog,
  Dialog,
  DialogActions,
  DialogBox,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog/dialog";
import { CheckIcon } from "~/ui/icons/check-icon";
import { useBookmarksHistory } from "../contexts/bookmarks-history";
import {
  type BookmarkWithTagsModel,
  completeBookmarkServerAction,
} from "../server";
import { CompleteFields } from "./complete-fields";

type CompleteDialogProps = {
  bookmark: BookmarkWithTagsModel;
};

export const CompleteDialog: Component<CompleteDialogProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `complete-dialog-${props.bookmark.id}`);
  const formId = createMemo(() => `complete-form-${props.bookmark.id}`);

  const submission = useSubmission(
    completeBookmarkServerAction,
    ([form]) => form.get("bookmarkId") === String(props.bookmark.id),
  );

  const history = useBookmarksHistory();

  const onClick = () => {
    history().addToHistory(props.bookmark.id);
  };

  const onSubmit = useActionOnSubmit({
    action: completeBookmarkServerAction,
    onSuccess: () => {
      closeDialog(dialogId());
    },
  });

  return (
    <>
      <DialogTrigger
        color="primary"
        for={dialogId()}
        onClick={onClick}
        size="sm"
      >
        <CheckIcon class="size-4" />
        {t("bookmarks.complete.complete")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("bookmarks.complete.complete")}</DialogTitle>
          <form id={formId()} onSubmit={onSubmit}>
            <input name="bookmarkId" type="hidden" value={props.bookmark.id} />
            <CompleteFields
              initialData={props.bookmark}
              pending={submission.pending}
              result={submission.result}
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
              {t("bookmarks.complete.complete")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};
