import React, { useEffect, useRef } from "react";

/**
 * One-shot party-popper burst.
 *
 * Paper streamers fired in cones from the corners and sides, the way real
 * poppers go off. Pieces are drawn as rectangles and tumble by scaling their
 * height with cos(tilt) - that edge-on flattening is what makes paper read as
 * paper rather than as dots.
 *
 * Fires once, then calls onDone so the canvas can be unmounted.
 */

const COLORS = [
  "#ffd24a",
  "#d6a636",
  "#e6324b",
  "#ff7a33",
  "#fff3c4",
  "#ffffff",
];

// Cones, in the order they go off. angle/spread are degrees, 0 = due right.
const POPPERS = [
  { x: 0.02, y: 1.02, angle: -62, spread: 42, count: 55, delay: 0 },
  { x: 0.98, y: 1.02, angle: -118, spread: 42, count: 55, delay: 0 },
  { x: -0.02, y: 0.62, angle: -22, spread: 36, count: 34, delay: 190 },
  { x: 1.02, y: 0.62, angle: -158, spread: 36, count: 34, delay: 190 },
  { x: 0.2, y: -0.02, angle: 68, spread: 34, count: 24, delay: 420 },
  { x: 0.8, y: -0.02, angle: 112, spread: 34, count: 24, delay: 420 },
];

const GRAVITY = 0.19;
const DRAG = 0.992;

export default function ConfettiBurst({ onDone }) {
  const canvasRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      doneRef.current?.();
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let pieces = [];
    let raf = 0;
    let lastFrame = 0;
    let cancelled = false;
    const timers = [];

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (arr) => arr[(Math.random() * arr.length) | 0];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pop = (cfg) => {
      if (cancelled) return;
      const originX = cfg.x * width;
      const originY = cfg.y * height;
      // Scaled to the viewport so the throw reaches across a wide desktop
      // as readily as a narrow phone.
      const reach = Math.max(width, height) / 900;

      for (let i = 0; i < cfg.count; i++) {
        const angle =
          ((cfg.angle + rand(-cfg.spread / 2, cfg.spread / 2)) * Math.PI) / 180;
        const speed = rand(9, 19) * reach;
        // Every fifth piece is a long streamer; the rest are small squares.
        const ribbon = Math.random() < 0.22;

        pieces.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          w: ribbon ? rand(4, 6) : rand(7, 12),
          h: ribbon ? rand(16, 30) : rand(7, 12),
          color: pick(COLORS),
          rot: rand(0, Math.PI * 2),
          rotSpeed: rand(-0.22, 0.22),
          tilt: rand(0, Math.PI * 2),
          tiltSpeed: rand(0.08, 0.2),
          // Streamers catch more air, so they sway wider and fall slower.
          wobblePhase: rand(0, Math.PI * 2),
          wobbleSpeed: rand(0.04, 0.1),
          wobbleAmp: ribbon ? rand(1.1, 2.3) : rand(0.3, 0.9),
          lift: ribbon ? 0.55 : 1,
          alpha: 1,
        });
      }
    };

    const frame = (time) => {
      if (cancelled) return;
      const dt = Math.min(time - lastFrame || 16, 48) / 16.6667;
      lastFrame = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];

        p.vy += GRAVITY * p.lift * dt;
        p.vx *= DRAG;
        p.vy *= DRAG;
        p.wobblePhase += p.wobbleSpeed * dt;

        p.x += (p.vx + Math.sin(p.wobblePhase) * p.wobbleAmp) * dt;
        p.y += p.vy * dt;
        p.rot += p.rotSpeed * dt;
        p.tilt += p.tiltSpeed * dt;

        // Fade only once it is on the way out and heading down.
        if (p.y > height * 0.72 && p.vy > 0) p.alpha -= 0.012 * dt;

        if (p.alpha <= 0 || p.y > height + 60) {
          pieces.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        // The tumble: height collapses to nothing as the piece turns edge-on.
        ctx.scale(1, Math.cos(p.tilt));
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (pieces.length === 0) {
        doneRef.current?.();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    POPPERS.forEach((cfg) =>
      cfg.delay === 0
        ? pop(cfg)
        : timers.push(setTimeout(() => pop(cfg), cfg.delay)),
    );

    window.addEventListener("resize", resize);
    raf = requestAnimationFrame((t) => {
      lastFrame = t;
      frame(t);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", resize);
      pieces = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="bpf-confetti" aria-hidden="true" />;
}
