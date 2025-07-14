"use client";

import { IconPlus } from "@intentui/icons";
import { type ComponentProps, useId, useState } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";

import { TagFields, useTagForm } from "./tag-fields";

export const InsertTagDialog = () => {
  const formId = useId();

  const [isOpen, setIsOpen] = useState(false);

  // const submission = useSubmission(insertTagServerAction);

  // const onSubmit = useActionOnSubmit({
  //   action: insertTagServerAction,
  //   onSuccess: () => closeDialog(dialogId),
  //   resetOnSuccess: true,
  // });

  const form = useTagForm({
    onSubmit: () => {
      //
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    await form.handleSubmit();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button intent="primary" size="sm">
        <IconPlus className="size-4" />
        Add Tag
      </Button>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Add Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id={formId} onSubmit={onSubmit}>
            <TagFields form={form} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Close</Modal.Close>
          <Button form={formId} intent="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
