import type { ReactNode } from "react";
import type { RequestInfo } from "rwsdk/worker";

import type { User } from "@/db";

import { redirectToLoginResponse } from "./server/middleware";
import { UserProvider } from "./user-context";

export const withUserProvider = (
  route: (
    request: RequestInfo,
    user: User,
  ) => Response | ReactNode | Promise<Response | ReactNode>,
) => {
  return async (request: RequestInfo) => {
    if (!request.ctx.user) {
      return redirectToLoginResponse();
    }

    const response = await route(request, request.ctx.user);

    if (response instanceof Response) {
      return response;
    }

    return <UserProvider user={request.ctx.user}>{response}</UserProvider>;
  };
};
