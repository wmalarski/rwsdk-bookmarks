"use client";

import { IconPlus } from "@intentui/icons";
import { useId, useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";

import { createTag } from "../server/functions";
import { TagFields, useTagForm } from "./tag-fields";

export const InsertTagDialog = () => {
  const formId = useId();

  const [isOpen, setIsOpen] = useState(false);

  const form = useTagForm({
    async onSubmit({ name }) {
      await createTag({ name });
      setIsOpen(false);
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button intent="primary" size="sm">
        <IconPlus />
        Add Tag
      </Button>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add Tag</Modal.Title>
        </Modal.Header>
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
