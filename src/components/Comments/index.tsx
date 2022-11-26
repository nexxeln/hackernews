/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type Component, Switch, Match } from "solid-js";

import { formatComments } from "~/utils/format-comments";
import { trpc } from "~/utils/trpc";
import { ListComments } from "./List";

export const CommentSection: Component<{ id: string }> = (props) => {
  const comments = trpc.comments.getAll.useQuery(() => ({ id: props.id }));

  return (
    <div>
      <Switch fallback={<p>Loading comments...</p>}>
        <Match when={comments.data} keyed>
          {(comments) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <ListComments comments={formatComments(comments as any)} />
          )}
        </Match>
      </Switch>
    </div>
  );
};
