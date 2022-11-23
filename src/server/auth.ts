import { type User } from "@prisma/client";
import { Authenticator, GitHubStrategy } from "solidjs-auth";
import { serverEnv } from "~/env/server";
import { sessionStorage } from "~/utils/auth";
import { prisma } from "./db/client";

export const authenticator = new Authenticator<User>(sessionStorage).use(
  new GitHubStrategy(
    {
      clientID: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
      callbackURL: serverEnv.SITE_URL + "/api/auth/github/callback",
      scope: ["read:user"],
    },
    async ({ profile }) => {
      let user = await prisma.user.findUnique({
        where: {
          id: profile.id,
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            id: profile.id,
            displayName: profile.displayName,
          },
        });
      }
      return user;
    }
  )
);
