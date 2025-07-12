import { layout, prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/document";
import { userRoutes } from "@/modules/auth/routes/routes";
import { setCommonHeaders } from "@/modules/common/headers";
import { Home } from "@/modules/home/home-route";

import type { User } from "./db";
import { auth } from "./modules/auth/server/auth";
import {
  protectedUserMiddleware,
  userMiddleware,
} from "./modules/auth/server/middleware";
import { bookmarkRoutes } from "./modules/bookmarks/routes/routes";
import { dbMiddleware } from "./modules/common/db-middleware";
import { PageLayout } from "./modules/common/layout";
import { tagsRoutes } from "./modules/tags/routes/routes";

export type AppContext = {
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
  dbMiddleware(),
  userMiddleware(),
  route("/api/auth/*", async ({ request }) => auth.handler(request)),
  render(Document, [
    route("/", Home),
    prefix("/user", userRoutes),
    layout(PageLayout, [
      protectedUserMiddleware(),
      prefix("/bookmarks", bookmarkRoutes),
      prefix("/tags", tagsRoutes),
    ]),
  ]),
]);
