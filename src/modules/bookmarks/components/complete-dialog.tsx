"use client";

import { IconCheck } from "@intentui/icons";
import { useId, useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";

import { type BookmarkWithTags, completeBookmark } from "../server/functions";
import { CompleteFields, useCompleteForm } from "./complete-fields";

type CompleteDialogProps = {
  bookmark: BookmarkWithTags;
};

export const CompleteDialog = ({ bookmark }: CompleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formId = useId();

  // const history = useBookmarksHistory();

  const form = useCompleteForm({
    async onSubmit(data) {
      await completeBookmark({ bookmarkId: bookmark.id, ...data });
      setIsOpen(false);
    },
  });

  const onPress = () => {
    // history().addToHistory(bookmark.id);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button intent="primary" onPress={onPress}>
        <IconCheck />
        Complete
      </Button>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompleteFields form={form} formId={formId} />
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
              Complete
            </Button>
          </form.Subscribe>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
