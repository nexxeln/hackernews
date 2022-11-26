// @refresh reload
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { Suspense } from "solid-js";
import "uno.css";
import "@unocss/reset/tailwind.css";

import { Navbar } from "~/components/Navbar";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Hacker News</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Navbar />
        <Suspense>
          <ErrorBoundary>
            <main class="flex flex-col items-start mx-4 pb-6 md:mx-auto md:w-1/2">
              <Routes>
                <FileRoutes />
              </Routes>
            </main>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
