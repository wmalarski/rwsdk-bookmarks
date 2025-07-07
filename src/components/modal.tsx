"use client";

import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps,
} from "react-aria-components";
import {
  composeRenderProps,
  DialogTrigger as DialogTriggerPrimitive,
  ModalOverlay,
  Modal as ModalPrimitive,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogCloseIcon,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const Modal = (props: DialogTriggerProps) => {
  return <DialogTriggerPrimitive {...props} />;
};

const sizes = {
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  lg: "sm:max-w-lg",
  md: "sm:max-w-md",
  sm: "sm:max-w-sm",
  xl: "sm:max-w-xl",
  xs: "sm:max-w-xs",
};

interface ModalContentProps
  extends Omit<ModalOverlayProps, "className" | "children">,
    Pick<DialogProps, "aria-label" | "aria-labelledby" | "role" | "children"> {
  size?: keyof typeof sizes;
  closeButton?: boolean;
  isBlurred?: boolean;
  className?: ModalOverlayProps["className"];
  overlay?: Omit<ModalOverlayProps, "children">;
}

const ModalContent = ({
  className,
  isDismissable: isDismissableInternal,
  isBlurred = false,
  children,
  overlay,
  size = "lg",
  role = "dialog",
  closeButton = true,
  ...props
}: ModalContentProps) => {
  const isDismissable = isDismissableInternal ?? role !== "alertdialog";

  return (
    <ModalOverlay
      className={composeRenderProps(
        overlay?.className,
        (className, { isEntering, isExiting }) =>
          twMerge([
            "fixed inset-0 z-50 h-(--visual-viewport-height) w-screen",
            "flex items-end justify-end bg-fg/15 sm:justify-center dark:bg-bg/40",
            "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
            isBlurred &&
              "bg-bg bg-clip-padding supports-backdrop-filter:bg-bg/15 supports-backdrop-filter:backdrop-blur dark:supports-backdrop-filter:bg-bg/40",
            isEntering && "fade-in animate-in duration-200 ease-out",
            isExiting && "fade-out animate-out ease-in",
            className,
          ]),
      )}
      isDismissable={isDismissable}
      {...props}
    >
      <ModalPrimitive
        className={composeRenderProps(
          className,
          (className, { isEntering, isExiting }) =>
            twMerge([
              "max-h-full w-full rounded-t-2xl bg-overlay text-left align-middle text-overlay-fg shadow-lg ring-1 ring-fg/5",
              "overflow-hidden sm:rounded-2xl dark:ring-border",
              "sm:-translate-y-1/2 sm:-translate-x-1/2 fixed sm:top-1/2 sm:left-1/2",
              isEntering &&
                "fade-in slide-in-from-bottom sm:zoom-in-95 sm:slide-in-from-bottom-0 animate-in duration-200 ease-out",
              isExiting &&
                "slide-out-to-bottom sm:slide-out-to-bottom-0 sm:zoom-out-95 animate-out duration-150 ease-in",
              sizes[size],
              className,
            ]),
        )}
      >
        <Dialog role={role}>
          {(values) => (
            <>
              {typeof children === "function" ? children(values) : children}
              {closeButton && <DialogCloseIcon isDismissable={isDismissable} />}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  );
};

const ModalTrigger = DialogTrigger;
const ModalHeader = DialogHeader;
const ModalTitle = DialogTitle;
const ModalDescription = DialogDescription;
const ModalFooter = DialogFooter;
const ModalBody = DialogBody;
const ModalClose = DialogClose;

Modal.Trigger = ModalTrigger;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;
Modal.Close = ModalClose;
Modal.Content = ModalContent;

export { Modal };
