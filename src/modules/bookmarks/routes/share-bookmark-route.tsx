import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { selectTags } from "@/modules/tags/server/functions";

import { InsertBookmarkForm } from "../components/insert-bookmark-form";

export const ShareBookmarkRoute = async ({ ctx }: ProtectedRequestInfo) => {
  const userId = ctx.user.id;

  const tags = await selectTags({ page: 0, userId });

  return <InsertBookmarkForm tags={tags} />;
};
