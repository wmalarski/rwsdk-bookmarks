import { layout, route } from "rwsdk/router";

import { FormsLayout } from "@/modules/common/layout";

import { Login } from "./login";
import { SignUp } from "./signup";

export const userRoutes = layout(FormsLayout, [
  route("/login", [Login]),
  route("/signup", [SignUp]),
]);
