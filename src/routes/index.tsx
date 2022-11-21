import { A, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Component, For } from "solid-js";

import { prisma } from "~/core/db.server";
import { formatDistanceToNow } from "date-fns";

export const routeData = ({}: RouteDataArgs) => {
  return {
    posts: createServerData$(async () => {
      return await prisma.post.findMany({
        where: {
          createdAt: {
            // check if the post was created in the last 24 hours
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
        orderBy: {
          upvotes: "desc",
        },
      });
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

const Post: Component<{
  id: string;
  title: string;
  link: string;
  upvotes: number;
  createdAt: Date;
}> = ({ id, title, link, upvotes, createdAt }) => {
  return (
    <article class="flex flex-col gap-2">
      <div class="flex gap-4 items-center">
        <div class="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
          <span class="">{upvotes}</span>
        </div>
        <a
          href={link}
          target="_blank"
          class="text-xl font-medium hover:underline"
        >
          {title}
        </a>
      </div>

      <div class="text-neutral-4 text-sm flex gap-2">
        <span>{formatDistanceToNow(createdAt)} ago</span>
        <span>•</span>
        <A href={`/p/${id}`} class="hover:underline">
          View Comments
        </A>
      </div>
    </article>
  );
};
