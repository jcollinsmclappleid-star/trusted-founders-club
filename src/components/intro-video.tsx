"use client";

import Image from "next/image";
import { useState } from "react";

const embedSrc =
  "https://player.vimeo.com/video/586708473?h=32b387829e&dnt=1&title=0&byline=0&portrait=0";

export function IntroVideo() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full bg-forest"
        src={`${embedSrc}&autoplay=1`}
        title="Dermot Cox talks about his approach to therapy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className="group relative block w-full" onClick={() => setPlaying(true)}>
      <Image
        src="/media/video-poster.png"
        alt=""
        width={875}
        height={490}
        className="aspect-video w-full object-cover object-[center_30%]"
      />
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/70 via-forest/10 to-transparent p-5 text-left text-ivory sm:p-7">
        <span>
          <span className="block font-nav text-xs tracking-[0.16em]">Play</span>
          <span className="mt-1 block font-display text-2xl leading-tight sm:text-3xl">
            Dermot talks about his approach
          </span>
          <span className="mt-1 block text-base text-ivory/90">1 minute 42 seconds</span>
        </span>
      </span>
    </button>
  );
}
