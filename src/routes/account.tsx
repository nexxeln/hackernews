import { Match, Switch } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authenticator } from "~/server/auth";
import { authClient } from "~/utils/auth";

export const routeData = () => {
  return {
    user: createServerData$(async (_, { request }) => {
      const user = await authenticator.isAuthenticated(request);
      return user;
    }),
  };
};

export default function Account() {
  const { user } = useRouteData<typeof routeData>();

  return (
    <>
      <Switch
        fallback={
          <button
            onClick={() =>
              authClient.login("github", {
                successRedirect: "/account",
                failureRedirect: "/account",
              })
            }
          >
            Login with GitHub
          </button>
        }
      >
        <Match when={user()}>
          <div class="flex flex-col items-start">
            <span>Hi {user()?.displayName}!</span>
            <button
              onClick={() =>
                authClient.logout({
                  redirectTo: "/account",
                })
              }
            >
              Log Out
            </button>
          </div>
        </Match>
      </Switch>
    </>
  );
}
