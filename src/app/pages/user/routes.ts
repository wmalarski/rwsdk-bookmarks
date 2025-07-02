import { route } from "rwsdk/router";

import { Login } from "./login";

export const userRoutes = [route("/login", [Login])];
