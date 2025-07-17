import { IconLoader, IconPencilBox } from "@intentui/icons";
import { useId } from "react";

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
  const formId = useId();

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
      console.log("[bookmark]", bookmark);
    },
  });

  // const initialData = () => {
  //   return {
  //     ...bookmark,
  //     // tags: bookmark.bookmarks_tags.map((bookmarkTag) => bookmarkTag.tags.id),
  //   };
  // };

  // const history = useBookmarksHistory();

  const onPress = () => {
    // history().addToHistory(bookmark.id);
  };

  return (
    <Modal>
      <Button intent="secondary" onPress={onPress} size="sm">
        <IconPencilBox className="size-4" />
        Update
      </Button>
      <Modal.Content>
        {() => (
          <>
            <Modal.Header>Update</Modal.Header>
            <BookmarkFields
              form={form}
              // initialData={initialData()}
              formId={formId}
              pending={form.state.isSubmitting}
              tags={tags}
              // result={submission.result}
              title="Update"
            />
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
