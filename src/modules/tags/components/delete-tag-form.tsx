"use client";

import { IconTrash } from "@intentui/icons";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/button";
import type { Tag } from "@/db";

import { deleteTagAction } from "../server/functions";

type DeleteTagFormProps = {
  tag: Tag;
};

export const DeleteTagForm = ({ tag }: DeleteTagFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    onSubmit: async () => {
      await deleteTagAction({ tagId: tag.id });
      setIsOpen(false);
    },
  });

  const onSubmit = () => {
    form.handleSubmit();
  };

  const onDeletePress = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button intent="danger" onPress={onDeletePress}>
        <IconTrash />
        Delete
      </Button>
      <form.Subscribe selector={(state) => [state.isSubmitting]}>
        <AlertDialog
          confirmIntent="danger"
          confirmText="Delete"
          isOpen={isOpen}
          onConfirm={onSubmit}
          onOpenChange={setIsOpen}
          pending={form.state.isSubmitting}
          title="Delete"
        />
      </form.Subscribe>
    </>
  );
};
