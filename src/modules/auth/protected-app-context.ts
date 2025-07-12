import type { RequestInfo } from "rwsdk/worker";

import type { User } from "@/db";

export type ProtectedAppContext = {
  user: User;
};

// biome-ignore lint/suspicious/noExplicitAny: Needed
export type ProtectedRequestInfo<Params = any> = RequestInfo<
  Params,
  ProtectedAppContext
>;
