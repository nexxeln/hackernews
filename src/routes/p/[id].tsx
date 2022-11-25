/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Match, Switch } from "solid-js";
import { useParams } from "solid-start";
import { CommentSection } from "~/components/Comments";
import { CommentForm } from "~/components/Comments/Form";
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
        <div class="w-full">
          <Post
            title={post.data!.title}
            link={post.data!.link}
            description={post.data!.description}
            username={post.data!.User?.displayName}
            comments={post.data!.Comment.length}
            createdAt={post.data!.createdAt.toString()}
          />
          <CommentForm id={post.data!.id} />
          <div class="pb-10" />

          <CommentSection />
        </div>
      </Match>
    </Switch>
  );
}
