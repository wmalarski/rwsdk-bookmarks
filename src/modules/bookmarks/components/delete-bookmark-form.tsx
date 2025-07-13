import { IconTrash } from "@intentui/icons";
import type { ComponentProps } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/button";

import type { BookmarkWithTags } from "../server/db";

type DeleteBookmarkFormProps = {
  bookmark: BookmarkWithTags;
};

export const DeleteBookmarkForm = ({ bookmark }: DeleteBookmarkFormProps) => {
  // const submission = useSubmission(
  //   deleteBookmarkServerAction,
  //   ([form]) => form.get("bookmarkId") === String(bookmark.id),
  // );

  // const onSubmit = useActionOnSubmit({
  //   action: deleteBookmarkServerAction,
  //   onSuccess: () => closeDialog(dialogId()),
  // });

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="bookmarkId" type="hidden" value={bookmark.id} />
      <Button intent="danger" size="sm">
        <IconTrash className="size-4" />
        Delete
      </Button>
      <AlertDialog
        confirm="Delete"
        confirmIntent="danger"
        // errorMessage={
        //   submission.result?.success ? undefined : submission.result?.error
        // }
        pending={false}
        title="Delete"
      />
    </form>
  );
};
