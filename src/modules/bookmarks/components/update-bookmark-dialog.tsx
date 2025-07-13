import { IconLoader } from "@intentui/icons";

import { Button } from "@/components/button";

import {
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
import { type BookmarkWithTagsModel } from "../server";
import { BookmarkFields } from "./bookmark-fields";

type UpdateBookmarkDialogProps = {
  bookmark: BookmarkWithTagsModel;
};

export const UpdateBookmarkDialog = ({
  bookmark,
}: UpdateBookmarkDialogProps) => {
  const dialogId = `update-dialog-${bookmark.id}`;
  const formId = `update-form-${bookmark.id}`;

  // const submission = useSubmission(
  //   updateBookmarkServerAction,
  //   ([form]) => form.get("bookmarkId") === String(bookmark.id),
  // );

  // const onSubmit = useActionOnSubmit({
  //   action: updateBookmarkServerAction,
  //   onSuccess: () => closeDialog(dialogId()),
  // });

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
        Update
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>Update</DialogTitle>
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
              title="Update"
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
              Save
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};
