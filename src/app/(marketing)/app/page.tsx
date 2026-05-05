import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";
import { AppleStoreBadge, PlayStoreBadge } from "@/components/shared/StoreBadges";
import { FauxQRCode } from "@/components/shared/FauxQRCode";

export const metadata = { title: "Téléchargez l'app" };

export default function AppPage() {
  return (
    <Section className="bg-paper">
      <Container className="text-center">
        <Eyebrow className="justify-center">Application mobile</Eyebrow>
        <h1 className="mx-auto mt-6 max-w-3xl text-display tracking-tight text-ink sm:text-display-xl">
          On ouvre l&apos;app pour vous…{" "}
          <span className="font-serif italic text-primary">ou téléchargez ici.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-n-600">
          Si l&apos;app MyStreet est installée, elle s&apos;ouvre automatiquement.
          Sinon, choisissez votre store ci-dessous, ou scannez le QR code.
        </p>

        <div className="mx-auto mt-12 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* Left — phone screen recording */}
          <div className="flex justify-center lg:justify-end">
            <PhoneFrame>
              <video
                className="h-full w-full object-cover"
                src="/hero-mobile.mp4"
                poster="/hero-mobile-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
              />
            </PhoneFrame>
          </div>

          {/* Center — QR code card + store badges */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-n-100 bg-surface p-5 shadow-medium">
              <div className="rounded-xl border border-n-100 bg-white p-2">
                <FauxQRCode size={196} seed="mystreet-fr-2026" />
              </div>
              <p className="max-w-[14rem] text-caption text-n-500">
                Scannez pour ouvrir le bon store sur votre téléphone.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3">
              <AppleStoreBadge href="https://apps.apple.com/app/mystreet" />
              <PlayStoreBadge href="https://play.google.com/store/apps/details?id=fr.mystreet" />
            </div>
          </div>

          {/* Right — feature highlights to balance the layout */}
          <div className="hidden text-left lg:block">
            <ul className="space-y-5">
              <Highlight title="Découverte par carte">
                Voyez les annonces de votre rue avant celles de votre ville.
              </Highlight>
              <Highlight title="Messagerie sécurisée">
                Discutez avec vos voisins sans partager votre numéro.
              </Highlight>
              <Highlight title="Paiement protégé">
                Réglez via l&apos;app, l&apos;argent ne part qu&apos;après confirmation
                de la rencontre.
              </Highlight>
              <Highlight title="Notes voisin">
                Une note réciproque après chaque échange — la confiance se construit.
              </Highlight>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-body text-n-500">
          Pas d&apos;app ?{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            Continuez sur le site →
          </Link>
        </p>
      </Container>
    </Section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[280px] rounded-[44px] border-[10px] border-[#0E0C0A] bg-[#0E0C0A] shadow-strong">
      <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[#0E0C0A]" />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[34px] bg-paper">
        {children}
      </div>
    </div>
  );
}

function Highlight({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="border-l border-divider pl-5">
      <p className="text-body font-medium text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-body-sm text-n-500">{children}</p>
    </li>
  );
}
