import { route } from "rwsdk/router";

import { Login } from "./login";
import { SignUp } from "./signup";

export const userRoutes = [
  route("/login", [Login]),
  route("/signup", [SignUp]),
];
