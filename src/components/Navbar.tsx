import { A } from "solid-start";
import type { Component } from "solid-js";

const NavItem: Component<{ href: string; text: string }> = (props) => {
  return (
    <A href={props.href} class="font-medium hover:text-neutral-2 transition">
      {props.text}
    </A>
  );
};

export const Navbar = () => {
  return (
    <nav class="flex flex-col items-center pb-12">
      <h1 class="text-(center 4xl) font-black pt-6">Hacker News hi</h1>

      <div class="flex gap-x-4 pt-3 text-(neutral-4 lg) ">
        <NavItem href="/" text="Home" />
        <NavItem href="/submit" text="Submit" />
      </div>
    </nav>
  );
};
