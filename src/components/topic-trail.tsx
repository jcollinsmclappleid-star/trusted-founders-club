"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type Topic = {
  id: string;
  label: string;
  detail: string;
  catchAll?: boolean;
};

function TopicBranch({
  topic,
  open,
  dialogId,
  onOpen,
}: {
  topic: Topic;
  open: boolean;
  dialogId: string;
  onOpen: (button: HTMLButtonElement) => void;
}) {
  return (
    <button
      id={topic.id}
      type="button"
      className="topic-branch scroll-mt-28"
      aria-expanded={open}
      aria-controls={open ? dialogId : undefined}
      onClick={(event) => onOpen(event.currentTarget)}
    >
      {topic.label}
    </button>
  );
}

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
  const dialogId = useId();
  const named = topics.filter((topic) => !topic.catchAll);
  const extras = topics.filter((topic) => topic.catchAll);
  const midpoint = Math.ceil(named.length / 2);
  const columns = [named.slice(0, midpoint), named.slice(midpoint)];

  useEffect(() => setMounted(true), []);

  const topicsRef = useRef(topics);

  useEffect(() => {
    topicsRef.current = topics;
  }, [topics]);

  useEffect(() => {
    function openFromHash() {
      const id = decodeURIComponent(window.location.hash.replace("#", ""));
      const match = topicsRef.current.find((topic) => topic.id === id);
      if (match) {
        openerRef.current = document.getElementById(match.id) as HTMLButtonElement | null;
        setOpen(match);
      }
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

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
              id={dialogId}
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
                <TopicBranch
                  topic={topic}
                  open={open?.id === topic.id}
                  dialogId={dialogId}
                  onOpen={(button) => {
                    openerRef.current = button;
                    setOpen(topic);
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {extras.length > 0 ? (
        <div className="topic-else">
          <p className="topic-else-label">If none of these fit</p>
          {extras.map((topic) => (
            <TopicBranch
              key={topic.id}
              topic={topic}
              open={open?.id === topic.id}
              dialogId={dialogId}
              onOpen={(button) => {
                openerRef.current = button;
                setOpen(topic);
              }}
            />
          ))}
        </div>
      ) : null}
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
