import { decode } from "decode-formdata";
import * as v from "valibot";

import { useSearchParams } from "@/lib/use-search-params";

export const createDoneSchema = () => {
  return v.optional(
    v.union([
      v.literal("all"),
      v.literal("completed"),
      v.literal("uncompleted"),
    ]),
    "all",
  );
};

const createRandomSchema = () => {
  return v.optional(
    v.pipe(v.union([v.literal("on"), v.literal("off")])),
    "off",
  );
};

const createQuerySchema = () => {
  return v.optional(v.string());
};

const createFiltersFormSchema = () => {
  return v.object({
    done: createDoneSchema(),
    query: createQuerySchema(),
    random: createRandomSchema(),
    "tags[]": v.optional(v.array(v.number()), []),
  });
};

export const createFiltersSearchParamsSchema = () => {
  return v.object({
    done: createDoneSchema(),
    query: createQuerySchema(),
    random: createRandomSchema(),
    "tags[]": v.optional(
      v.union([
        v.array(v.string()),
        v.pipe(
          v.string(),
          v.transform((value) => [value]),
        ),
      ]),
      [],
    ),
  });
};

export type FiltersSearchParams = v.InferOutput<
  ReturnType<typeof createFiltersSearchParamsSchema>
>;

type SearchParams = ReturnType<typeof useSearchParams>[0];

export const parseFiltersSearchParams = (params: SearchParams) => {
  const schema = createFiltersSearchParamsSchema();
  return v.parse(schema, params);
};

export const useFiltersSearchParams = () => {
  const [params] = useSearchParams();
  return parseFiltersSearchParams(params);
};

export const useSetFiltersSearchParams = () => {
  const [, setSearchParams] = useSearchParams();

  return (formData: FormData) => {
    const decoded = decode(formData, {
      arrays: ["tags[]"],
      numbers: ["tags[]"],
    });

    const parsed = v.parse(createFiltersFormSchema(), decoded);

    setSearchParams(parsed);
  };
};
