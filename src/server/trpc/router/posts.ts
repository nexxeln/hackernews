import { t } from "../utils";

export const postsRouter = t.router({
  getTrending: t.procedure.query(async ({ ctx }) => {
    const latestGreatestPosts = await ctx.prisma.post.findMany({
      where: {
        createdAt: {
          // check if the post was created in the last 24 hours
          gte: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        upvotes: "desc",
      },
    });

    if (latestGreatestPosts.length === 0) {
      const olderGreatestPosts = await ctx.prisma.post.findMany({
        where: {
          createdAt: {
            // check if the post was created in the last 7 days
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: {
          upvotes: "desc",
        },
      });

      if (latestGreatestPosts.length === 0) {
        return await ctx.prisma.post.findMany({
          orderBy: {
            upvotes: "desc",
          },
        });
      }

      return olderGreatestPosts;
    }

    return latestGreatestPosts;
  }),
});
