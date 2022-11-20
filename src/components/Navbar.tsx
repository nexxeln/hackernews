import { A, useLocation } from "solid-start";
import { Component } from "solid-js";
import { clsx } from "clsx";

const NavItem: Component<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <A href={href} class="font-medium hover:text-neutral-2 transition">
      {text}
    </A>
  );
};

export const Navbar = () => {
  return (
    <nav class="flex flex-col items-center">
      <h1 class="text-(center 4xl) font-black pt-6">Hacker News</h1>

      <div class="flex gap-x-4 pt-3 text-(neutral-3 lg) ">
        <NavItem href="/" text="Home" />
        <NavItem href="/submit" text="Submit" />
      </div>
    </nav>
  );
};
