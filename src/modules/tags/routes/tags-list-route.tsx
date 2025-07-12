import { UserProvider } from "@/modules/auth/user-context";
import { withUserProvider } from "@/modules/auth/with-user-provider";

import { TagsList } from "../components/tags-list";

export const TagsListRoute = withUserProvider((_request, user) => {
  return (
    <UserProvider user={user}>
      <span>TagsListRoute</span>
      <TagsList />
    </UserProvider>
  );
});
