// __root.tsx
import Header from "#/components/Header";
import { Toaster } from "#/components/ui/sonner";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
}
