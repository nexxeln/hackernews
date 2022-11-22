import solid from "solid-start/vite";
import dotenv from "dotenv";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
  
export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [solid({ ssr: false }), UnoCSS()],
  };
});
  