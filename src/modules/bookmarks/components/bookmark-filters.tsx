import { IconFilter } from "@intentui/icons";
import { useForm } from "@tanstack/react-form";
import { type ComponentProps, useId, useState } from "react";
import * as v from "valibot";

import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Label } from "@/components/field";
import { Modal } from "@/components/modal";
import { Radio, RadioGroup } from "@/components/radio";
import { TextField } from "@/components/text-field";
import type { Tag } from "@/db";

import {
  type FiltersSearchParams,
  useSetFiltersSearchParams,
} from "../utils/use-filters-search-params";
import { BookmarkTagsField } from "./bookmark-tags-field";

const bookmarksFiltersSchema = () => {
  return v.object({
    done: v.union([
      v.literal("all"),
      v.literal("completed"),
      v.literal("uncompleted"),
    ]),
    query: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  });
};

export type BookmarkFiltersData = v.InferOutput<
  ReturnType<typeof bookmarksFiltersSchema>
>;

type BookmarkFiltersProps = {
  params: FiltersSearchParams;
  tags: Tag[];
};

export const BookmarkFilters = ({ params, tags }: BookmarkFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formId = useId();

  const form = useForm({
    defaultValues: {},
    async onSubmit({ value }) {
      // onSubmit(value);
    },
    validators: {
      onChange: bookmarksFiltersSchema(),
    },
  });

  const setFiltersSearchParams = useSetFiltersSearchParams();

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setFiltersSearchParams(formData);

    setIsOpen(false);
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
            <Checkbox isSelected={params.random === "on"} name="random">
              Random
            </Checkbox>
            <DoneFilter done={params.done} />
            <TextField
              className="w-full"
              id="query"
              label="Query"
              name="query"
              placeholder="Query"
              value={params.query ?? ""}
            />
            <BookmarkTagsField
              onChange={() => void 0}
              selectedTags={params["tags[]"]}
              tags={tags}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close />
          <Button form={formId} intent="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

type DoneFilterProps = {
  done: FiltersSearchParams["done"];
};

const DoneFilter = ({ done }: DoneFilterProps) => {
  const options: FiltersSearchParams["done"][] = [
    "all",
    "completed",
    "uncompleted",
  ];

  return (
    <RadioGroup name="done" value={done}>
      {options.map((option) => (
        <Radio key={option} value={option}>
          <Label>{option}</Label>
        </Radio>
      ))}
    </RadioGroup>
  );
};
