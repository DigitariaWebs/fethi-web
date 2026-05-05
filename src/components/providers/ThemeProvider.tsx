"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeCtx = {
  theme: Theme;
  toggle: (event?: { clientX: number; clientY: number }) => void;
};

const STORAGE_KEY = "mystreet:theme";
const Ctx = React.createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

export const useTheme = () => React.useContext(Ctx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Hydrate from whatever class the inline FOUC-script set on <html>.
  // This avoids a hydration mismatch — the client reads the same source of truth.
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggle = React.useCallback<ThemeCtx["toggle"]>(
    (event) => {
      const next: Theme = theme === "light" ? "dark" : "light";

      // Click coordinates feed the radial-mask center for the pour effect.
      // Falls back to the screen centre if the toggle was triggered by keyboard.
      const x = event ? `${event.clientX}px` : "50%";
      const y = event ? `${event.clientY}px` : "50%";
      document.documentElement.style.setProperty("--click-x", x);
      document.documentElement.style.setProperty("--click-y", y);

      const apply = () => {
        document.documentElement.classList.toggle("dark", next === "dark");
        setTheme(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* private mode / cookies disabled — ignore */
        }
      };

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        apply();
        return;
      }

      const docAny = document as Document & {
        startViewTransition?: (cb: () => void | Promise<void>) => {
          finished: Promise<void>;
        };
      };

      // ✦ Coffee-pour path #1 — Chrome/Edge/Safari 18+: native View Transitions.
      // The browser snapshots both states; CSS animates the radial mask on the
      // new state, producing a soft-edged circle that expands from the click.
      if (typeof docAny.startViewTransition === "function") {
        docAny.startViewTransition(apply);
        return;
      }

      // ✦ Coffee-pour path #2 — Firefox / older Safari: manual overlay.
      // We paint a fixed div in the destination theme's surface color and
      // let the same radial-mask animation pour it across the viewport,
      // then swap classes when the animation finishes.
      const overlay = document.createElement("div");
      overlay.className = "theme-pour-overlay";
      overlay.style.background =
        next === "dark" ? "rgb(24 21 18)" : "rgb(251 248 244)";
      document.body.appendChild(overlay);

      // Apply the new theme on the document slightly before the overlay fades,
      // so the underlying page is already correct when the mask fully expands.
      const applyAt = 760;
      const removeAt = 850;
      window.setTimeout(apply, applyAt);
      window.setTimeout(() => overlay.remove(), removeAt);
    },
    [theme],
  );

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

/**
 * Inline script content — runs synchronously in <head> before paint to set
 * the right `dark` class on <html>. This kills the white-flash that would
 * otherwise happen on page load when the user has dark mode saved.
 */
export const themeBootScript = `try{var t=localStorage.getItem('mystreet:theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}`;
