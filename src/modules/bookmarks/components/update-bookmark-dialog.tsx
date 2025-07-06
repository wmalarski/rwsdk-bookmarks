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

export const UpdateBookmarkDialog: Component<UpdateBookmarkDialogProps> = (
  props,
) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `update-dialog-${props.bookmark.id}`);
  const formId = createMemo(() => `update-form-${props.bookmark.id}`);

  const submission = useSubmission(
    updateBookmarkServerAction,
    ([form]) => form.get("bookmarkId") === String(props.bookmark.id),
  );

  const onSubmit = useActionOnSubmit({
    action: updateBookmarkServerAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  const initialData = () => {
    return {
      ...props.bookmark,
      tags: props.bookmark.bookmarks_tags.map(
        (bookmarkTag) => bookmarkTag.tags.id,
      ),
    };
  };

  const history = useBookmarksHistory();

  const onClick = () => {
    history().addToHistory(props.bookmark.id);
  };

  return (
    <>
      <DialogTrigger
        color="secondary"
        for={dialogId()}
        onClick={onClick}
        size="sm"
      >
        <PencilIcon class="size-4" />
        {t("common.update")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("common.update")}</DialogTitle>
          <form class={formContainerRecipe()} id={formId()} onSubmit={onSubmit}>
            <input name="bookmarkId" type="hidden" value={props.bookmark.id} />
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
      </Dialog>
    </>
  );
};
