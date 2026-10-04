"use client";

import { useEffect, useId, useRef } from "react";
import { serviceAreas } from "@/lib/areas";

export function AreaDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function onClose() {
      buttonRef.current?.focus();
    }

    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  function open() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    dialog.querySelector<HTMLElement>("h2")?.focus();
  }

  function onDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    const dialog = event.currentTarget;
    const rect = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) dialog.close();
  }

  return (
    <>
      <button ref={buttonRef} type="button" className="area-open" onClick={open}>
        See the areas and towns
      </button>
      <dialog
        ref={dialogRef}
        className="area-dialog"
        aria-labelledby={titleId}
        onClick={onDialogClick}
      >
        <div className="area-dialog-head">
          <p className="topic-kicker">Surrounding area</p>
          <button type="button" className="topic-close" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>
        <div className="area-dialog-body">
          <h2 id={titleId} tabIndex={-1} className="area-dialog-title">
            Shires, London and towns
          </h2>
          <p>
            People can come from across Buckinghamshire, from Greater London, and from the surrounding
            shires. The major towns in each shire are listed here, and so are the areas of Greater
            London. The consulting room is in Little Hampden.
          </p>
          {serviceAreas.map((area) => (
            <section key={area.shire} aria-labelledby={`${titleId}-${area.shire}`}>
              <h3 id={`${titleId}-${area.shire}`}>{area.shire}</h3>
              <ul className="area-towns">
                {area.towns.map((town) => (
                  <li key={town}>{town}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </dialog>
    </>
  );
}
