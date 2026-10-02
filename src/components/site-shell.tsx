"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  chapterLabels,
  desktopNav,
  menuItems,
  navIsCurrent,
  sectionIds,
  siteConfig,
  type MenuItem,
} from "@/lib/site";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("top");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef(false);
  const pendingFocusRef = useRef<string | null>(null);
  const menuTitleId = useId();
  const servicesPanelId = useId();

  useEffect(() => {
    const reduce = prefersReducedMotion();
    let frame = 0;

    function markActive() {
      const header = document.getElementById("site-header");
      const line =
        window.scrollY +
        Math.max((header?.offsetHeight ?? 96) + 48, Math.round(window.innerHeight * 0.34));
      let current: string = sectionIds[0];
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= line + 1) current = id;
      }
      setActive((previous) => (previous === current ? previous : current));
    }

    function measure() {
      const header = document.getElementById("site-header");
      if (header) {
        document.documentElement.style.setProperty("--header-offset", `${header.offsetHeight}px`);
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      document.documentElement.style.setProperty("--scroll", progress.toFixed(4));
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
        if (!reduce) {
          const y = window.scrollY;
          setCompact((current) => (current ? y > 24 : y > 96));
        }
        markActive();
      });
    }

    measure();
    markActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const nodes = [...document.querySelectorAll<HTMLElement>(".chapter")];
    for (const node of nodes) {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        node.classList.add("is-in");
      }
    }
    document.documentElement.classList.add("motion");
    const pending = nodes.filter((node) => !node.classList.contains("is-in"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion");
    };
  }, []);

  useEffect(() => {
    function focusFromHash() {
      const id = window.location.hash.replace("#", "");
      const element = id ? document.getElementById(id) : null;
      if (!element) return;
      if (/^H[1-3]$/.test(element.tagName)) {
        element.focus({ preventScroll: true });
      }
    }

    window.addEventListener("hashchange", focusFromHash);
    return () => window.removeEventListener("hashchange", focusFromHash);
  }, []);

  useEffect(() => {
    const header = document.getElementById("site-header");
    const content = document.getElementById("page-content");

    if (!open) {
      header?.removeAttribute("inert");
      content?.removeAttribute("inert");
      document.documentElement.style.overflow = "";
      if (returnFocusRef.current) {
        returnFocusRef.current = false;
        menuButtonRef.current?.focus();
      }
      if (pendingFocusRef.current) {
        const id = pendingFocusRef.current;
        pendingFocusRef.current = null;
        document.getElementById(id)?.focus({ preventScroll: true });
      }
      return;
    }

    document.documentElement.style.overflow = "hidden";
    header?.setAttribute("inert", "");
    content?.setAttribute("inert", "");
    closeButtonRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        returnFocusRef.current = true;
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = [
        ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter((element) => element.getClientRects().length > 0);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function closeMenu(returnFocus: boolean) {
    returnFocusRef.current = returnFocus;
    setOpen(false);
  }

  function openMenu() {
    if (navIsCurrent("services", active)) setServicesOpen(true);
    returnFocusRef.current = false;
    setOpen(true);
  }

  function follow(id: string) {
    pendingFocusRef.current = id;
    returnFocusRef.current = false;
    setOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    const nextUrl = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.pushState(null, "", nextUrl);
  }

  return (
    <>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <header
        id="site-header"
        data-compact={compact ? "true" : "false"}
        className="sticky top-0 z-40 border-b border-white/10 bg-forest text-ivory"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="shrink-0">
            <Image
              src="/media/logo-light.png"
              alt="Dermot Cox Counselling"
              width={1038}
              height={270}
              priority
              className="header-logo"
            />
          </a>
          <nav className="ml-auto hidden items-center gap-5 lg:flex" aria-label="Page">
            {desktopNav.map((item) => {
              const current = navIsCurrent(item.id, active);
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={current ? "true" : undefined}
                  className="nav-link"
                  data-current={current ? "true" : "false"}
                >
                  {item.label}
                </a>
              );
            })}
            <a href="#contact" className="enquire-link">
              Enquire
            </a>
          </nav>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button ml-auto lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => (open ? closeMenu(true) : openMenu())}
          >
            Menu
          </button>
        </div>
        <p className="chapter-slot" aria-hidden="true">
          <span key={chapterLabels[active] ?? "Little Hampden"} className="chapter-label">
            {chapterLabels[active] ?? "Little Hampden"}
          </span>
        </p>
        <div className="scroll-leaf" aria-hidden="true">
          <svg viewBox="0 0 64 80">
            <path
              fill="#c65c28"
              d="M34 4c10 8 24 22 22 40-2 16-12 26-22 30-10-4-20-14-22-30C10 26 24 12 34 4z"
            />
            <path
              d="M33 18c1 14 1 28 0 42"
              fill="none"
              stroke="#8a3d16"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M33 34c6-2 12-2 16 1M33 46c-5-1-11 0-15 3"
              fill="none"
              stroke="#8a3d16"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="menu-scrim" onClick={() => closeMenu(true)} aria-hidden="true" />
          <div
            id="site-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={menuTitleId}
            className="menu-panel"
          >
            <div className="flex items-center justify-between gap-4 px-5 pt-5">
              <Image
                src="/media/logo-green.png"
                alt=""
                width={1131}
                height={279}
                className="logo-mark"
              />
              <button
                ref={closeButtonRef}
                type="button"
                className="menu-close"
                onClick={() => closeMenu(true)}
              >
                <span className="sr-only">Close menu</span>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h2 id={menuTitleId} className="sr-only">
              Menu
            </h2>
            <nav className="mt-6 px-5" aria-label="Page">
              {menuItems.map((item) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  active={active}
                  servicesOpen={servicesOpen}
                  servicesPanelId={servicesPanelId}
                  onToggleServices={() => setServicesOpen((value) => !value)}
                  onFollow={follow}
                />
              ))}
            </nav>
          </div>
        </div>
      ) : null}

      <div id="page-content">{children}</div>
      <footer className="border-t border-line bg-ivory-deep">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.2fr_1fr]">
          <div>
            <Image
              src="/media/logo-green.png"
              alt=""
              width={1131}
              height={279}
              className="logo-mark"
            />
            <p className="mt-4 max-w-sm text-lg leading-relaxed">
              Psychotherapy and counselling in person in {siteConfig.place}.
            </p>
            <p className="mt-4">
              <a className="footer-link" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
              <span className="px-2 text-forest/50" aria-hidden="true">
                ·
              </span>
              <a className="footer-link" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
          </div>
          <nav aria-label="Page sections" className="grid grid-cols-2 gap-x-6 gap-y-2 self-end">
            {menuItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="footer-link py-1">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}

function MenuRow({
  item,
  active,
  servicesOpen,
  servicesPanelId,
  onToggleServices,
  onFollow,
}: {
  item: MenuItem;
  active: string;
  servicesOpen: boolean;
  servicesPanelId: string;
  onToggleServices: () => void;
  onFollow: (id: string) => void;
}) {
  const current = navIsCurrent(item.id, active);
  return (
    <div>
      <div className="flex min-h-11 items-stretch">
        <a
          href={`#${item.id}`}
          aria-current={active === item.id ? "true" : undefined}
          data-current={current ? "true" : "false"}
          className="menu-link flex-1"
          onClick={(event) => {
            event.preventDefault();
            onFollow(item.id);
          }}
        >
          {item.label}
        </a>
        {item.children ? (
          <button
            type="button"
            className="menu-disclosure"
            aria-expanded={servicesOpen}
            aria-controls={servicesPanelId}
            onClick={onToggleServices}
          >
            <span className="sr-only">
              {servicesOpen ? "Hide services" : "Show services"}
            </span>
            <span aria-hidden="true">{servicesOpen ? "–" : "+"}</span>
          </button>
        ) : null}
      </div>
      {item.children ? (
        <div id={servicesPanelId} hidden={!servicesOpen} className="pb-2">
          {item.children.map((child) => {
            const childCurrent = active === child.id;
            return (
              <a
                key={child.id}
                href={`#${child.id}`}
                aria-current={childCurrent ? "true" : undefined}
                data-current={childCurrent ? "true" : "false"}
                className="menu-link menu-child"
                onClick={(event) => {
                  event.preventDefault();
                  onFollow(child.id);
                }}
              >
                {child.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
