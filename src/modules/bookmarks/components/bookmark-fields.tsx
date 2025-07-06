import { useForm } from "@tanstack/react-form";
import * as v from "valibot";

import { Form, FormTitle } from "@/components/form";
import { Note } from "@/components/note";
import { TextField } from "@/components/text-field";
import { formatValidationErrors } from "@/lib/formatters";

import { BookmarkTagsField } from "./bookmark-tags-field";

const bookmarksFieldsSchema = () => {
  return v.object({
    preview: v.optional(v.string()),
    tags: v.optional(v.array(v.number())),
    text: v.optional(v.string()),
    title: v.optional(v.string()),
    url: v.optional(v.string()),
  });
};

export type BookmarkFieldsData = v.InferOutput<
  ReturnType<typeof bookmarksFieldsSchema>
>;

type UseBookmarksFormArgs = {
  onSubmit: (data: BookmarkFieldsData) => void;
};

export const useBookmarksForm = ({ onSubmit }: UseBookmarksFormArgs) => {
  return useForm({
    defaultValues: {} as BookmarkFieldsData,
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onChange: bookmarksFieldsSchema(),
    },
  });
};

type BookmarkFieldsProps = {
  form: ReturnType<typeof useBookmarksForm>;
  initialData?: BookmarkFieldsData;
  pending?: boolean;
  result?: string;
  title: string;
};

export const BookmarkFields = ({
  form,
  title,
  initialData,
  pending,
  result,
}: BookmarkFieldsProps) => {
  return (
    <Form>
      <FormTitle>{title}</FormTitle>

      {result && result.length > 0 ? (
        <Note intent="danger">{result}</Note>
      ) : null}

      <form.Field name="title">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Title"
            type="text"
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="text">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Text"
            type="text"
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="url">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Url"
            type="url"
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="preview">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Url"
            type="text"
            value={field.state.value}
          />
        )}
      </form.Field>

      <BookmarkTagsField disabled={pending} initialTags={initialData?.tags} />
    </Form>
  );
};
