import { Heading } from "@/components/heading";
import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";

import { InsertTagDialog } from "../components/insert-tag-dialog";
import { TagsList } from "../components/tags-list";
import { selectTags } from "../server/functions";

export const TagsListRoute = async ({ ctx }: ProtectedRequestInfo) => {
  const userId = ctx.user.id;

  const tags = await selectTags({ page: 0, userId });

  return (
    <div className="flex w-full max-w-xl flex-col gap-4 px-2 py-4">
      <div className="flex items-center justify-between gap-2">
        <Heading level={2}>Tags</Heading>
        <InsertTagDialog />
      </div>
      <TagsList tags={tags} />
    </div>
  );
};
