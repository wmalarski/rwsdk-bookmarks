import { Button, type ButtonProps } from "./button";
import { Modal } from "./modal";
import { Note } from "./note";

type AlertDialogProps = {
  title: string;
  description?: string;
  confirm: string;
  confirmIntent?: ButtonProps["intent"];
  pending?: boolean;
  errorMessage?: string;
};

export const AlertDialog = ({
  confirm,
  title,
  confirmIntent,
  description,
  errorMessage,
  pending,
}: AlertDialogProps) => {
  return (
    <Modal>
      <Modal.Content>
        {() => (
          <>
            <Modal.Header>{title}</Modal.Header>

            {errorMessage ? <Note intent="danger">{errorMessage}</Note> : null}

            {description ? (
              <Modal.Description>{description}</Modal.Description>
            ) : null}

            <Modal.Footer>
              <Modal.Close />
              <Button
                intent={confirmIntent}
                isDisabled={pending}
                isPending={pending}
                type="submit"
              >
                {confirm}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};
