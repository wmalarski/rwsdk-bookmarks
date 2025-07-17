import { IconFilter } from "@intentui/icons";
import { type ComponentProps, useId } from "react";

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

type BookmarkFiltersProps = {
  params: FiltersSearchParams;
  tags: Tag[];
};

export const BookmarkFilters = ({ params, tags }: BookmarkFiltersProps) => {
  const formId = useId();

  const setFiltersSearchParams = useSetFiltersSearchParams();

  return (
    <Modal>
      <Button intent="secondary" size="sm">
        <IconFilter />
        Filters
      </Button>
      <Modal.Content>
        {({ close }) => {
          const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            setFiltersSearchParams(formData);

            close();
          };

          return (
            <>
              <Modal.Header>Filters</Modal.Header>
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
                <BookmarkTagsField initialTags={params["tags[]"]} tags={tags} />
              </form>
              <Modal.Footer>
                <Modal.Close />
                <Button form={formId} intent="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </>
          );
        }}
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
