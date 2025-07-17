import { IconCheck } from "@intentui/icons";
import { useId } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";

import type { BookmarkWithTags } from "../server/db";
import { CompleteFields, useCompleteForm } from "./complete-fields";

type CompleteDialogProps = {
  bookmark: BookmarkWithTags;
};

export const CompleteDialog = ({ bookmark }: CompleteDialogProps) => {
  const formId = useId();

  // const submission = useSubmission(
  //   completeBookmarkServerAction,
  //   ([form]) => form.get("bookmarkId") === String(bookmark.id),
  // );

  // const history = useBookmarksHistory();
  const form = useCompleteForm({
    onSubmit() {
      console.log("[bookmark]", bookmark);
      //
    },
  });

  const onPress = () => {
    // history().addToHistory(bookmark.id);
  };

  // const onSubmit = useActionOnSubmit({
  //   action: completeBookmarkServerAction,
  //   onSuccess: () => {
  //     closeDialog(dialogId());
  //   },
  // });

  return (
    <Modal>
      <Button intent="primary" onPress={onPress} size="sm">
        <IconCheck className="size-4" />
        Complete
      </Button>
      <Modal.Content>
        {() => (
          <>
            <Modal.Header>Complete</Modal.Header>
            <CompleteFields
              form={form}
              formId={formId}
              // initialData={bookmark}
              // pending={form.state.isSubmitting}
              // result={submission.result}
            />
            <Modal.Footer>
              <Modal.Close />
              <Button
                form={formId}
                intent="primary"
                isDisabled={form.state.isSubmitting}
                isPending={form.state.isSubmitting}
                type="submit"
              >
                Complete
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};
