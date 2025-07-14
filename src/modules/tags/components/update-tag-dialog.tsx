"use client";

import { IconPencilBox } from "@intentui/icons";
import { type ComponentProps, useId } from "react";

import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import type { Tag } from "@/db";

import { TagFields, useTagForm } from "./tag-fields";

type UpdateTagDialogProps = {
  tag: Tag;
};

export const UpdateTagDialog = ({ tag }: UpdateTagDialogProps) => {
  // const dialogId = createMemo(() => `update-dialog-${tag.id}`);
  const formId = useId();

  // const submission = useSubmission(
  //   updateTagServerAction,
  //   ([form]) => form.get("tagId") === String(tag.id),
  // );

  // const onSubmit = useActionOnSubmit({
  //   action: updateTagServerAction,
  //   onSuccess: () => closeDialog(dialogId()),
  // });

  const form = useTagForm({
    initialData: tag,
    onSubmit: () => {
      //
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <Modal>
      <Button intent="secondary" size="sm">
        <IconPencilBox className="size-4" />
        Update
      </Button>
      <Modal.Content>
        {() => (
          <>
            <Modal.Header>Update</Modal.Header>
            <Modal.Body>
              <form id={formId} onSubmit={onSubmit}>
                <input name="tagId" type="hidden" value={tag.id} />
                <TagFields
                  form={form}
                  // title="Update"
                  // pending={submission.pending}
                  // result={
                  //   submission.result?.success ? undefined : submission.result
                  // }
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close />
              <Button
                form={formId}
                intent="primary"
                isDisabled={form.state.isSubmitting}
                isPending={form.state.isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};
