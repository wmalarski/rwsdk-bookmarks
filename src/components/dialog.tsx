import { IconX } from "@intentui/icons";
import { useEffect, useRef } from "react";
import type { HeadingProps, TextProps } from "react-aria-components";
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
  Text,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { composeTailwindRenderProps } from "@/lib/primitive";

import { Button, type ButtonProps } from "./button";

const Dialog = ({
  role = "dialog",
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive>) => {
  return (
    <DialogPrimitive
      className={twMerge(
        "peer/dialog group/dialog relative flex max-h-[inherit] flex-col overflow-hidden outline-hidden [--gutter:--spacing(6)] [scrollbar-width:thin] sm:[--gutter:--spacing(8)] [&::-webkit-scrollbar]:size-0.5",
        className,
      )}
      role={role}
      {...props}
    />
  );
};

const DialogTrigger = (props: React.ComponentProps<typeof ButtonPrimitive>) => (
  <ButtonPrimitive {...props} />
);

interface DialogHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: string;
  description?: string;
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          "--dialog-header-height",
          `${entry.target.clientHeight}px`,
        );
      }
    });

    observer.observe(header);
    return () => observer.unobserve(header);
  }, []);

  return (
    <div
      className={twMerge(
        "relative space-y-1 p-(--gutter) pb-[calc(var(--gutter)---spacing(3))]",
        className,
      )}
      data-slot="dialog-header"
      ref={headerRef}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.description && (
        <DialogDescription>{props.description}</DialogDescription>
      )}
      {!props.title && typeof props.children === "string" ? (
        <DialogTitle {...props} />
      ) : (
        props.children
      )}
    </div>
  );
};

interface DialogTitleProps extends HeadingProps {
  ref?: React.Ref<HTMLHeadingElement>;
}
const DialogTitle = ({ className, ref, ...props }: DialogTitleProps) => (
  <Heading
    className={twMerge(
      "text-balance font-semibold text-fg text-lg/6 sm:text-base/6",
      className,
    )}
    ref={ref}
    slot="title"
    {...props}
  />
);

interface DialogDescriptionProps extends TextProps {
  ref?: React.Ref<HTMLDivElement>;
}
const DialogDescription = ({
  className,
  ref,
  ...props
}: DialogDescriptionProps) => (
  <Text
    className={twMerge(
      "text-pretty text-base/6 text-muted-fg group-disabled:opacity-50 sm:text-sm/6",
      className,
    )}
    ref={ref}
    slot="description"
    {...props}
  />
);

interface DialogBodyProps extends React.ComponentProps<"div"> {}
const DialogBody = ({ className, ref, ...props }: DialogBodyProps) => (
  <div
    className={twMerge(
      "isolate flex max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))] flex-1 flex-col overflow-auto px-(--gutter) py-1",
      className,
    )}
    data-slot="dialog-body"
    ref={ref}
    {...props}
  />
);

interface DialogFooterProps extends React.ComponentProps<"div"> {}
const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          "--dialog-footer-height",
          `${entry.target.clientHeight}px`,
        );
      }
    });

    observer.observe(footer);
    return () => {
      observer.unobserve(footer);
    };
  }, []);
  return (
    <div
      className={twMerge(
        "isolate mt-auto flex flex-col-reverse justify-between gap-3 p-(--gutter) pt-[calc(var(--gutter)---spacing(3))] group-not-has-data-[slot=dialog-body]/dialog:pt-0 group-not-has-data-[slot=dialog-body]/popover:pt-0 sm:flex-row",
        className,
      )}
      data-slot="dialog-footer"
      ref={footerRef}
      {...props}
    />
  );
};

const DialogClose = ({
  className,
  intent = "outline",
  ref,
  ...props
}: ButtonProps) => {
  return (
    <Button
      className={className}
      intent={intent}
      ref={ref}
      slot="close"
      {...props}
    />
  );
};

interface CloseButtonIndicatorProps extends Omit<ButtonProps, "children"> {
  className?: string;
  isDismissable?: boolean | undefined;
}

const DialogCloseIcon = ({
  className,
  ...props
}: CloseButtonIndicatorProps) => {
  return props.isDismissable ? (
    <ButtonPrimitive
      aria-label="Close"
      className={composeTailwindRenderProps(
        className,
        "close absolute top-1 right-1 z-50 grid size-8 place-content-center rounded-xl hover:bg-secondary focus:bg-secondary focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary sm:top-2 sm:right-2 sm:size-7 sm:rounded-md",
      )}
      slot="close"
    >
      <IconX className="size-4" />
    </ButtonPrimitive>
  ) : null;
};

export type {
  DialogHeaderProps,
  DialogTitleProps,
  DialogBodyProps,
  DialogFooterProps,
  DialogDescriptionProps,
  CloseButtonIndicatorProps,
};
export {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogCloseIcon,
};
