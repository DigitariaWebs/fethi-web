"use client";

import { useState } from "react";
import { Copy, Check, AtSign, Camera, MessageSquare } from "lucide-react";
import { Container, Section } from "@/components/marketing/shell/Container";
import { Button } from "@/components/ui/Button";

const code = "MST-MARIE-42";

export default function WaitlistConfirmedPage() {
  const [copied, setCopied] = useState(false);

  return (
    <Section className="bg-paper">
      <Container width="narrow" className="flex flex-col items-center text-center">
        <div className="rounded-2xl border border-n-100 bg-surface p-10 sm:p-14 shadow-medium">
          <span className="font-serif text-display-xl italic text-primary">Merci !</span>
          <p className="mx-auto mt-6 max-w-md text-body-lg text-n-600">
            On vous écrit dès que MyStreet ouvre dans votre quartier. En
            attendant, voici comment nous aider à arriver plus vite.
          </p>

          <div className="mt-10 grid gap-4 text-left">
            <div className="rounded-xl border border-n-100 bg-paper p-5">
              <p className="text-label uppercase tracking-[0.14em] text-n-500">
                01 — Partagez votre code de parrainage
              </p>
              <p className="mt-2 text-body-sm text-n-600">
                Chaque voisin inscrit avec votre code vous fait gagner deux
                mois de MyStreet+ offerts au lancement.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <code className="flex-1 rounded-md border border-n-200 bg-surface px-4 py-3 text-center font-mono text-body font-semibold text-primary-ink tracking-wide">
                  {code}
                </code>
                <Button
                  type="button"
                  size="md"
                  onClick={() => {
                    navigator.clipboard?.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" /> Copié
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copier
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-n-100 bg-paper p-5">
              <p className="text-label uppercase tracking-[0.14em] text-n-500">
                02 — Suivez-nous
              </p>
              <p className="mt-2 text-body-sm text-n-600">
                On y partage l'avancée du lancement, rue par rue.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="https://twitter.com/mystreetfr"
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-[rgba(31,36,33,0.10)] bg-white/[0.72] px-4 text-body-sm text-n-700 backdrop-blur-[16px] backdrop-saturate-[1.4] shadow-btn-glass hover:bg-white/[0.85] hover:border-[rgba(31,36,33,0.14)] hover:shadow-btn-glass-hover"
                >
                  <AtSign className="h-4 w-4" /> Twitter
                </a>
                <a
                  href="https://instagram.com/mystreet.fr"
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-[rgba(31,36,33,0.10)] bg-white/[0.72] px-4 text-body-sm text-n-700 backdrop-blur-[16px] backdrop-saturate-[1.4] shadow-btn-glass hover:bg-white/[0.85] hover:border-[rgba(31,36,33,0.14)] hover:shadow-btn-glass-hover"
                >
                  <Camera className="h-4 w-4" /> Instagram
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-n-100 bg-paper p-5">
              <p className="text-label uppercase tracking-[0.14em] text-n-500">
                03 — Rejoignez notre Discord
              </p>
              <p className="mt-2 text-body-sm text-n-600">
                Le serveur communautaire des early adopters lillois.
              </p>
              <div className="mt-4">
                <Button href="https://discord.gg/mystreet" variant="outline">
                  <MessageSquare className="h-4 w-4" /> Rejoindre le Discord
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-caption text-n-500">
            On ouvre rue par rue. La vôtre est peut-être la prochaine.
          </p>
        </div>
      </Container>
    </Section>
  );
}
