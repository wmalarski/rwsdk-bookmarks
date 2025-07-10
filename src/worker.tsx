import { prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/document";
import { userRoutes } from "@/modules/auth/routes/routes";
import { Home } from "@/modules/bookmarks/routes/home";
import { setCommonHeaders } from "@/modules/common/headers";

import type { User } from "./db";
import { auth } from "./modules/auth/server/auth";
import {
  protectedUserMiddleware,
  userMiddleware,
} from "./modules/auth/server/middleware";
import { bookmarkRoutes } from "./modules/bookmarks/routes/routes";
import { dbMiddleware } from "./modules/common/db-middleware";

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
    prefix("/app", [protectedUserMiddleware(), bookmarkRoutes]),
    prefix("/user", userRoutes),
  ]),
]);
