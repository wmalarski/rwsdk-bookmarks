import { useCallback, useMemo } from "react";

export const formatValidationErrors = <Error extends { message: string }>(
  errors?: (Error | undefined)[],
) => {
  return errors
    ?.map((error) => error?.message)
    .filter(Boolean)
    .join(", ");
};

export const useDateFormatter = () => {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        hour12: false,
        timeStyle: "medium",
      }),
    [],
  );
  return useCallback(
    (date: string | Date) => formatter.format(new Date(date)),
    [formatter.format],
  );
};
