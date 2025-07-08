import { IconLoader } from "@intentui/icons";
import { useSubmission } from "@solidjs/router";
import { createMemo } from "solid-js";

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
import { formContainerRecipe } from "~/ui/form-container/form-container.recipe";
import { PencilIcon } from "~/ui/icons/pencil-icon";
import { useBookmarksHistory } from "../contexts/bookmarks-history";
import {
  type BookmarkWithTagsModel,
  updateBookmarkServerAction,
} from "../server";
import { BookmarkFields } from "./bookmark-fields";

type UpdateBookmarkDialogProps = {
  bookmark: BookmarkWithTagsModel;
};

export const UpdateBookmarkDialog = ({
  bookmark,
}: UpdateBookmarkDialogProps) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `update-dialog-${bookmark.id}`);
  const formId = createMemo(() => `update-form-${bookmark.id}`);

  const submission = useSubmission(
    updateBookmarkServerAction,
    ([form]) => form.get("bookmarkId") === String(bookmark.id),
  );

  const onSubmit = useActionOnSubmit({
    action: updateBookmarkServerAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  const initialData = () => {
    return {
      ...bookmark,
      tags: bookmark.bookmarks_tags.map((bookmarkTag) => bookmarkTag.tags.id),
    };
  };

  const history = useBookmarksHistory();

  const onClick = () => {
    history().addToHistory(bookmark.id);
  };

  return (
    <>
      <DialogTrigger
        color="secondary"
        for={dialogId()}
        onClick={onClick}
        size="sm"
      >
        <PencilIcon className="size-4" />
        {t("common.update")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("common.update")}</DialogTitle>
          <form
            className={formContainerRecipe()}
            id={formId()}
            onSubmit={onSubmit}
          >
            <input name="bookmarkId" type="hidden" value={bookmark.id} />
            <BookmarkFields
              initialData={initialData()}
              pending={submission.pending}
              result={submission.result}
              title={t("common.update")}
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
              {t("common.save")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};
