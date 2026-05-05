"use client";

import * as React from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  if (reduced) {
    // Native scroll only — no Lenis when user prefers reduced motion.
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
