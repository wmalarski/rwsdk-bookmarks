import { defineLinks } from "rwsdk/router";

export const link = defineLinks([
  "/",
  "/user/login",
  "/user/signup",
  "/app",
  "/app/tags",
  "/app/share",
  "/app/history",
  "/app/bookmark/:id",
]);
