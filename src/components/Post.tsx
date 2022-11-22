import { A } from "solid-start";
import { Component, createSignal } from "solid-js";
import { formatDistanceToNow, formatRFC7231 } from "date-fns";
import clsx from "clsx";
import server$ from "solid-start/server";

import { prisma } from "~/core/db.server";

const upvote = server$(async (id: string) => {
  await prisma.post.update({
    where: { id },
    data: { upvotes: { increment: 1 } },
  });
});

const downvote = server$(async (id: string) => {
  await prisma.post.update({
    where: { id },
    data: { upvotes: { decrement: 1 } },
  });
});

export const PostCard: Component<{
  id: string;
  title: string;
  link: string;
  upvotes: number;
  createdAt: Date;
}> = ({ id, title, link, upvotes, createdAt }) => {
  const [isUpvoted, setIsUpvoted] = createSignal(false);

  return (
    <article class="flex flex-col gap-2">
      <div class="flex gap-4 items-center">
        <div>
          <div class="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class={clsx(
                "w-5 h-5 cursor-pointer",
                isUpvoted() ? "text-neutral-1" : "text-neutral-5"
              )}
              onClick={async () => {
                setIsUpvoted(!isUpvoted());

                // reversed because we're toggling the state before the db call
                if (!isUpvoted()) {
                  await downvote(id);
                } else {
                  await upvote(id);
                }
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
            <span>{upvotes}</span>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <a
            href={link}
            target="_blank"
            class="text-xl font-medium hover:underline"
          >
            {title}
          </a>

          <div class="text-neutral-4 text-sm flex gap-2">
            <span>{formatDistanceToNow(createdAt)} ago</span>
            <span>•</span>
            <A href={`/p/${id}`} class="hover:underline">
              View Comments
            </A>
          </div>
        </div>
      </div>
    </article>
  );
};

export const Post: Component<{
  id: string;
  title: string;
  description?: string;
  link: string;
  upvotes: number;
  createdAt: Date;
}> = ({ id, title, link, upvotes, createdAt }) => {
  return (
    <article class="flex flex-col gap-2">
      <div class="flex gap-4 items-center">
        <div class="flex flex-col gap-2">
          <a
            href={link}
            target="_blank"
            class="text-xl font-medium hover:underline"
          >
            {title}
          </a>

          <span>{formatRFC7231(createdAt)} ago</span>
        </div>
      </div>
    </article>
  );
};
