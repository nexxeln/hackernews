import { For, Match, Switch, type ParentComponent } from "solid-js";
import { PostCard } from "~/components/Post";
import { trpc } from "~/utils/trpc";

const Home: ParentComponent = () => {
  const posts = trpc.posts.getLatest.useQuery();
  return (
    <>
      <Switch>
        <Match when={posts.isLoading}>
          <p>Loading...</p>
        </Match>
        <Match when={posts.isError}>
          <p class="text-red-4">Oh no! Something went wrong!</p>
        </Match>
        <Match when={posts.isSuccess}>
          <div class="flex flex-col gap-8">
            <For each={posts.data}>
              {({ id, title, link, createdAt, User }) => (
                <PostCard
                  id={id}
                  title={title}
                  link={link}
                  username={User?.displayName}
                  createdAt={createdAt.toString()}
                />
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
};

export default Home;
