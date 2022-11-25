import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { Match, Switch, type Component } from "solid-js";
import { type User } from "@prisma/client";

import { authenticator } from "~/server/auth";

export const AuthGuard = (Component: ProtectedRouter) => {
  const routeData = () => {
    return createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request);
      if (!user) {
        throw redirect("/account");
      }
      return user;
    });
  };
  return {
    routeData,
    Page: () => {
      const current = useRouteData<typeof routeData>();
      return (
        <Switch fallback={<h1>Loading</h1>}>
          <Match when={current() && !(current() instanceof Response)}>
            <Component {...(current() as User)} />
          </Match>
        </Switch>
      );
    },
  };
};

export type ProtectedRouter = Component<User>;
