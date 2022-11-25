import { createSolidAuthHandler } from "solidjs-auth";
import { type User } from "@prisma/client";

import { authenticator } from "~/server/auth";

const handler = createSolidAuthHandler<User>(authenticator);

export const POST = handler;
export const GET = handler;
