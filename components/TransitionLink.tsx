"use client";

import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Links externos o anclas: comportamiento normal
    if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("tel")) return;
    e.preventDefault();
    if (window.location.pathname === href) return;
    window.dispatchEvent(new CustomEvent("transition:navigate", { detail: { href } }));
    onClick?.(e);
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
