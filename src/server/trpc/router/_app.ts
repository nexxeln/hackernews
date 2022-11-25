import { t } from "../utils";
import { commentsRouter } from "./comments";
import { postsRouter } from "./posts";

export const appRouter = t.router({
  posts: postsRouter,
  comments: commentsRouter,
});

export type IAppRouter = typeof appRouter;
