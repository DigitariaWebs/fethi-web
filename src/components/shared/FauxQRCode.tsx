import * as React from "react";

/**
 * Visually-real-looking QR code rendered as inline SVG. Not actually scannable —
 * uses a deterministic seeded PRNG to fill cells that aren't part of the
 * required structural patterns (3 finder corners + timing rows + alignment
 * marker). The result reads as a real QR at a glance, which is exactly what
 * marketing/screenshot use-cases need.
 *
 * Pass a `seed` to vary the data-area pattern; same seed produces the same
 * code on every render.
 */
export function FauxQRCode({
  size = 192,
  seed = "mystreet-fr",
  fg = "#0E0C0A",
  bg = "#FFFFFF",
  className,
}: {
  size?: number;
  seed?: string;
  fg?: string;
  bg?: string;
  className?: string;
}) {
  const cells = React.useMemo(() => buildCells(seed), [seed]);
  const N = cells.length;
  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      width={size}
      height={size}
      className={className}
      aria-hidden
      shapeRendering="crispEdges"
    >
      <rect x={0} y={0} width={N} height={N} fill={bg} />
      {cells.map((row, i) =>
        row.map((on, j) =>
          on ? (
            <rect key={`${i}-${j}`} x={j} y={i} width={1} height={1} fill={fg} />
          ) : null,
        ),
      )}
    </svg>
  );
}

const N = 25;

function buildCells(seed: string) {
  const rand = mulberry32(hash(seed));
  const c: boolean[][] = Array.from({ length: N }, () => Array(N).fill(false));

  // 3 finder patterns (top-left, top-right, bottom-left): 7×7 black with white
  // 5×5 cutout and black 3×3 centre.
  paintFinder(c, 0, 0);
  paintFinder(c, 0, N - 7);
  paintFinder(c, N - 7, 0);

  // Timing patterns — alternating 1/0 row/col at index 6, between finders.
  for (let i = 8; i < N - 8; i++) {
    c[6][i] = i % 2 === 0;
    c[i][6] = i % 2 === 0;
  }

  // Single alignment pattern bottom-right (real QRs have these too)
  paintAlignment(c, N - 9, N - 9);

  // Random data fill — skip cells already in structural zones.
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (isReserved(i, j)) continue;
      if (c[i][j]) continue;
      c[i][j] = rand() < 0.48;
    }
  }
  return c;
}

function paintFinder(c: boolean[][], r0: number, c0: number) {
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      const isOuter = i === 0 || i === 6 || j === 0 || j === 6;
      const isCenter = i >= 2 && i <= 4 && j >= 2 && j <= 4;
      if (isOuter || isCenter) c[r0 + i][c0 + j] = true;
    }
  }
}

function paintAlignment(c: boolean[][], r0: number, c0: number) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const isOuter = i === 0 || i === 4 || j === 0 || j === 4;
      const isCenter = i === 2 && j === 2;
      if (isOuter || isCenter) c[r0 + i][c0 + j] = true;
    }
  }
}

function isReserved(i: number, j: number) {
  // Top-left finder + separator
  if (i < 8 && j < 8) return true;
  // Top-right finder + separator
  if (i < 8 && j >= N - 8) return true;
  // Bottom-left finder + separator
  if (i >= N - 8 && j < 8) return true;
  // Bottom-right alignment region
  if (i >= N - 9 && j >= N - 9) return true;
  // Timing rows
  if (i === 6 || j === 6) return true;
  return false;
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
