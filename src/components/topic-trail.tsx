"use client";

import { useEffect, useId, useRef, useState } from "react";

export type TopicJump = {
  kind: "jump";
  id: string;
  label: string;
  href: string;
};

export type TopicNote = {
  kind: "note";
  id: string;
  label: string;
  body: string;
};

export type TopicPiece = string | TopicJump | TopicNote;

export function TopicTrail({ pieces }: { pieces: TopicPiece[] }) {
  const notes = pieces.filter((piece): piece is TopicNote => typeof piece !== "string" && piece.kind === "note");
  const [openId, setOpenId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!openId) return;
    const panel = panelRef.current;
    const title = panel?.querySelector<HTMLElement>(".topic-panel-title");
    title?.focus({ preventScroll: true });
    panel?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [openId]);

  function close(id: string) {
    setOpenId(null);
    document.getElementById(id)?.focus();
  }

  return (
    <div className="topic-trail">
      <p className="topic-sentence">
        {pieces.map((piece, index) => {
          if (typeof piece === "string") return <span key={index}>{piece}</span>;
          if (piece.kind === "jump") {
            return (
              <a key={piece.id} id={piece.id} href={piece.href}>
                {piece.label}
              </a>
            );
          }
          const open = openId === piece.id;
          return (
            <a
              key={piece.id}
              id={piece.id}
              href={`#${piece.id}-note`}
              aria-expanded={open}
              onClick={(event) => {
                event.preventDefault();
                setOpenId(open ? null : piece.id);
              }}
            >
              {piece.label}
            </a>
          );
        })}
      </p>
      {notes.map((note) => {
        const open = openId === note.id;
        return (
          <div
            key={note.id}
            id={`${note.id}-note`}
            ref={open ? panelRef : undefined}
            className="topic-panel"
            hidden={!open}
            role="region"
            aria-labelledby={open ? titleId : undefined}
          >
            <h3 id={open ? titleId : undefined} className="topic-panel-title" tabIndex={-1}>
              {note.label}
            </h3>
            <p>{note.body}</p>
            <p className="topic-back">
              <button type="button" onClick={() => close(note.id)}>
                Back to this passage
              </button>
            </p>
          </div>
        );
      })}
    </div>
  );
}
