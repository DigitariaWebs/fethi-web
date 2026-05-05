"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-20">
      <div className="mx-auto w-full max-w-lg text-center">
        <p className="text-label uppercase tracking-[0.16em] text-n-500">Erreur</p>
        <h1 className="mt-6 font-serif text-display-xl italic text-primary">
          Une erreur est survenue.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-body-lg text-n-600">
          On n'a pas pu afficher la page. Réessayez dans un instant — si le
          problème persiste, écrivez à support@mystreet.fr.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()} size="lg">
            Réessayer
          </Button>
          <Link
            href="/"
            className="text-body font-medium text-n-700 hover:text-primary"
          >
            Retour à l'accueil
          </Link>
        </div>

        {error.digest ? (
          <div className="mt-10 inline-flex items-center gap-2 rounded-md border border-n-200 bg-surface px-3 py-1.5">
            <span className="text-caption text-n-500">ID</span>
            <code className="font-mono text-caption text-primary-ink">{error.digest}</code>
          </div>
        ) : null}
      </div>
    </main>
  );
}
