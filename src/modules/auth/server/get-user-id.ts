"use server";

import type { RequestInfo } from "rwsdk/worker";

export const getUserId = (requestInfo: RequestInfo) => {
  const userId = requestInfo.ctx.user?.id;

  if (!userId) {
    throw new Response(null, { status: 401 });
  }

  return userId;
};
