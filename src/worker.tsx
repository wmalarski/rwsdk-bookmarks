import { prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { userRoutes } from "@/app/pages/user/routes";

import { env } from "cloudflare:workers";
import { setupDb, type User } from "./db";
import { auth, setupAuth } from "./lib/auth";
import { link } from "./lib/links";

export type AppContext = {
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
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
  },
  route("/api/auth/*", async ({ request }) => auth.handler(request)),
  render(Document, [
    route("/", () => new Response("Hello, World!")),
    route("/protected", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            headers: { Location: link("/user/login") },
            status: 302,
          });
        }
      },
      Home,
    ]),
    prefix("/user", userRoutes),
  ]),
]);
