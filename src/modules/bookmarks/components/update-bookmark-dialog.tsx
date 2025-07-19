"use client";

import { IconPencilBox } from "@intentui/icons";
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
    initialData: {
      ...bookmark,
      preview: bookmark.preview ?? undefined,
      tags: bookmark.BookmarkTag.map((tag) => tag.id),
      text: bookmark.text ?? undefined,
    },
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
      <Button intent="secondary" onPress={onPress}>
        <IconPencilBox />
        Update
      </Button>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookmarkFields form={form} formId={formId} tags={tags} />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Close</Modal.Close>
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            <Button
              form={formId}
              intent="primary"
              isDisabled={form.state.isSubmitting}
              isPending={form.state.isSubmitting}
              type="submit"
            >
              Save
            </Button>
          </form.Subscribe>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
