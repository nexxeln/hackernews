import { A } from "solid-start";
import { Component } from "solid-js";
import { formatDistanceToNow } from "date-fns";

export const Post: Component<{
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
