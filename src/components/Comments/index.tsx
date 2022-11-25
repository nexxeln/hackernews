/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Show } from "solid-js";
import { useParams } from "solid-start";
import { formatComments } from "~/utils/format-comments";
import { trpc } from "~/utils/trpc";
import { ListComments } from "./List";

export const CommentSection = () => {
  const { id } = useParams();
  const comments = trpc.comments.getAll.useQuery(() => ({ id }));

  return (
    <div>
      <Show when={comments.data}>
        {/* @ts-ignore */}
        <ListComments comments={formatComments(comments.data || [])} />
      </Show>
    </div>
  );
};
