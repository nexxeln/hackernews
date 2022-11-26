import { mount, StartClient } from "solid-start/entry-client";

import { client, queryClient, trpc } from "./utils/trpc";

mount(
  () => (
    <trpc.Provider client={client} queryClient={queryClient}>
      <div
        style={{
          "padding-left": "calc(100vw - 100%)",
        }}
      >
        <StartClient />
      </div>
    </trpc.Provider>
  ),
  document
);
