import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { UserProvider } from "@/modules/auth/user-context";

import { TagsList } from "../components/tags-list";
import { selectTags } from "../server/db";

export const TagsListRoute = async (request: ProtectedRequestInfo) => {
  const tags = await selectTags({
    page: 0,
    userId: request.ctx.user.id,
  });

  return (
    <UserProvider user={request.ctx.user}>
      <span>TagsListRoute</span>
      <TagsList tags={tags} />
    </UserProvider>
  );
};
