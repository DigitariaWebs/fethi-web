import { Check, X } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

const tiers = [
  {
    name: "Gratuit",
    price: "0 €",
    period: "à vie",
    pitch: "Pour acheter, vendre, louer entre voisins.",
    features: [
      "Annonces illimitées",
      "Messagerie chiffrée illimitée",
      "Paiement sécurisé inclus",
      "Note voisin réciproque",
      "Modération humaine 7 j/7",
      "Support par e-mail",
    ],
    cta: "Démarrer gratuitement",
    href: "/#waitlist",
    highlight: false,
  },
  {
    name: "MyStreet+",
    price: "1,99 €",
    period: "par mois",
    pitch: "Pour aller plus loin sans changer ses habitudes.",
    features: [
      "Rayon de recherche personnalisé",
      "Recherches sauvegardées avec alertes",
      "Boosts à moitié prix",
      "Support prioritaire (24 h)",
      "Sans engagement, résiliable à tout moment",
    ],
    cta: "Activer MyStreet+",
    href: "/#waitlist",
    highlight: true,
  },
];

const boosts = [
  { duration: "24 h", price: "0,99 €", note: "Idéal pour donner un coup de pouce avant le week-end." },
  { duration: "7 j", price: "4,99 €", note: "L’option la plus utilisée par les vendeurs réguliers." },
  { duration: "30 j", price: "14,99 €", note: "Pour les annonces de meubles ou objets à plus de 100 €." },
];

const compare: Array<{
  feature: string;
  values: [string | boolean, string | boolean];
}> = [
  { feature: "Annonces actives", values: ["Illimitées", "Illimitées"] },
  { feature: "Commission sur les ventes", values: ["5 % côté vendeur", "5 % côté vendeur"] },
  { feature: "Rayon de recherche", values: ["Quartier (par défaut)", "Personnalisé jusqu’à 5 km"] },
  { feature: "Recherches sauvegardées", values: [false, true] },
  { feature: "Alertes nouvelles annonces", values: [false, true] },
  { feature: "Boosts", values: ["Plein tarif", "−50 %"] },
  { feature: "Support", values: ["E-mail standard", "Prioritaire 24 h"] },
];

const faqs = [
  {
    q: "Comment fonctionne la commission de 5 % ?",
    a: "Lors d’une vente finalisée dans l’app, MyStreet retient 5 % du prix sur la part du vendeur — pour couvrir le paiement protégé, le service de litige et la modération. L’acheteur paie le prix affiché, sans surplus.",
  },
  {
    q: "Pourquoi un abonnement à 1,99 € ?",
    a: "MyStreet+ finance le développement et la modération sans publicité. C’est le prix d’un café — et il vous offre les outils pour vendre plus, plus loin et plus rapidement.",
  },
  {
    q: "Y a-t-il un engagement ?",
    a: "Aucun. MyStreet+ se résilie en deux clics, à effet à la fin du mois en cours.",
  },
  {
    q: "Et la TVA ?",
    a: "L’abonnement est en TTC. Si vous êtes assujetti à la TVA, une facture mensuelle est générée automatiquement dans votre espace.",
  },
  {
    q: "Quels moyens de paiement ?",
    a: "Carte bancaire, Apple Pay, Google Pay. Le prélèvement SEPA arrive courant 2027.",
  },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="h-5 w-5 text-accent" />;
  if (v === false) return <X className="h-5 w-5 text-n-300" />;
  return <span className="text-body-sm text-ink">{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <Eyebrow className="justify-center">Tarification</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Gratuit pour vendre.{" "}
            <span className="font-serif italic text-primary">1,99&nbsp;€/mois pour aller plus loin.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-n-600">
            Pas de pub, pas de revente de données, pas de frais d’inscription.
            MyStreet vit de sa commission de 5&nbsp;% sur les ventes finalisées
            et d’un abonnement optionnel à moins de deux euros.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-xl border bg-paper p-7 ${
                  t.highlight
                    ? "border-primary shadow-medium ring-1 ring-primary/20"
                    : "border-n-100"
                }`}
              >
                {t.highlight ? (
                  <Pill tone="primary" className="self-start">Le plus populaire</Pill>
                ) : null}
                <h3 className="mt-3 text-h2 text-ink">{t.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-display italic text-primary">{t.price}</span>
                  <span className="text-body-sm text-n-500">{t.period}</span>
                </div>
                <p className="mt-3 text-body text-n-600">{t.pitch}</p>
                <ul className="mt-6 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-body-sm text-n-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex-1" />
                <Button href={t.href} variant={t.highlight ? "primary" : "outline"} className="w-full">
                  {t.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <Eyebrow>Boosts à l’unité</Eyebrow>
              <h2 className="mt-4 text-display tracking-[-0.02em] text-ink">
                Mettez en avant{" "}
                <span className="font-serif italic text-primary">une seule annonce.</span>
              </h2>
              <p className="mt-4 max-w-md text-body text-n-600">
                Chaque boost remonte votre annonce dans la carte du quartier
                pour une durée fixe. Sans abonnement. Sans engagement.
              </p>
              <p className="mt-3 max-w-md text-body-sm text-n-500">
                Avec MyStreet+, ces tarifs sont divisés par deux.
              </p>
            </div>
            <ul className="space-y-3">
              {boosts.map((b) => (
                <li
                  key={b.duration}
                  className="flex items-center justify-between gap-6 rounded-lg border border-n-100 bg-surface px-5 py-4"
                >
                  <div>
                    <p className="text-h3 font-medium text-ink">Boost {b.duration}</p>
                    <p className="text-body-sm text-n-500">{b.note}</p>
                  </div>
                  <p className="font-serif text-h2 italic text-primary tabular">{b.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container>
          <Eyebrow>Comparaison</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink sm:text-display">
            Tout en{" "}
            <span className="font-serif italic text-primary">un coup d’œil.</span>
          </h2>
          <div className="mt-10 overflow-x-auto rounded-xl border border-n-100 bg-surface">
            <table className="w-full text-left">
              <thead className="border-b border-n-100 bg-n-50">
                <tr>
                  <th className="px-5 py-4 text-label uppercase tracking-[0.12em] text-n-500">Fonctionnalité</th>
                  {tiers.map((t) => (
                    <th key={t.name} className="px-5 py-4 text-label uppercase tracking-[0.12em] text-n-700">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-n-100">
                {compare.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-5 py-4 text-body text-ink">{row.feature}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-5 py-4">
                        <Cell v={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container width="narrow">
          <Eyebrow>Questions fréquentes</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink">
            On vous dit{" "}
            <span className="font-serif italic text-primary">tout.</span>
          </h2>
          <div className="mt-10 divide-y divide-n-100 border-y border-n-100">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-body-lg font-medium text-ink">
                  {f.q}
                  <span className="mt-1 text-n-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-body text-n-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container width="narrow" className="text-center">
          <h2 className="text-display tracking-tight text-ink">
            Commencez{" "}
            <span className="font-serif italic text-primary">gratuitement.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/#waitlist" size="lg">Démarrer gratuitement</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
