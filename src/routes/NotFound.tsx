import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/NotFound")({
  component: NotFoundComponent,
});

export function NotFoundComponent() {
  return <div>Hello "/NotFound"!</div>;
}
