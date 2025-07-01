import { env } from "cloudflare:workers";
import { prefix, render, route } from "rwsdk/router";
import { defineApp, ErrorResponse } from "rwsdk/worker";
import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { userRoutes } from "@/app/pages/user/routes";
import { db, setupDb, type User } from "@/db";
import type { Session } from "./session/durable-object";
import { sessions, setupSessionStore } from "./session/store";

export { SessionDurableObject } from "./session/durable-object";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          headers,
          status: 302,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  },
  render(Document, [
    route("/", () => new Response("Hello, World!")),
    route("/ping", () => <h1>Pong!</h1>),
    route("/protected", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            headers: { Location: "/user/login" },
            status: 302,
          });
        }
      },
      Home,
    ]),
    prefix("/user", userRoutes),
  ]),
]);
