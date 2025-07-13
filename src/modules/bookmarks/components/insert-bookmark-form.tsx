import { IconLoader, IconPlus } from "@intentui/icons";
import type { ComponentProps } from "react";

import { Button } from "@/components/button";

import {
  BookmarkFields,
  type BookmarkFieldsData,
  useBookmarksForm,
} from "./bookmark-fields";

type InsertBookmarkFormProps = {
  initialData?: BookmarkFieldsData;
};

export const InsertBookmarkForm = ({
  initialData,
}: InsertBookmarkFormProps) => {
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
        initialData={initialData}
        pending={form.state.isSubmitting}
        // result={submission.result}
        title="Share"
      />
      <Button
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
