import { z } from "zod";
import { protectedProcedure, t } from "../utils";

export const postsRouter = t.router({
  upvote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.prisma.post.update({
        where: { id },
        data: {
          upvotes: { increment: 1 },
          upvotedBy: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),

  downvote: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.prisma.post.update({
        where: { id },
        data: { upvotes: { decrement: 1 } },
      });
    }),

  getTrending: t.procedure.query(async ({ ctx }) => {
    const latestGreatestPosts = await ctx.prisma.post.findMany({
      where: {
        createdAt: {
          // check if the post was created in the last 24 hours
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
      include: {
        User: { select: { displayName: true } },
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
        include: {
          User: { select: { displayName: true } },
        },
        orderBy: {
          upvotes: "desc",
        },
      });

      if (latestGreatestPosts.length === 0) {
        return await ctx.prisma.post.findMany({
          include: {
            User: { select: { displayName: true } },
          },
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
