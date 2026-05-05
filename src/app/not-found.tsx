import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page introuvable — MyStreet" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <p
          className="font-serif italic text-primary leading-none"
          style={{ fontSize: "10rem", letterSpacing: "-0.04em" }}
        >
          404
        </p>
        <h1 className="text-h1 font-medium tracking-tight text-ink">
          Cette rue n&apos;existe pas.
        </h1>
        <p className="max-w-md text-body text-n-500">
          La page que vous cherchez a peut-être déménagé. Si vous l&apos;avez
          bookmarkée il y a longtemps, on a peut-être déplacé du contenu —
          merci de votre patience.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button href="/" size="md">Retour à l&apos;accueil</Button>
          <Button href="/help" variant="outline" size="md">Centre d&apos;aide</Button>
        </div>
        <p className="pt-6 text-caption text-n-400">
          Lille · MyStreet · perdu mais pas pour longtemps.
        </p>
      </div>
    </main>
  );
}
