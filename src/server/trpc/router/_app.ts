import { t } from "../utils";
import { postsRouter } from "./posts";

export const appRouter = t.router({
  posts: postsRouter,
});

export type IAppRouter = typeof appRouter;
