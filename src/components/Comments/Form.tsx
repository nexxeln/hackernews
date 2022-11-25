import { useNavigate } from "solid-start";
import { createSignal, Show, type Component } from "solid-js";

import { trpc } from "~/utils/trpc";

export const CommentForm: Component<{ id: string; parentId?: string }> = (
  props
) => {
  const navigate = useNavigate();
  const [text, setText] = createSignal("");

  const utils = trpc.useContext();
  const createPost = trpc.comments.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.comments.getAll.invalidate({ id: props.id });
    },
    onError: (error) => {
      error.data?.code === "UNAUTHORIZED" && navigate("/account");
    },
  });

  return (
    <div>
      <form
        class="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();

          createPost.mutate({
            id: props.id,
            text: text(),
            parentId: props.parentId,
          });
        }}
      >
        <input
          required
          placeholder="add comment"
          name="text"
          id="text"
          value={text()}
          class="border-(b zinc-700) placeholder:text-neutral-3 bg-inherit pt-8 focus:(outline-none border-zinc-600)"
          onInput={(event) => setText(event.currentTarget.value)}
        />

        <button
          type="submit"
          disabled={createPost.isLoading}
          class="disabled:text-neutral-5 flex text-neutral-3"
        >
          <Show fallback="comment" when={props.parentId}>
            reply
          </Show>
        </button>
      </form>
    </div>
  );
};
