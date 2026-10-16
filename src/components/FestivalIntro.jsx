import React, { useEffect, useRef, useState } from "react";
import FireworksOverlay from "./FireworksOverlay";

/**
 * Entry curtain for the festival page.
 *
 * The home page teaser and this page open with the same artwork, so without
 * something in between the navigation is invisible - you tap the banner and
 * land on what looks like the same banner. This covers that moment.
 *
 * It also hides the banner download: the overlay stays up until the image has
 * actually decoded, so the artwork is never caught mid-load underneath.
 */

const MIN_VISIBLE_MS = 1700;
const EXIT_MS = 520;

export default function FestivalIntro({ bannerSrc, onDone }) {
  const [leaving, setLeaving] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const startedAt = Date.now();
    let cancelled = false;

    const push = (id) => timers.current.push(id);

    const finish = () => {
      if (cancelled) return;
      setLeaving(true);
      push(setTimeout(() => !cancelled && onDone?.(), EXIT_MS));
    };

    // Leave once the artwork is ready, but never so fast that the curtain
    // just blinks - a cached banner would otherwise be gone instantly.
    const ready = () => {
      if (cancelled) return;
      const waited = Date.now() - startedAt;
      push(setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - waited)));
    };

    const img = new Image();
    img.onload = ready;
    img.onerror = ready; // a broken banner must not strand people here
    img.src = bannerSrc;
    if (img.complete) ready();

    // Hard ceiling, in case the image never resolves either way.
    push(setTimeout(finish, 6000));

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = prevOverflow;
    };
  }, [bannerSrc, onDone]);

  return (
    <div
      className={"bpf-intro" + (leaving ? " is-leaving" : "")}
      role="status"
      aria-live="polite"
      aria-label="Loading The Billionaires Property Festival"
    >
      <FireworksOverlay />

      <div className="bpf-intro__inner">
        {/* The logo is a JPEG on solid white, so it gets a deliberate cream
            plate rather than a white rectangle floating on the night sky. */}
        <div className="bpf-intro__plate">
          <img
            src="/BPF-logo.jpeg"
            alt="The Billionaires Property Festival"
            className="bpf-intro__logo"
          />
        </div>

        <div className="bpf-intro__bar">
          <span />
        </div>

        <p className="bpf-intro__text">Unwrapping your festive offers...</p>
      </div>
    </div>
  );
}
