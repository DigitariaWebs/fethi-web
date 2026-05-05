"use client";

import * as React from "react";
import { Drawer as Vaul } from "vaul";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type DrawerProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: "right" | "bottom";
  children: React.ReactNode;
  footer?: React.ReactNode;
  widthClass?: string;
};

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  side = "right",
  children,
  footer,
  widthClass = "w-full max-w-xl",
}: DrawerProps) {
  return (
    <Vaul.Root
      open={open}
      onOpenChange={onOpenChange}
      direction={side}
    >
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-40 bg-overlay" />
        <Vaul.Content
          className={cn(
            "fixed z-50 flex flex-col bg-surface shadow-strong outline-none",
            side === "right"
              ? cn("inset-y-0 right-0 h-full", widthClass)
              : "inset-x-0 bottom-0 max-h-[88vh] rounded-t-xl",
          )}
        >
          <Vaul.Title className="sr-only">{typeof title === "string" ? title : "Détails"}</Vaul.Title>
          <Vaul.Description className="sr-only">{typeof description === "string" ? description : ""}</Vaul.Description>
          {title ? (
            <header className="flex items-start justify-between gap-4 border-b border-n-100 px-5 py-4">
              <div className="space-y-0.5">
                <h2 className="text-h3 font-medium tracking-tight text-ink">{title}</h2>
                {description ? (
                  <p className="text-body-sm text-n-500">{description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-md p-1.5 text-n-500 hover:bg-n-100 hover:text-n-700"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
          ) : null}
          <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
          {footer ? (
            <footer className="border-t border-n-100 px-5 py-3">{footer}</footer>
          ) : null}
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}
