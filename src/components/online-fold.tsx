"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

export function OnlineFold({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    function openIfAsked() {
      const id = decodeURIComponent(window.location.hash.replace("#", ""));
      if (id === "online") setOpen(true);
    }

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href="#online"]');
      if (link) setOpen(true);
    }

    openIfAsked();
    window.addEventListener("hashchange", openIfAsked);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", openIfAsked);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section
      aria-labelledby="online"
      className={`service-region online-chapter chapter${open ? " is-open" : ""}`}
    >
      <div className="region-inner">
        <div className="online-switch">
          <button
            id="online"
            type="button"
            className="online-open scroll-mt-28"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((current) => !current)}
          >
            Prefer online? Select here
          </button>
        </div>
        <div id={panelId} className="online-panel" hidden={!open}>
          {children}
        </div>
      </div>
    </section>
  );
}
