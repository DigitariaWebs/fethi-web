import Link from "next/link";
import { Container, Section } from "@/components/marketing/shell/Container";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";

type Position = {
  title: string;
  team: string;
  location: string;
  seniority: string;
  about: string;
  duties: string[];
  profile: string[];
  why: string[];
  comp: string;
};

const positions: Record<string, Position> = {
  "senior-backend-engineer": {
    title: "Senior Backend Engineer",
    team: "Tech",
    location: "Lille / Remote-FR",
    seniority: "Senior",
    about:
      "Vous prenez en charge l'architecture du back de MyStreet : matching géographique, paiement protégé, modération automatisée. Vous travaillez avec deux ingénieurs et notre CTO.",
    duties: [
      "Concevoir et faire évoluer la pile backend (Node, PostgreSQL, Postgis, Redis).",
      "Implémenter les flux de paiement protégé avec Stripe Connect et Mangopay.",
      "Construire les briques anti-fraude et modération automatisée à partir des signalements.",
      "Maintenir un haut standard de qualité : tests, observabilité, post-mortem honnêtes.",
    ],
    profile: [
      "5+ ans en back-end, dont au moins une expérience marketplace ou paiement.",
      "Confort avec les systèmes géo-localisés et la modélisation Postgis.",
      "Goût pour la simplicité — moins de services, plus de clarté.",
    ],
    why: [
      "Une équipe à taille humaine où vos décisions comptent vraiment.",
      "Lille en hard launch : impact mesurable, terrain accessible.",
      "Pas de stack à la mode pour la mode. Pas d'astreintes la nuit.",
    ],
    comp: "70 – 90 k€ + BSPCE + tickets resto, mutuelle Alan, 6 semaines de congés.",
  },
};

const fallback = (slug: string): Position => ({
  title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  team: "À confirmer",
  location: "Lille / Remote-FR",
  seniority: "Mid–Senior",
  about:
    "Cette offre est en cours de finalisation. La fiche ci-dessous est une structure type — pour les détails précis, écrivez-nous directement à hello@mystreet.fr.",
  duties: [
    "Contribuer à un produit lu par des dizaines de milliers de voisins lillois.",
    "Travailler en binôme avec un membre senior pendant les trois premiers mois.",
    "Participer aux revues produit hebdomadaires et aux journées terrain.",
  ],
  profile: [
    "Trois à cinq ans d'expérience dans un rôle similaire.",
    "Goût pour les produits soignés et les équipes petites.",
    "Curiosité pour les usages locaux et la dimension communautaire.",
  ],
  why: [
    "Une équipe lilloise, indépendante et lucide.",
    "Un produit qu'on défend volontiers en public.",
    "Une feuille de route claire jusqu'à 2027.",
  ],
  comp: "Selon profil + BSPCE + tickets resto, mutuelle Alan, 6 semaines de congés.",
});

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = positions[slug] ?? fallback(slug);

  const sections: { heading: string; bullets?: string[]; text?: string }[] = [
    { heading: "À propos du rôle", text: p.about },
    { heading: "Ce que vous ferez", bullets: p.duties },
    { heading: "Profil recherché", bullets: p.profile },
    { heading: "Pourquoi MyStreet", bullets: p.why },
    { heading: "Compensation", text: p.comp },
  ];

  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow">
          <Link href="/careers" className="text-caption text-n-500 hover:text-primary">
            ← Tous les postes
          </Link>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            {p.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone="neutral">{p.team}</Pill>
            <Pill tone="accent">{p.location}</Pill>
            <Pill tone="primary">{p.seniority}</Pill>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container width="narrow">
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-h1 tracking-tight text-ink">{s.heading}</h2>
                {s.text ? (
                  <p className="mt-4 text-body-lg text-n-700">{s.text}</p>
                ) : null}
                {s.bullets ? (
                  <ul className="mt-4 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-body text-n-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container width="narrow">
          <div className="rounded-2xl border border-n-100 bg-surface p-8 sm:p-10">
            <h2 className="text-h1 tracking-tight text-ink">Postuler</h2>
            <p className="mt-3 text-body-lg text-n-600">
              Envoyez-nous CV, lien GitHub ou portfolio, et trois lignes
              expliquant pourquoi MyStreet vous parle.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href={`mailto:jobs@mystreet.fr?subject=${encodeURIComponent(p.title)}`} size="lg">
                Postuler par e-mail
              </Button>
              <span className="text-body-sm text-n-500">jobs@mystreet.fr · Réponse sous 7 jours</span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
