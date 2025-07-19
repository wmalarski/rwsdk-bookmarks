"use client";

import { IconPencilBox } from "@intentui/icons";
import { useId, useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import type { Tag } from "@/db";

import { type BookmarkWithTags, updateBookmark } from "../server/functions";
import { BookmarkFields, useBookmarksForm } from "./bookmark-fields";

type UpdateBookmarkDialogProps = {
  bookmark: BookmarkWithTags;
  tags: Tag[];
};

export const UpdateBookmarkDialog = ({
  bookmark,
  tags,
}: UpdateBookmarkDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formId = useId();

  const form = useBookmarksForm({
    initialData: {
      ...bookmark,
      preview: bookmark.preview ?? undefined,
      tags: bookmark.BookmarkTag.map((tag) => tag.id),
      text: bookmark.text ?? undefined,
    },
    async onSubmit(data) {
      await updateBookmark({ bookmarkId: bookmark.id, ...data });
      setIsOpen(false);
    },
  });

  // const history = useBookmarksHistory();

  const onPress = () => {
    // history().addToHistory(bookmark.id);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
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
