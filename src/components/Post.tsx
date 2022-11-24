import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import type { Component } from "solid-js";
import { A, useNavigate } from "solid-start";
import { trpc } from "~/utils/trpc";

export const PostCard: Component<{
  id: string;
  title: string;
  link: string;
  // fix this
  username: string | undefined;
  upvotes: number;
  createdAt: string;
}> = (props) => {
  const navigate = useNavigate();

  const utils = trpc.useContext();
  const upvote = trpc.posts.upvote.useMutation({
    onMutate: async () => {
      utils.posts.getTrending.cancel();
      const optimisticUpdate = utils.posts.getTrending.getData();

      if (optimisticUpdate) {
        utils.posts.getTrending.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.posts.getTrending.invalidate();
    },
    onError: () => {
      navigate("/account");
    },
  });

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
              class={clsx("w-5 h-5 cursor-pointer")}
              onClick={() => upvote.mutate({ id: props.id })}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
            <span>{props.upvotes}</span>
          </div>
        </div>

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
      </div>
    </article>
  );
};
