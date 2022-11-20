import { createServerAction$ } from "solid-start/server";

export default function Submit() {
  const [submit, { Form }] = createServerAction$(async (form: FormData) => {});

  return (
    <div class="flex flex-col items-center w-full">
      <p class="text-center pb-4">
        Leave URL blank to submit a question for discussion. If there is a URL,
        description is optional.
      </p>

      <Form class="flex flex-col gap-2 w-2/3">
        <div class="flex flex-col gap-1">
          <label>Title</label>
          <input
            type="text"
            name="title"
            id="title"
            class="rounded-1 px-4 py-2 bg-neutral-8 border-(1 zinc-700) focus:(outline-none ring ring-zinc-600)"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label>URL</label>
          <input
            type="text"
            name="url"
            id="url"
            class="rounded-1 px-4 py-2 bg-neutral-8 border-(1 zinc-700) focus:(outline-none ring ring-zinc-600)"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            class="rounded-1 px-4 py-2 bg-neutral-8 border-(1 zinc-700) focus:(outline-none ring ring-zinc-600)"
          />
        </div>
      </Form>
    </div>
  );
}
