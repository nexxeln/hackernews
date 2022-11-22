import { createCookieSessionStorage } from "solid-start";
import { serverEnv } from "~/env/server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    secrets: [serverEnv.SESSION_SECRET],
    secure: serverEnv.NODE_ENV === "production",
  },
});
