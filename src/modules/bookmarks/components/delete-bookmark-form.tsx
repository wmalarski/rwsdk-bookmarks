"use client";

import { IconTrash } from "@intentui/icons";
import { type ComponentProps, useState } from "react";

import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/button";

import type { BookmarkWithTags } from "../server/db";

type DeleteBookmarkFormProps = {
  bookmark: BookmarkWithTags;
};

export const DeleteBookmarkForm = ({ bookmark }: DeleteBookmarkFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
  };

  const onConfirm = () => {
    //
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="bookmarkId" type="hidden" value={bookmark.id} />
      <Button intent="danger" size="sm">
        <IconTrash className="size-4" />
        Delete
      </Button>
      <AlertDialog
        confirmIntent="danger"
        confirmText="Delete"
        isOpen={isOpen}
        onConfirm={onConfirm}
        onOpenChange={setIsOpen}
        pending={false}
        title="Delete"
      />
    </form>
  );
};
