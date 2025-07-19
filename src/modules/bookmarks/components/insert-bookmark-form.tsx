"use client";

import { IconPlus } from "@intentui/icons";
import { useId } from "react";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import type { Tag } from "@/db";
import { link } from "@/lib/links";

import { insertBookmark } from "../server/functions";
import { BookmarkFields, useBookmarksForm } from "./bookmark-fields";

type InsertBookmarkFormProps = {
  tags: Tag[];
};

export const InsertBookmarkForm = ({ tags }: InsertBookmarkFormProps) => {
  const formId = useId();

  const form = useBookmarksForm({
    async onSubmit(data) {
      const bookmark = await insertBookmark(data);
      window.location.href = link("/bookmarks/bookmark/:id", {
        id: bookmark.id,
      });
    },
  });

  return (
    <Card className="m-4 w-full max-w-2xl">
      <Card.Header>
        <Card.Title>Add bookmark</Card.Title>
        <Card.Description>Save bookmark to database</Card.Description>
      </Card.Header>
      <Card.Content>
        <BookmarkFields form={form} formId={formId} tags={tags} />
      </Card.Content>
      <Card.Footer className="justify-end">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          <Button
            form={formId}
            intent="primary"
            isDisabled={!form.state.canSubmit}
            isPending={form.state.isSubmitting}
            type="submit"
          >
            <IconPlus />
            Save
          </Button>
        </form.Subscribe>
      </Card.Footer>
    </Card>
  );
};
