export const formatValidationErrors = <Error extends { message: string }>(
  errors?: (Error | undefined)[],
) => {
  return errors
    ?.map((error) => error?.message)
    .filter(Boolean)
    .join(", ");
};
