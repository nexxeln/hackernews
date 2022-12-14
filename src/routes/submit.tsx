import { createServerAction$, redirect } from "solid-start/server";
import { Show } from "solid-js";
import { z } from "zod";

import { AuthGuard } from "~/components/AuthGuard";
import { authenticator } from "~/server/auth";
import { prisma } from "~/server/db/client";

const inputSchema = z.object({
  title: z.string().min(1).max(255),
  link: z.string().url(),
  description: z.string().max(1000).optional(),
});

export const { routeData, Page } = AuthGuard(() => {
  const [submit, { Form }] = createServerAction$(
    async (form: FormData, { request }) => {
      const title = form.get("title");
      const link = form.get("url");
      const description = form.get("description");

      const input = inputSchema.safeParse({ title, link, description });

      if (input.success === false) {
        console.log(input.error.format());
        throw new Error(input.error.format()._errors[0]);
      }

      const user = await authenticator.isAuthenticated(request);

      if (!user) {
        throw redirect("/account");
      }

      await prisma.post.create({
        data: {
          title: input.data.title,
          link: input.data.link,
          description: input.data.description,
          userId: user.id,
        },
      });

      throw redirect("/");
    }
  );

  return (
    <div class="flex flex-col items-center w-full">
      <Form class="flex flex-col gap-2 w-2/3">
        <Show when={submit.error}>
          <span class="text-red-400">{submit.error.message}</span>
        </Show>
        <div class="flex flex-col gap-1">
          <label>Title</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            class="rounded-1 px-4 py-2 bg-neutral-8 border-(1 zinc-700) focus:(outline-none ring ring-zinc-600)"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label>URL</label>
          <input
            required
            type="text"
            name="url"
            id="url"
            class="rounded-1 px-4 py-2 bg-neutral-8 border-(1 zinc-700) focus:(outline-none ring ring-zinc-600)"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label>Description (optional)</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            class="rounded-1 px-4 py-2 bg-neutral-8 border-(1 zinc-700) focus:(outline-none ring ring-zinc-600)"
          />
        </div>

        <button
          type="submit"
          disabled={submit.pending}
          class="w-fit text-left rounded-1 px-4 py-2 bg-neutral-8 hover:bg-neutral-7 transition border-(1 zinc-700) focus:(outline-none ring ring-zinc-600)"
        >
          <Show when={submit.pending} fallback={"Submit"}>
            Submitting
          </Show>
        </button>
      </Form>
    </div>
  );
});

export default Page;
