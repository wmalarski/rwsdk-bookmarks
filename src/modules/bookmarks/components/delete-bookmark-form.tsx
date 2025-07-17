"use client";

import { IconTrash } from "@intentui/icons";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/button";

import type { BookmarkWithTags } from "../server/db";
import { deleteBookmarkAction } from "../server/functions";

type DeleteBookmarkFormProps = {
  bookmark: BookmarkWithTags;
};

export const DeleteBookmarkForm = ({ bookmark }: DeleteBookmarkFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    async onSubmit() {
      await deleteBookmarkAction({ bookmarkId: bookmark.id });
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
          description="Confirm delete bookmark."
          errorMessage={form.getAllErrors().form.errors.join(", ")}
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
