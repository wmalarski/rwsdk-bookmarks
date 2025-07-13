import * as v from "valibot";

export const getIsLink = (text: string) => {
  return v.safeParse(v.pipe(v.string(), v.url()), text).success;
};
