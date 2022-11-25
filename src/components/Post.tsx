import { A } from "solid-start";
import type { Component } from "solid-js";
import { formatDistanceToNow, formatRFC7231 } from "date-fns";

export const PostCard: Component<{
  id: string;
  title: string;
  link: string;
  // fix this
  username: string | undefined;
  createdAt: string;
}> = (props) => {
  return (
    <article class="flex flex-col gap-2">
      <div class="flex flex-col gap-2">
        <a
          href={props.link}
          target="_blank"
          class="text-xl font-medium hover:underline"
        >
          {props.title}
        </a>

        <div class="text-neutral-4 text-xs md:text-sm flex gap-2">
          <span>by {props.username}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(props.createdAt))} ago</span>
          <span>•</span>
          <A href={`/p/${props.id}`} class="hover:underline">
            view comments
          </A>
        </div>
      </div>
    </article>
  );
};

export const Post: Component<{
  title: string;
  link: string;
  // fix this
  username: string | undefined;
  createdAt: string;
}> = (props) => {
  return (
    <article class="flex flex-col gap-2">
      <div class="flex flex-col gap-2">
        <a
          href={props.link}
          target="_blank"
          class="text-xl font-medium hover:underline"
        >
          {props.title}
        </a>

        <div class="text-neutral-4 text-xs md:text-sm flex gap-2">
          <span>by {props.username}</span>
          <span>•</span>
          <span>{formatRFC7231(new Date(props.createdAt))}</span>
          <span>•</span>
          <span>{10} comments</span>
        </div>
      </div>
    </article>
  );
};
