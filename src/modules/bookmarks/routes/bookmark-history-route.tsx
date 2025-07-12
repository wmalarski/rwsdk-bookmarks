import { withUserProvider } from "@/modules/auth/with-user-provider";

export const BookmarkHistoryRoute = withUserProvider(() => {
  return <span>BookmarkHistoryRoute</span>;
});
