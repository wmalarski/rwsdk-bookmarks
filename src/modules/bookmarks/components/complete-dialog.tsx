import { IconLoader } from "@intentui/icons";

import { Button } from "@/components/button";

import { useI18n } from "~/modules/common/contexts/i18n";
import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
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

export const CompleteDialog = ({ bookmark }: CompleteDialogProps) => {
  const { t } = useI18n();

  const dialogId = `complete-dialog-${bookmark.id}`;
  const formId = `complete-form-${bookmark.id}`;

  const submission = useSubmission(
    completeBookmarkServerAction,
    ([form]) => form.get("bookmarkId") === String(bookmark.id),
  );

  const history = useBookmarksHistory();

  const onClick = () => {
    history().addToHistory(bookmark.id);
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
        <CheckIcon className="size-4" />
        {t("bookmarks.complete.complete")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("bookmarks.complete.complete")}</DialogTitle>
          <form id={formId()} onSubmit={onSubmit}>
            <input name="bookmarkId" type="hidden" value={bookmark.id} />
            <CompleteFields
              initialData={bookmark}
              pending={submission.pending}
              result={submission.result}
            />
          </form>
          <DialogActions>
            <DialogClose />
            <Button
              form={formId()}
              intent="primary"
              isDisabled={submission.pending}
              type="submit"
            >
              {submission.pending && <IconLoader />}
              {t("bookmarks.complete.complete")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};
