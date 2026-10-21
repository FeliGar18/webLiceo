import type { ElementType, ReactNode } from "react";

/** Contenedor con los márgenes exteriores únicos del sitio. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`mx-auto w-full max-w-[90rem] px-[var(--gutter)] ${className}`}>{children}</Tag>;
}
