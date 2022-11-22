# Create JD App

This project was created using [Create JD App](https://github.com/OrJDev/create-jd-app)

## Deploying To Vercel

### Installing

```bash
pnpm install solid-start-vercel@latest -D
```

### Adding to vite config

```ts
import solid from "solid-start/vite";
import dotenv from "dotenv";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
// @ts-expect-error no typing
import vercel from "solid-start-vercel";
  
export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [
          solid({ ssr: false, adapter: vercel({ edge: false }) }),
          UnoCSS(),
        ],
  };
});
  
```

### Enviroment Variables

- `ENABLE_VC_BUILD`=`1` .
- `DATABASE_URL`=`your database url` .

### PostBuild Script

I created a script that will copy Prisma schema to the vercel output folder, if you are using different service please modify the `postbuild` script in `package.json` and make sure you copy the scheme to the output folder.

### You Are Done

Create a github repo and push your code to it, then deploy it to vercel (:
