import { useForm } from "@tanstack/react-form";
import * as v from "valibot";

import { Form, FormTitle } from "@/components/form";
import { Note } from "@/components/note";
import { TextField } from "@/components/text-field";
import { formatValidationErrors } from "@/lib/formatters";

const tagFieldsSchema = () => {
  return v.object({
    name: v.string(),
  });
};

export type TagFieldsData = v.InferOutput<ReturnType<typeof tagFieldsSchema>>;

type UseTagFormArgs = {
  onSubmit: (data: TagFieldsData) => void;
  initialData?: TagFieldsData;
};

export const useTagForm = ({ onSubmit, initialData }: UseTagFormArgs) => {
  return useForm({
    defaultValues: { name: "", ...initialData } as TagFieldsData,
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onChange: tagFieldsSchema(),
    },
  });
};

type TagFieldsProps = {
  form: ReturnType<typeof useTagForm>;
  result?: string;
  title: string;
};

export const TagFields = ({ form, result, title }: TagFieldsProps) => {
  return (
    <Form>
      <FormTitle>{title}</FormTitle>

      {result && result.length > 0 ? (
        <Note intent="danger">{result}</Note>
      ) : null}

      <form.Field name="name">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Name"
            type="text"
            value={field.state.value}
          />
        )}
      </form.Field>
    </Form>
  );
};
