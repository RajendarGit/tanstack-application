import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <section className="flex flex-col items-start gap-6">
      <p>About Page</p>
      <h1 className="text-xl lg:text-5xl">
        A small starter with room to grow.
      </h1>
      <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
        TanStack Start gives you type-safe routing, server functions, and modern
        SSR defaults. Use this as a clean foundation, then layer in your own
        routes, styling, and add-ons.
      </p>
    </section>
  );
}
