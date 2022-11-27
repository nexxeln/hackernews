import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, t } from "../utils";

export const commentsRouter = t.router({
  getAll: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      try {
        const comments = await ctx.prisma.comment.findMany({
          where: { postId: id },
          include: { User: true },
        });
        return comments;
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, text, parentId } = input;
      const { user } = ctx;

      try {
        const comment = await ctx.prisma.comment.create({
          data: {
            text,
            Post: { connect: { id } },
            User: { connect: { id: user.id } },
            ...(parentId && {
              parent: { connect: { id: parentId } },
            }),
          },
        });

        return comment;
      } catch (error) {
        console.log(error);

        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),
});
