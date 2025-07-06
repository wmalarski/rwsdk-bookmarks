import type { RouteMiddleware } from "rwsdk/router";

import { link } from "@/lib/links";

import { auth, setupAuth } from "./auth";

export const userMiddleware =
  (): RouteMiddleware =>
  async ({ ctx, request }) => {
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
