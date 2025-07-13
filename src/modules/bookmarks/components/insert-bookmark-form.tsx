import { IconLoader } from "@intentui/icons";

import { Button } from "@/components/button";

import { formContainerRecipe } from "~/ui/form-container/form-container.recipe";
import { PlusIcon } from "~/ui/icons/plus-icon";
import { insertBookmarkServerAction } from "../server";
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
    onSubmit(data) {
      //
    },
  });

  return (
    <form
      action={insertBookmarkServerAction}
      className={formContainerRecipe({ class: "px-4" })}
      method="post"
    >
      <BookmarkFields
        form={form}
        initialData={initialData}
        pending={submission.pending}
        result={submission.result}
        title="Share"
      />
      <Button
        intent="primary"
        isDisabled={submission.pending}
        size="sm"
        type="submit"
      >
        {submission.pending && <IconLoader />}
        <PlusIcon className="size-4" />
        Save
      </Button>
    </form>
  );
};
