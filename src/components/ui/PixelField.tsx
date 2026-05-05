"use client";

import * as React from "react";

type Props = {
  /** Square pixel cell size in CSS px. Smaller = denser, more expensive. */
  cell?: number;
  /** Cursor influence radius in CSS px. */
  radius?: number;
  /** RGB triplet for the lit pixels (the "ink"). */
  tone?: [number, number, number];
  /** Strength of ambient flow (0–1). */
  ambient?: number;
  /** Wrapper className. */
  className?: string;
};

/**
 * Cursor-reactive halftone field rendered with Canvas 2D.
 *
 * For every grid cell we sample two scalars:
 *   1. Cheap multi-octave flow noise (sin/cos of position + time) — ambient swirl.
 *   2. A radial falloff from the cursor — local glow that follows the pointer.
 *
 * The combined value drives BOTH the cell's opacity and its drawn size, which
 * gives the dithered halftone look (small, faint dots in calm areas; bigger,
 * brighter blocks where the field peaks). prefers-reduced-motion freezes the
 * ambient flow, leaving only the cursor response.
 */
export function PixelField({
  cell = 10,
  radius = 280,
  tone = [200, 85, 61],
  ambient = 0.55,
  className,
}: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvas: HTMLCanvasElement = el;
    const c = canvas.getContext("2d");
    if (!c) return;
    const ctx: CanvasRenderingContext2D = c;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pointer state lives in refs so the loop can read latest values without
    // restarting on every move.
    const mouse = { x: -9999, y: -9999, active: false };
    let widthCss = 0;
    let heightCss = 0;
    let raf = 0;
    let lastFrame = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      widthCss = rect.width;
      heightCss = rect.height;
      canvas.width = Math.round(widthCss * dpr);
      canvas.height = Math.round(heightCss * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function loop(t: number) {
      // Cap to ~45 fps. Halftone fields don't need 60 — saves battery.
      if (t - lastFrame < 22) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastFrame = t;

      ctx.clearRect(0, 0, widthCss, heightCss);

      const time = reduced ? 0 : t / 1000;
      const r = radius;
      const r2 = r * r;
      const [tr, tg, tb] = tone;

      const mx = mouse.x;
      const my = mouse.y;
      const active = mouse.active;

      // Iterate the grid. For each cell, compute the combined intensity field
      // and paint a centered square sized in proportion to it.
      for (let y = 0; y < heightCss; y += cell) {
        for (let x = 0; x < widthCss; x += cell) {
          // Cheap pseudo-noise — three offset sinusoids, normalized to 0..1.
          const flow =
            Math.sin(x * 0.011 + time * 0.55) +
            Math.cos(y * 0.013 - time * 0.45) +
            Math.sin((x + y) * 0.0085 + time * 0.3);
          const a = (flow / 3 + 1) * 0.5; // 0..1

          // Cursor field: smooth radial falloff. Squared distance avoids sqrt.
          let cursor = 0;
          if (active) {
            const dx = x - mx;
            const dy = y - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2) {
              const f = 1 - d2 / r2;
              cursor = f * f; // smoothstep-ish, soft edge
            }
          }

          // Combine. The `-0.42` floor cuts the quiet bottom so calm areas stay
          // truly dark and the swirl reads cleanly.
          let intensity = a * ambient + cursor * 0.95 - 0.42;
          if (intensity <= 0.02) continue;
          if (intensity > 1) intensity = 1;

          const size = intensity * cell;
          const offset = (cell - size) * 0.5;
          ctx.fillStyle = `rgba(${tr},${tg},${tb},${intensity.toFixed(3)})`;
          ctx.fillRect(x + offset, y + offset, size, size);
        }
      }

      raf = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onPointerLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    window.addEventListener("resize", resize);
    // Listen on the *parent* so the cursor field tracks even when the canvas
    // sits below content with `pointer-events: none`.
    const parent = canvas.parentElement ?? canvas;
    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [cell, radius, tone, ambient]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}
