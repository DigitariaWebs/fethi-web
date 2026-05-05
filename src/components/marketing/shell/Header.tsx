"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/shared/Wordmark";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils/cn";

const nav = [
  { href: "/how-it-works", label: "Comment ça marche" },
  { href: "/buyers", label: "Acheter" },
  { href: "/sellers", label: "Vendre" },
  { href: "/services", label: "Services & Locations" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/about", label: "À propos" },
];

export function MarketingHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-all duration-300",
        scrolled ? "border-b border-divider bg-paper/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-2" aria-label="MyStreet">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3 py-2 text-body-sm font-medium text-n-700 hover:text-ink transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle size="sm" />
          <Button href="/app" variant="ghost" size="sm">
            Ouvrir l&apos;app
          </Button>
          <Button href="/#waitlist" size="sm">
            Rejoindre
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle size="sm" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden overflow-hidden border-t border-divider bg-paper"
          >
            <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 py-4">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-body font-medium text-n-700 hover:bg-n-100"
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                <Button href="/app" variant="outline" className="flex-1">
                  Ouvrir l&apos;app
                </Button>
                <Button href="/#waitlist" className="flex-1">
                  Rejoindre
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
