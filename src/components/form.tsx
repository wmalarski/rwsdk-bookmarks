import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface FormProps extends ComponentProps<"form"> {
  ref?: React.Ref<HTMLFormElement>;
}

const Form = ({ className, ref, ...props }: FormProps) => {
  return (
    <form
      ref={ref}
      {...props}
      className={twMerge("flex w-full flex-col gap-4", className)}
    />
  );
};

interface FormTitleProps extends ComponentProps<"h2"> {
  ref?: React.Ref<HTMLHeadingElement>;
}

const FormTitle = ({ className, ref, ...props }: FormTitleProps) => {
  return <h2 ref={ref} {...props} className={twMerge("text-2xl", className)} />;
};

interface FormFooterProps extends ComponentProps<"footer"> {
  ref?: React.Ref<HTMLElement>;
}

const FormFooter = ({ className, ref, ...props }: FormFooterProps) => {
  return (
    <footer
      ref={ref}
      {...props}
      className={twMerge("flex w-full flex-col items-center", className)}
    />
  );
};

export { Form, FormFooter, FormTitle };
export type { FormProps };
