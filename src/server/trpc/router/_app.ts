import { t } from "../utils";
import { postsRouter } from "./posts";

export const appRouter = t.mergeRouters(postsRouter);

export type IAppRouter = typeof appRouter;
