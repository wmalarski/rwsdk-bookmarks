import type { RouteMiddleware } from "rwsdk/router";

import { setupDb } from "@/db";
import { link } from "@/lib/links";

import { env } from "cloudflare:workers";
import { auth, setupAuth } from "./auth";

export const userMiddleware =
  (): RouteMiddleware =>
  async ({ ctx, request }) => {
    await setupDb(env);

    setupAuth();

    try {
      const session = await auth.api.getSession({ headers: request.headers });

      ctx.user = session?.user
        ? { ...session.user, image: session.user.image ?? null }
        : null;
    } catch (error) {
      console.error("Session error:", error);
      ctx.user = null;
    }
  };

export const protectedUserMiddleware =
  (): RouteMiddleware =>
  async ({ ctx }) => {
    if (!ctx.user) {
      return new Response(null, {
        headers: { Location: link("/user/login") },
        status: 302,
      });
    }
  };
