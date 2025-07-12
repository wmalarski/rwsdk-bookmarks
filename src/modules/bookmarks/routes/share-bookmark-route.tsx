import { withUserProvider } from "@/modules/auth/with-user-provider";

export const ShareBookmarkRoute = withUserProvider(() => {
  return <span>ShareBookmarkRoute</span>;
});
