import { initTRPC, TRPCError } from "@trpc/server";

import type { IContext } from "./context";
import { authenticator } from "../auth";

export const t = initTRPC.context<IContext>().create();

export const protectedProcedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    const user = await authenticator.isAuthenticated(ctx.req);

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are unautorized to access this endpoint",
      });
    }

    return next({ ctx: { ...ctx, user } });
  })
);
