import * as v from "valibot";

const TAGS_DELIMITER = ",";

export const createDoneSchema = () => {
  return v.union([
    v.literal("all"),
    v.literal("completed"),
    v.literal("uncompleted"),
  ]);
};

const createRandomSchema = () => {
  return v.pipe(v.union([v.literal("on"), v.literal("off")]));
};

const createQuerySchema = () => {
  return v.optional(v.string());
};

export const createBookmarkFiltersFormSchema = () => {
  return v.partial(
    v.object({
      done: createDoneSchema(),
      query: createQuerySchema(),
      random: createRandomSchema(),
      tags: v.array(v.string()),
    }),
  );
};

export type BookmarkFiltersFormData = v.InferOutput<
  ReturnType<typeof createBookmarkFiltersFormSchema>
>;

export const createBookmarkFiltersSearchParamsSchema = () => {
  return v.object({
    done: v.optional(createDoneSchema(), "uncompleted"),
    query: v.optional(createQuerySchema(), ""),
    random: v.optional(createRandomSchema(), "on"),
    tags: v.optional(
      v.pipe(
        v.string(),
        v.transform((value) =>
          value.split(TAGS_DELIMITER).filter((tag) => tag.length > 0),
        ),
      ),
      "",
    ),
  });
};

export type BookmarkFiltersSearchParams = v.InferOutput<
  ReturnType<typeof createBookmarkFiltersSearchParamsSchema>
>;

export type BookmarkDoneFilter = BookmarkFiltersSearchParams["done"];

export const parseFiltersSearchParams = (params: URLSearchParams) => {
  const schema = createBookmarkFiltersSearchParamsSchema();
  const data = Object.fromEntries(params.entries());
  return v.parse(schema, data);
};

export const applyBookmarksFilters = (data: BookmarkFiltersFormData) => {
  const searchParams = new URLSearchParams();

  if (data.done) {
    searchParams.set("done", data.done);
  }

  if (data.query) {
    searchParams.set("query", data.query);
  }

  if (data.random) {
    searchParams.set("random", data.random);
  }

  if (data.tags) {
    searchParams.set("tags", data.tags.join(TAGS_DELIMITER));
  }

  window.location.search = searchParams.toString();
};
