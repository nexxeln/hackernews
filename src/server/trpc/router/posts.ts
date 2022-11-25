import { z } from "zod";
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
  getPostById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const post = await ctx.prisma.post.findUnique({
        where: { id },
        include: { User: { select: { displayName: true } } },
      });

      return post;
    }),
});
