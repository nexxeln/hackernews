import { formatDistanceToNow } from "date-fns";
import { createSignal, For, Show, type Component } from "solid-js";
import { useParams } from "solid-start";
import type { CommentWithChildren } from "~/server/trpc/router/_app";
import { CommentForm } from "./Form";

const CommentCard: Component<{ comment: CommentWithChildren }> = (props) => {
  const { id } = useParams();
  const [replying, setReplying] = createSignal(false);

  return (
    <div class="flex flex-col">
      <p>{props.comment.text}</p>
      <div class="text-neutral-4 text-xs md:text-sm flex gap-2">
        <span>by {props.comment.User.displayName}</span>
        <span>•</span>
        <span>
          {formatDistanceToNow(new Date(props.comment.createdAt))} ago
        </span>
        <span>•</span>
        <button
          onClick={() => setReplying((prev) => !prev)}
          class="hover:underline"
        >
          <Show when={!replying()} fallback="cancel">
            reply
          </Show>
        </button>
      </div>

      <Show when={replying()}>
        <CommentForm id={id} parentId={props.comment.id} />
      </Show>

      <Show when={props.comment.children.length > 0}>
        <div class="pl-4 py-4">
          <ListComments comments={props.comment.children} />
        </div>
      </Show>
    </div>
  );
};

export const ListComments: Component<{ comments: CommentWithChildren[] }> = (
  props
) => {
  return (
    <div>
      <For each={props.comments}>
        {(comment) => (
          <div class="pb-3">
            <CommentCard comment={comment} />
          </div>
        )}
      </For>
    </div>
  );
};
