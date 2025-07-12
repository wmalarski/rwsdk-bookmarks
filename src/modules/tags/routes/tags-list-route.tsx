import type { ProtectedRequestInfo } from "@/modules/auth/protected-app-context";
import { UserProvider } from "@/modules/auth/user-context";

import { TagsList } from "../components/tags-list";

export const TagsListRoute = (request: ProtectedRequestInfo) => {
  return (
    <UserProvider user={request.ctx.user}>
      <span>TagsListRoute</span>
      <TagsList />
    </UserProvider>
  );
};
