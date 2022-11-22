import { RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Post } from "~/components/Post";

export const routeData = ({ params }: RouteDataArgs) => {
  return {
    post: createServerData$(
      async (id) => {
        const post = await prisma.post.findUnique({ where: { id } });
        console.log(post);
        return post;
      },
      { key: () => params.id }
    ),
  };
};

export default function PostPage() {
  const { post } = useRouteData<typeof routeData>();

  return (
    <div>
      <Post
        id={post().id}
        title={post().title}
        link={post().link}
        upvotes={post().upvotes}
        createdAt={post().createdAt}
      />
    </div>
  );
}
