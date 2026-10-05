"use client";

import { useEffect, useState } from "react";

const paths = [
  { id: "individual-therapy", label: "Individual therapy", hint: "For one person" },
  { id: "couples-therapy", label: "Couples therapy", hint: "For two" },
  { id: "in-person", label: "The garden room", hint: "In Little Hampden" },
] as const;

export function ServicePaths() {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const nodes = paths
      .map((path) => document.getElementById(path.id))
      .filter((node): node is HTMLElement => node !== null);

    function mark() {
      const line = window.scrollY + Math.min(window.innerHeight * 0.32, 260);
      let next = "";
      for (const node of nodes) {
        const top = node.getBoundingClientRect().top + window.scrollY;
        if (top <= line) next = node.id;
      }
      setCurrent(next);
    }

    mark();
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("hashchange", mark);
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("hashchange", mark);
    };
  }, []);

  return (
    <nav className="service-paths" aria-label="Choose a service">
      {paths.map((path) => (
        <a
          key={path.id}
          href={`#${path.id}`}
          className="reveal"
          aria-current={current === path.id ? "true" : undefined}
        >
          <span>{path.hint}</span>
          {path.label}
        </a>
      ))}
    </nav>
  );
}
