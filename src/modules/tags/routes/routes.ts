import { route } from "rwsdk/router";

import { TagsListRoute } from "./tags-list-route";

export const tagsRoutes = [route("/", TagsListRoute)];
