/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "solid-start";
import { Match, Switch } from "solid-js";

// import { CommentSection } from "~/components/Comments";
// import { CommentForm } from "~/components/Comments/Form";
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

      <Match when={post.data} keyed>
        {(post) => (
          <div class="w-full">
            <Post
              title={post.title}
              link={post.link}
              description={post.description}
              username={post.User?.displayName}
              comments={post.Comment.length}
              createdAt={post.createdAt.toString()}
            />
            {/* <CommentForm id={post.id} />
            <div class="pb-10" />
            <CommentSection /> */}
          </div>
        )}
      </Match>
    </Switch>
  );
}
