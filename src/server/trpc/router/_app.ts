import type { inferRouterOutputs } from "@trpc/server";

import { t } from "../utils";
import { commentsRouter } from "./comments";
import { postsRouter } from "./posts";

export const appRouter = t.router({
  posts: postsRouter,
  comments: commentsRouter,
});

export type IAppRouter = typeof appRouter;

export type Comment =
  inferRouterOutputs<IAppRouter>["comments"]["getAll"][number];

export type CommentWithChildren = Comment & {
  children: CommentWithChildren[];
};
