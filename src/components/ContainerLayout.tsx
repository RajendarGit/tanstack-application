import React from "react";

export default function ContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container py-10">{children}</div>;
}
