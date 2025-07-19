"use client";

import { useForm } from "@tanstack/react-form";
import * as v from "valibot";

import { Form } from "@/components/form";
import { Note } from "@/components/note";
import { TextField } from "@/components/text-field";
import type { Tag } from "@/db";
import { formatValidationErrors } from "@/lib/formatters";

import { BookmarkTagsField } from "./bookmark-tags-field";

const bookmarksFieldsSchema = () => {
  return v.object({
    preview: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    text: v.optional(v.string()),
    title: v.string(),
    url: v.optional(v.string()),
  });
};

export type BookmarkFieldsData = v.InferOutput<
  ReturnType<typeof bookmarksFieldsSchema>
>;

type UseBookmarksFormArgs = {
  initialData?: BookmarkFieldsData;
  onSubmit: (data: BookmarkFieldsData) => void;
};

export const useBookmarksForm = ({
  initialData,
  onSubmit,
}: UseBookmarksFormArgs) => {
  return useForm({
    defaultValues: { title: "", ...initialData },
    async onSubmit({ value }) {
      onSubmit(value);
    },
    validators: {
      onChange: bookmarksFieldsSchema(),
    },
  });
};

type BookmarkFieldsProps = {
  form: ReturnType<typeof useBookmarksForm>;
  errorMessage?: string;
  tags: Tag[];
  formId: string;
};

export const BookmarkFields = ({
  form,
  errorMessage,
  tags,
  formId,
}: BookmarkFieldsProps) => {
  return (
    <Form className="w-full" form={form} id={formId}>
      {errorMessage && errorMessage.length > 0 ? (
        <Note intent="danger">{errorMessage}</Note>
      ) : null}

      <form.Field name="title">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            label="Title"
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
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
            label="Text"
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
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
            label="Url"
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
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
            label="Preview"
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            type="text"
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="tags">
        {(field) => (
          <BookmarkTagsField
            disabled={field.form.state.isSubmitting}
            onChange={field.handleChange}
            selectedTags={field.state.value}
            tags={tags}
          />
        )}
      </form.Field>
    </Form>
  );
};
