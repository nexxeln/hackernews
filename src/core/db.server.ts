import type { Post } from "@prisma/client/edge";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "./env.server";

interface Database {
  Post: Post;
}

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: "aws.connect.psdb.cloud",
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
  }),
});
