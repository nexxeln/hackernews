import { formatDistanceToNow } from "date-fns";
import { createSignal, For, Show, type Component } from "solid-js";
import { useParams } from "solid-start";
import type { Comment } from "~/server/trpc/router/_app";
import { trpc } from "~/utils/trpc";
import { CommentForm } from "./Form";

const CommentCard: Component<{ comment: Comment }> = (props) => {
  const { id } = useParams();
  const [replying, setReplying] = createSignal(false);

  return (
    <div class="flex flex-col pb-4">
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
    </div>
  );
};

export const ListComments = () => {
  const { id } = useParams();
  const comments = trpc.comments.getAll.useQuery(() => ({ id }));

  return (
    <div>
      <For each={comments.data}>
        {(comment) => <CommentCard comment={comment} />}
      </For>
    </div>
  );
};
