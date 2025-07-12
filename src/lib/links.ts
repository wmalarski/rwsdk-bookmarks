import { defineLinks } from "rwsdk/router";

export const link = defineLinks([
  "/",
  "/user/login",
  "/user/signup",
  "/bookmarks",
  "/bookmarks/share",
  "/bookmarks/history",
  "/bookmarks/bookmark/:id",
  "/tags",
]);
