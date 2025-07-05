import { defineLinks } from "rwsdk/router";

export const link = defineLinks([
  "/",
  "/user/login",
  "/user/signup",
  "/app/bookmark",
  "/app/bookmark/:id",
  "/app/bookmark/tags",
  "/app/bookmark/share",
  "/app/bookmark/history",
]);
