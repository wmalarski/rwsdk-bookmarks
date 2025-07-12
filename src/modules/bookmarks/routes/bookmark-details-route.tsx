import { withUserProvider } from "@/modules/auth/with-user-provider";

export const BookmarkDetailsRoute = withUserProvider(() => {
  return <span>BookmarkDetailsRoute</span>;
});
