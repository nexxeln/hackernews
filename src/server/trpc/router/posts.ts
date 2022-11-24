import { t } from "../utils";

export const postsRouter = t.router({
  getLatest: t.procedure.query(async ({ ctx }) => {
    const latestPosts = await ctx.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        User: { select: { displayName: true } },
      },
    });

    return latestPosts;
  }),
});
