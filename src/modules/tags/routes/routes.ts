import { layout, route } from "rwsdk/router";

import { PageLayout } from "@/modules/common/layout";

import { TagsListRoute } from "./tags-list-route";

export const tagsRoutes = layout(PageLayout, [route("/", TagsListRoute)]);
