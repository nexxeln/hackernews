import solid from "solid-start/vite";
// @ts-expect-error no typing
import vercel from "solid-start-vercel";
import UnoCSS from "unocss/vite";
import dotenv from "dotenv";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [solid({ ssr: false, adapter: vercel() }), UnoCSS()],
  };
});
