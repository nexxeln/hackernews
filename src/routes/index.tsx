import { RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { For } from "solid-js";

import { prisma } from "~/core/db.server";
import { Post } from "~/components/Post";

export const routeData = ({}: RouteDataArgs) => {
  return {
    posts: createServerData$(async () => {
      const latestGreatestPosts = await prisma.post.findMany({
        where: {
          createdAt: {
            // check if the post was created in the last 24 hours
            gte: new Date(Date.now() - 1 * 60 * 60 * 1000),
          },
        },
        orderBy: {
          upvotes: "desc",
        },
      });

      if (latestGreatestPosts.length === 0) {
        const olderGreatestPosts = await prisma.post.findMany({
          where: {
            createdAt: {
              // check if the post was created in the last 7 days
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          },
          orderBy: {
            upvotes: "desc",
          },
        });

        if (latestGreatestPosts.length === 0) {
          return await prisma.post.findMany({
            orderBy: {
              upvotes: "desc",
            },
          });
        }

        return olderGreatestPosts;
      }

      return latestGreatestPosts;
    }),
  };
};

export default function Home() {
  const { posts } = useRouteData<typeof routeData>();

  return (
    <div class="flex flex-col gap-8">
      <For each={posts()}>
        {({ id, title, link, upvotes, createdAt }) => (
          <Post
            id={id}
            title={title}
            link={link}
            upvotes={upvotes}
            createdAt={createdAt}
          />
        )}
      </For>
    </div>
  );
}
