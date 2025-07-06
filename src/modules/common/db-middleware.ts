import type { RouteMiddleware } from "rwsdk/router";

import { setupDb } from "@/db";

import { env } from "cloudflare:workers";

export const dbMiddleware = (): RouteMiddleware => async () => {
  await setupDb(env);
};
