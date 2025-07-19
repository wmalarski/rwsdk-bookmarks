import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { selectTags } from "@/modules/tags/server/functions";

import { InsertBookmarkForm } from "../components/insert-bookmark-form";

export const ShareBookmarkRoute = async ({ ctx }: ProtectedRequestInfo) => {
  const tags = await selectTags({
    page: 0,
    userId: ctx.user.id,
  });

  return <InsertBookmarkForm tags={tags} />;
};
