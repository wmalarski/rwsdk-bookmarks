import { IconCheck } from "@intentui/icons";
import { type ComponentProps, useId } from "react";

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
      //
    },
  });

  const onClick = () => {
    // history().addToHistory(bookmark.id);
  };

  // const onSubmit = useActionOnSubmit({
  //   action: completeBookmarkServerAction,
  //   onSuccess: () => {
  //     closeDialog(dialogId());
  //   },
  // });

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
  };

  return (
    <Modal>
      <Button intent="primary" onClick={onClick} size="sm">
        <IconCheck className="size-4" />
        Complete
      </Button>
      <Modal.Content>
        {() => (
          <>
            <Modal.Header>Complete</Modal.Header>
            <form id={formId} onSubmit={onSubmit}>
              <input name="bookmarkId" type="hidden" value={bookmark.id} />
              <CompleteFields
                form={form}
                // initialData={bookmark}
                // pending={form.state.isSubmitting}
                // result={submission.result}
              />
            </form>
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
