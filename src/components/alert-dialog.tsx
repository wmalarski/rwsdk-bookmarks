import { Button, type ButtonProps } from "./button";
import { Modal } from "./modal";
import { Note } from "./note";

type AlertDialogProps = {
  confirmText: string;
  confirmIntent?: ButtonProps["intent"];
  description?: string;
  errorMessage?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onOpenChange: (isOpen: boolean) => void;
  pending?: boolean;
  title: string;
};

export const AlertDialog = ({
  confirmText,
  confirmIntent,
  description,
  errorMessage,
  isOpen,
  onConfirm,
  onOpenChange,
  pending,
  title,
}: AlertDialogProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>

          {errorMessage ? <Note intent="danger">{errorMessage}</Note> : null}

          {description ? (
            <Modal.Description>{description}</Modal.Description>
          ) : null}
        </Modal.Header>
        <Modal.Footer>
          <Modal.Close>Close</Modal.Close>
          <Button
            intent={confirmIntent}
            isDisabled={pending}
            isPending={pending}
            onPress={onConfirm}
            type="submit"
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
