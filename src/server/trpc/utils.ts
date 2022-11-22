import { initTRPC } from "@trpc/server";
import type { IContext } from "./context";

export const t = initTRPC.context<IContext>().create();
