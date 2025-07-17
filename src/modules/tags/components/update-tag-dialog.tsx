"use client";

import { IconPencilBox } from "@intentui/icons";
import { useId, useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import type { Tag } from "@/db";

import { updateTagAction } from "../server/functions";
import { TagFields, useTagForm } from "./tag-fields";

type UpdateTagDialogProps = {
  tag: Tag;
};

export const UpdateTagDialog = ({ tag }: UpdateTagDialogProps) => {
  const formId = useId();

  const [isOpen, setIsOpen] = useState(false);

  const form = useTagForm({
    initialData: tag,
    onSubmit: async ({ name }) => {
      await updateTagAction({ name, tagId: tag.id });
      setIsOpen(false);
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button intent="secondary" size="sm">
        <IconPencilBox />
        Update
      </Button>
      <Modal.Content>
        <Modal.Header>Update</Modal.Header>
        <Modal.Body>
          <TagFields form={form} formId={formId} />
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
