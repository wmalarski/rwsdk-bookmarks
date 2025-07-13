import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
import { AlertDialog } from "~/ui/alert-dialog/alert-dialog";
import { closeDialog, DialogTrigger } from "~/ui/dialog/dialog";
import { TrashIcon } from "~/ui/icons/trash-icon";
import {
  type BookmarkWithTagsModel,
  deleteBookmarkServerAction,
} from "../server";

type DeleteBookmarkFormProps = {
  bookmark: BookmarkWithTagsModel;
};

export const DeleteBookmarkForm = ({ bookmark }: DeleteBookmarkFormProps) => {
  const dialogId = `delete-dialog-${bookmark.id}`;

  // const submission = useSubmission(
  //   deleteBookmarkServerAction,
  //   ([form]) => form.get("bookmarkId") === String(bookmark.id),
  // );

  const onSubmit = useActionOnSubmit({
    action: deleteBookmarkServerAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  return (
    <form onSubmit={onSubmit}>
      <input name="bookmarkId" type="hidden" value={bookmark.id} />
      <DialogTrigger color="error" for={dialogId()} size="sm">
        <TrashIcon className="size-4" />
        Delete
      </DialogTrigger>
      <AlertDialog
        confirm="Delete"
        confirmColor="error"
        errorMessage={
          submission.result?.success ? undefined : submission.result?.error
        }
        id={dialogId()}
        pending={submission.pending}
        title="Delete"
      />
    </form>
  );
};
