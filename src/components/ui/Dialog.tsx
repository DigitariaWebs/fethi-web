"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          data-lenis-prevent
        >
          <button
            aria-label="Fermer"
            className="absolute inset-0 bg-overlay"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative w-full max-w-md rounded-xl bg-surface shadow-strong",
              className,
            )}
          >
            {title ? (
              <header className="flex items-start justify-between gap-4 border-b border-n-100 px-5 py-4">
                <div className="space-y-0.5">
                  <h2 className="text-h3 font-medium tracking-tight text-ink">{title}</h2>
                  {description ? <p className="text-body-sm text-n-500">{description}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="rounded-md p-1.5 text-n-500 hover:bg-n-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>
            ) : null}
            <div className="px-5 py-5">{children}</div>
            {footer ? <footer className="border-t border-n-100 px-5 py-3 flex items-center justify-end gap-2">{footer}</footer> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
