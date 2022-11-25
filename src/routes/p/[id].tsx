/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Match, Switch } from "solid-js";
import { useParams } from "solid-start";
import { Post } from "~/components/Post";
import { trpc } from "~/utils/trpc";

export default function PostPage() {
  const { id } = useParams();
  const post = trpc.posts.getPostById.useQuery(() => ({ id }));

  return (
    <Switch>
      <Match when={post.isLoading}>
        <p>Loading...</p>
      </Match>

      <Match when={post.isError}>
        <p class="text-red-4">Oh no! Something went wrong!</p>
      </Match>
      <Match when={post.isSuccess}>
        <Post
          title={post.data!.title!}
          link={post.data!.link!}
          username={post.data!.User!.displayName!}
          createdAt={post.data!.createdAt!.toString()}
        />
      </Match>
    </Switch>
  );
}
