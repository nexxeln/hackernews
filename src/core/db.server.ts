// import type { Post } from "@prisma/client/edge";
// import { Kysely } from "kysely";
// import { PlanetScaleDialect } from "kysely-planetscale";
// import { env } from "./env.server";

// interface Database {
//   Post: Post;
// }

// export const db = new Kysely<Database>({
//   dialect: new PlanetScaleDialect({
//     host: "aws.connect.psdb.cloud",
//     username: env.DATABASE_USERNAME,
//     password: env.DATABASE_PASSWORD,
//   }),
// });

import { PrismaClient } from "@prisma/client";
import { env } from "./env.server";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
