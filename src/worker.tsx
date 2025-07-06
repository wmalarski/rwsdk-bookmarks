import { prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/home";
import { userRoutes } from "@/app/pages/user/routes";

import type { User } from "./db";
import { auth } from "./lib/auth";
import {
  protectedUserMiddleware,
  userMiddleware,
} from "./modules/auth/middleware";

export type AppContext = {
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
  userMiddleware(),
  route("/api/auth/*", async ({ request }) => auth.handler(request)),
  render(Document, [
    route("/", () => new Response("Hello, World!")),
    route("/protected", [protectedUserMiddleware(), Home]),
    prefix("/user", userRoutes),
  ]),
]);
