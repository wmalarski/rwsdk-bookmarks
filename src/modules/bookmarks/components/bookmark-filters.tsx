import { IconFilter } from "@intentui/icons";
import { useForm } from "@tanstack/react-form";
import { type ComponentProps, useId, useState } from "react";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Label } from "@/components/field";
import { Modal } from "@/components/modal";
import { Radio, RadioGroup } from "@/components/radio";
import { TextField } from "@/components/text-field";
import type { Tag } from "@/db";
import { formatValidationErrors } from "@/lib/formatters";

import {
  applyBookmarksFilters,
  type BookmarkDoneFilter,
  type BookmarkFiltersFormData,
  type BookmarkFiltersSearchParams,
  createBookmarkFiltersFormSchema,
} from "../utils/bookmarks-filters-search-params";
import { BookmarkTagsField } from "./bookmark-tags-field";

type BookmarkFiltersProps = {
  params: BookmarkFiltersSearchParams;
  tags: Tag[];
};

export const BookmarkFilters = ({ params, tags }: BookmarkFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formId = useId();

  const form = useForm({
    defaultValues: params as BookmarkFiltersFormData,
    async onSubmit({ value }) {
      setIsOpen(false);
      applyBookmarksFilters(value);
    },
    validators: {
      onChange: createBookmarkFiltersFormSchema(),
    },
  });

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();
    await form.handleSubmit();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button intent="secondary">
        <IconFilter />
        Filters
      </Button>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id={formId} onSubmit={onSubmit}>
            <form.Field name="random">
              {(field) => (
                <Checkbox
                  id={field.name}
                  isSelected={field.state.value === "on"}
                  label="Random"
                  name="random"
                  onBlur={field.handleBlur}
                  onChange={(isSelected) =>
                    field.handleChange(isSelected ? "on" : "off")
                  }
                />
              )}
            </form.Field>
            <form.Field name="done">
              {(field) => (
                <DoneFilter
                  done={field.state.value ?? "uncompleted"}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                />
              )}
            </form.Field>
            <form.Field name="query">
              {(field) => (
                <TextField
                  errorMessage={formatValidationErrors(field.state.meta.errors)}
                  id={field.name}
                  label="Query"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  placeholder="Query"
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Close</Modal.Close>
          <Button form={formId} intent="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

type DoneFilterProps = {
  name: string;
  done: BookmarkDoneFilter;
  onBlur: () => void;
  onChange: (value: BookmarkDoneFilter) => void;
};

const DoneFilter = ({ name, done, onBlur, onChange }: DoneFilterProps) => {
  const options: BookmarkDoneFilter[] = ["all", "completed", "uncompleted"];

  const onRadioChange = (value: string) => {
    onChange(value as BookmarkDoneFilter);
  };

  return (
    <RadioGroup name={name} onChange={onRadioChange} value={done}>
      {options.map((option) => (
        <Radio key={option} onBlur={onBlur} value={option}>
          <Label>{option}</Label>
        </Radio>
      ))}
    </RadioGroup>
  );
};
