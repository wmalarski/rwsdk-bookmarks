"use client";

import { IconLoader, IconPlus } from "@intentui/icons";
import { type ComponentProps, useId } from "react";

import { Button } from "@/components/button";
import type { Tag } from "@/db";

import {
  BookmarkFields,
  type BookmarkFieldsData,
  useBookmarksForm,
} from "./bookmark-fields";

type InsertBookmarkFormProps = {
  initialData?: BookmarkFieldsData;
  tags: Tag[];
};

export const InsertBookmarkForm = ({
  initialData,
  tags,
}: InsertBookmarkFormProps) => {
  const formId = useId();
  // const submission = useSubmission(insertBookmarkServerAction);

  const form = useBookmarksForm({
    onSubmit(_data) {
      //
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
  };

  return (
    <form method="post" onSubmit={onSubmit}>
      <BookmarkFields
        form={form}
        formId={formId}
        initialData={initialData}
        pending={form.state.isSubmitting}
        // result={submission.result}
        tags={tags}
        title="Share"
      />
      <Button
        form={formId}
        intent="primary"
        isDisabled={form.state.isSubmitting}
        size="sm"
        type="submit"
      >
        {form.state.isSubmitting && <IconLoader />}
        <IconPlus className="size-4" />
        Save
      </Button>
    </form>
  );
};
