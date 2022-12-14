import { z } from "zod";

export const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  SITE_URL: z.string(),
});

export const clientSchema = z.object({
  MODE: z.enum(["development", "production", "test"]).default("development"),
  VITE_SESSION_SECRET: z.string(),
});
