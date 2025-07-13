import { IconLoader, IconPencilBox } from "@intentui/icons";
import type { ComponentProps } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import type { Tag } from "@/db";

import type { BookmarkWithTags } from "../server/db";
import { BookmarkFields, useBookmarksForm } from "./bookmark-fields";

type UpdateBookmarkDialogProps = {
  bookmark: BookmarkWithTags;
  tags: Tag[];
};

export const UpdateBookmarkDialog = ({
  bookmark,
  tags,
}: UpdateBookmarkDialogProps) => {
  const formId = `update-form-${bookmark.id}`;

  // const submission = useSubmission(
  //   updateBookmarkServerAction,
  //   ([form]) => form.get("bookmarkId") === String(bookmark.id),
  // );

  // const onSubmit = useActionOnSubmit({
  //   action: updateBookmarkServerAction,
  //   onSuccess: () => closeDialog(dialogId()),
  // });

  const form = useBookmarksForm({
    onSubmit(_data) {
      //
    },
  });

  // const initialData = () => {
  //   return {
  //     ...bookmark,
  //     // tags: bookmark.bookmarks_tags.map((bookmarkTag) => bookmarkTag.tags.id),
  //   };
  // };

  // const history = useBookmarksHistory();

  const onClick = () => {
    // history().addToHistory(bookmark.id);
  };

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
  };

  return (
    <Modal>
      <Button intent="secondary" onClick={onClick} size="sm">
        <IconPencilBox className="size-4" />
        Update
      </Button>
      <Modal.Content>
        {() => (
          <>
            <Modal.Header>Update</Modal.Header>
            <form id={formId} onSubmit={onSubmit}>
              <input name="bookmarkId" type="hidden" value={bookmark.id} />
              <BookmarkFields
                // initialData={initialData()}
                form={form}
                pending={form.state.isSubmitting}
                tags={tags}
                // result={submission.result}
                title="Update"
              />
            </form>
            <Modal.Footer>
              <Modal.Close />
              <Button
                form={formId}
                intent="primary"
                isDisabled={form.state.isSubmitting}
                type="submit"
              >
                {form.state.isSubmitting && <IconLoader />}
                Save
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};
