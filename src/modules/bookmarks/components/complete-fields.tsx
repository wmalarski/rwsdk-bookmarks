"use client";

import { useForm } from "@tanstack/react-form";
import * as v from "valibot";

import { Checkbox } from "@/components/checkbox";
import { Form } from "@/components/form";
import { Note } from "@/components/note";
import { NumberField } from "@/components/number-field";
import { TextField } from "@/components/text-field";
import { formatValidationErrors } from "@/lib/formatters";

const completeFieldsSchema = () => {
  return v.object({
    done: v.boolean(),
    note: v.optional(v.string()),
    rate: v.optional(v.number()),
  });
};

export type CompleteFieldsData = v.InferOutput<
  ReturnType<typeof completeFieldsSchema>
>;

type UseCompleteFormArgs = {
  onSubmit: (data: CompleteFieldsData) => void;
  initialData?: CompleteFieldsData;
};

export const useCompleteForm = ({
  initialData,
  onSubmit,
}: UseCompleteFormArgs) => {
  return useForm({
    defaultValues: {
      done: false,
      note: "",
      rate: 5,
      ...initialData,
    } as CompleteFieldsData,
    async onSubmit({ value }) {
      onSubmit(value);
    },
    validators: {
      onChange: completeFieldsSchema(),
    },
  });
};

type CompleteFieldsProps = {
  formId: string;
  form: ReturnType<typeof useCompleteForm>;
  errorMessage?: string;
};

export const CompleteFields = ({
  form,
  formId,
  errorMessage,
}: CompleteFieldsProps) => {
  return (
    <Form form={form} id={formId}>
      {errorMessage && errorMessage.length > 0 ? (
        <Note intent="danger">{errorMessage}</Note>
      ) : null}

      <form.Field name="done">
        {(field) => (
          <Checkbox
            id={field.name}
            isSelected={field.state.value}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
          >
            Done
          </Checkbox>
        )}
      </form.Field>

      <form.Field name="rate">
        {(field) => (
          <NumberField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            label="Rate"
            maxValue={10}
            minValue={0}
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            step={0.1}
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="note">
        {(field) => (
          <TextField
            errorMessage={formatValidationErrors(field.state.meta.errors)}
            id={field.name}
            label="Note"
            name={field.name}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder="Note"
            value={field.state.value}
          />
        )}
      </form.Field>
    </Form>
  );
};
