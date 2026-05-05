import { Download, Mail, Newspaper } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";
import { Button } from "@/components/ui/Button";

const mentions = [
  {
    outlet: "Le Monde",
    date: "12 mars 2026",
    title: "À Lille, une marketplace qui force à marcher",
    excerpt: "Le pari de MyStreet, c'est de faire de la distance une vertu. À l'heure de la livraison en quinze minutes, le contre-pied est radical.",
    href: "#",
  },
  {
    outlet: "La Voix du Nord",
    date: "28 février 2026",
    title: "MyStreet, le Bon Coin du quartier, lance ses cinq cents premiers utilisateurs",
    excerpt: "Trois Lillois lancent une appli pour vendre, louer et rendre service entre voisins. Premiers tests rue Royale et à Wazemmes.",
    href: "#",
  },
  {
    outlet: "Les Echos",
    date: "5 février 2026",
    title: "MyStreet lève 1,8 M€ pour ré-ancrer la marketplace dans le quartier",
    excerpt: "La start-up lilloise convainc Kima Ventures et un tour d'investisseurs régionaux autour d'une thèse anti-livraison.",
    href: "#",
  },
  {
    outlet: "Sifted",
    date: "20 janvier 2026",
    title: "Why Lille's MyStreet thinks the future of marketplaces is local",
    excerpt: "While Vinted goes pan-European, a French startup is betting on the opposite: a marketplace that forces face-to-face exchanges within walking distance.",
    href: "#",
  },
];

const downloads = [
  { title: "Logo & Wordmark (SVG, PNG)", desc: "Versions claires et sombres, sur fond paper et ink.", size: "2,4 Mo" },
  { title: "Captures d'écran de l'app", desc: "iOS et Android, en haute résolution, FR et EN.", size: "18 Mo" },
  { title: "Kit RP — Communiqué de lancement", desc: "Communiqué officiel, fact-sheet, photos fondateurs.", size: "6,1 Mo" },
];

export default function PressPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <Eyebrow className="justify-center">Espace presse</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Ce que la presse{" "}
            <span className="font-serif italic text-primary">en dit.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-n-600">
            Communiqués, mentions, ressources. Pour toute question, écrivez
            directement à notre équipe.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container>
          <Eyebrow>Dernières mentions</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink sm:text-display">
            On parle de nous{" "}
            <span className="font-serif italic text-primary">comme on en parle.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {mentions.map((m) => (
              <a
                key={m.title}
                href={m.href}
                className="group rounded-xl border border-n-100 bg-paper p-6 transition-colors hover:border-primary"
              >
                <div className="flex items-center justify-between text-caption text-n-500">
                  <span className="font-medium text-primary-ink">{m.outlet}</span>
                  <span>{m.date}</span>
                </div>
                <h3 className="mt-3 text-h3 font-medium text-ink group-hover:text-primary">{m.title}</h3>
                <p className="mt-3 text-body-sm text-n-600">{m.excerpt}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-n-700 group-hover:text-primary">
                  Lire l'article <Newspaper className="h-3.5 w-3.5" />
                </p>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container>
          <Eyebrow>Téléchargements presse</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink sm:text-display">
            Logos, captures,{" "}
            <span className="font-serif italic text-primary">communiqués.</span>
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {downloads.map((d) => (
              <div key={d.title} className="rounded-xl border border-n-100 bg-surface p-6">
                <Download className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-h3 font-medium text-ink">{d.title}</h3>
                <p className="mt-2 text-body-sm text-n-600">{d.desc}</p>
                <p className="mt-3 text-caption text-n-500">{d.size}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-t border-divider">
        <Container width="narrow">
          <div className="rounded-2xl border border-n-100 bg-paper p-8 sm:p-10">
            <Mail className="h-7 w-7 text-primary" />
            <h2 className="mt-4 text-h1 tracking-tight text-ink">Contact presse</h2>
            <p className="mt-3 text-body-lg text-n-600">
              Pour toute interview, demande de visuels ou question
              éditoriale, écrivez à notre équipe communication.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="mailto:presse@mystreet.fr" size="lg">presse@mystreet.fr</Button>
              <span className="text-body-sm text-n-500">Réponse sous 24 h ouvrées</span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
