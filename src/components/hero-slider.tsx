"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const slides = [
  {
    src: "/media/woodland.jpg",
    alt: "Two people sitting together on a fallen tree in autumn woodland",
    className: "object-cover object-[center_68%]",
    label: "Woodland",
  },
  {
    src: "/media/garden-room.jpg",
    alt: "The timber garden consulting room, with a green roof, among trees and fallen leaves",
    className: "object-cover object-center",
    label: "Garden room",
  },
] as const;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const go = useCallback((direction: number) => {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }, []);

  return (
    <div
      className="hero-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="The woodland and the garden room"
    >
      <div
        className="hero-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onPointerDown={(event) => {
          if (event.pointerType !== "touch") return;
          startX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (startX.current == null) return;
          const delta = event.clientX - startX.current;
          startX.current = null;
          if (delta > 48) go(-1);
          else if (delta < -48) go(1);
        }}
      >
        {slides.map((slide, slideIndex) => (
          <div key={slide.src} className="hero-slide" aria-hidden={slideIndex !== index}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className={slide.className}
            />
          </div>
        ))}
      </div>
      <div className="hero-controls">
        <button type="button" onClick={() => go(-1)} aria-label="Previous photograph">
          <span aria-hidden="true">‹</span>
        </button>
        <div className="hero-dots" role="tablist" aria-label="Choose a photograph">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              className="hero-dot"
              aria-selected={slideIndex === index}
              aria-label={slide.label}
              onClick={() => setIndex(slideIndex)}
            >
              <span />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next photograph">
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  );
}
