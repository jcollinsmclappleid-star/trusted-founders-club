"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type Topic = {
  id: string;
  label: string;
  detail: string;
};

export function TopicTrail({
  topics,
  support,
}: {
  topics: Topic[];
  support: string;
}) {
  const [open, setOpen] = useState<Topic | null>(null);
  const [mounted, setMounted] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const midpoint = Math.ceil(topics.length / 2);
  const columns = [topics.slice(0, midpoint), topics.slice(midpoint)];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const header = document.getElementById("site-header");
    const content = document.getElementById("page-content");
    header?.setAttribute("inert", "");
    content?.setAttribute("inert", "");
    document.documentElement.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );

    dialog?.querySelector<HTMLElement>(".topic-dialog-title")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(null);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      header?.removeAttribute("inert");
      content?.removeAttribute("inert");
      document.documentElement.style.overflow = "";
      openerRef.current?.focus();
    };
  }, [open]);

  function close() {
    setOpen(null);
  }

  const dialog =
    open && mounted
      ? createPortal(
          <div className="topic-dialog">
            <div className="topic-scrim" onClick={close} />
            <div
              ref={dialogRef}
              className="topic-dialog-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <div className="topic-dialog-head">
                <p className="topic-kicker">How this can be held</p>
                <button type="button" className="topic-close" onClick={close}>
                  Close
                </button>
              </div>
              <div className="topic-dialog-body">
                <h2 id={titleId} tabIndex={-1} className="topic-dialog-title">
                  {open.label}
                </h2>
                <p>{open.detail}</p>
                <p>{support}</p>
              </div>
              <div className="topic-dialog-foot">
                <a className="submit-button topic-dialog-cta" href="#contact" onClick={close}>
                  Arrange a free conversation
                </a>
                <p>A free 30-minute conversation, by phone or video. It is not a session.</p>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="topic-tree">
      <p className="topic-invite">If any of these resonate, open it.</p>
      <div className="topic-canopy">
        {columns.map((column) => (
          <div key={column[0]?.id} className="topic-trunk">
            {column.map((topic) => (
              <div key={topic.id} className="topic-limb">
                <span className="topic-stem" aria-hidden="true" />
                <button
                  type="button"
                  className="topic-branch"
                  aria-expanded={open?.id === topic.id}
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setOpen(topic);
                  }}
                >
                  {topic.label}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sr-only">
        {topics.map((topic) => (
          <p key={topic.id}>
            {topic.label}. {topic.detail} {support}
          </p>
        ))}
      </div>
      {dialog}
    </div>
  );
}
