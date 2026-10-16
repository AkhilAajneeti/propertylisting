import React, { useEffect, useRef } from "react";

/**
 * Canvas firework overlay for the festival banner.
 *
 * Rockets climb, stall, then burst into sparks that fall under gravity.
 * Drawn on a transparent canvas so the artwork shows through: the trails
 * come from wiping the previous frame with "destination-out" rather than
 * painting a dark background over the banner.
 *
 * Idles itself when the tab is hidden or the banner is scrolled past, and
 * draws nothing at all for anyone who asked for reduced motion.
 */

const COLORS = ["#ffd24a", "#ffb43a", "#ff7a33", "#e6324b", "#fff3c4"];
const SPARKLE = "#fff6d8";

// Enough sparks to feel generous, few enough to stay cheap on a phone.
const MAX_SPARKS = 900;
// Roughly 4.5s of celebration on arrival, then it settles down.
const OPENING_MS = 4500;

export default function FireworksOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let rockets = [];
    let sparks = [];
    let raf = 0;
    let lastFrame = 0;
    let nextLaunch = 0;
    let startedAt = 0;
    let onScreen = true;
    let running = false;

    const rand = (min, max) => min + Math.random() * (max - min);
    const pick = (arr) => arr[(Math.random() * arr.length) | 0];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // Capped: a 3x phone screen triples the fill cost for no visible gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launch = () => {
      // Kept off the extreme edges so bursts stay inside the frame.
      const x = rand(width * 0.1, width * 0.9);
      const peak = rand(height * 0.14, height * 0.46);
      return rockets.push({
        x,
        y: height + 8,
        vx: rand(-0.3, 0.3),
        // Just enough upward speed to stall at the intended height.
        vy: -Math.sqrt(2 * 0.12 * (height - peak)),
        peak,
        color: pick(COLORS),
      });
    };

    const explode = (rocket) => {
      if (sparks.length > MAX_SPARKS) return;
      const count = 48 + ((Math.random() * 30) | 0);
      const base = pick(COLORS);
      const power = rand(1.9, 3.5);
      // Rings are slightly elliptical and jittered - a perfect circle reads
      // as a graphic, not an explosion.
      const squash = rand(0.82, 1);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + rand(-0.08, 0.08);
        const speed = power * rand(0.42, 1);
        sparks.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * squash,
          life: 1,
          decay: rand(0.008, 0.019),
          size: rand(1.1, 2.4),
          color: Math.random() < 0.16 ? SPARKLE : base,
        });
      }
    };

    const frame = (time) => {
      if (!running) return;
      // Normalised to 60fps, and clamped so a stalled tab cannot teleport
      // every particle across the screen on the next frame.
      const dt = Math.min(time - lastFrame || 16, 48) / 16.6667;
      lastFrame = time;

      // Wipe a little of the last frame instead of clearing it: what is left
      // behind becomes the trail, and the canvas stays transparent.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.17)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (time > nextLaunch) {
        launch();
        const opening = time - startedAt < OPENING_MS;
        nextLaunch = time + (opening ? rand(200, 520) : rand(1500, 3200));
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx * dt;
        r.y += r.vy * dt;
        r.vy += 0.12 * dt;

        ctx.globalAlpha = 1;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.1, 0, Math.PI * 2);
        ctx.fill();

        if (r.vy >= 0 || r.y <= r.peak) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 0.036 * dt; // gravity
        s.vx *= 0.986; // air drag
        s.vy *= 0.986;
        s.life -= s.decay * dt;

        if (s.life <= 0 || s.y > height + 40) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame((t) => {
        lastFrame = t;
        if (!startedAt) startedAt = t;
        frame(t);
      });
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const syncRunning = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // No point burning frames on a banner nobody is looking at.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        syncRunning();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    document.addEventListener("visibilitychange", syncRunning);
    syncRunning();

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", syncRunning);
      rockets = [];
      sparks = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="bpf-fireworks" aria-hidden="true" />;
}
