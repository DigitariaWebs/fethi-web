import Link from "next/link";
import { Search, ShoppingBag, Tag, CreditCard, BadgeCheck, Scale, UserCog } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";
import { Input } from "@/components/ui/Input";

const categories = [
  {
    icon: ShoppingBag,
    title: "Acheter",
    articles: [
      { slug: "comment-trouver-une-annonce", title: "Comment trouver une annonce dans mon quartier" },
      { slug: "fixer-un-rendez-vous", title: "Fixer un rendez-vous avec un voisin" },
      { slug: "annuler-un-achat", title: "Annuler un achat avant la rencontre" },
      { slug: "litige-acheteur", title: "Que faire si l'objet ne correspond pas" },
    ],
  },
  {
    icon: Tag,
    title: "Vendre",
    articles: [
      { slug: "comment-publier-une-annonce", title: "Comment publier une annonce en 20 secondes" },
      { slug: "fixer-le-prix", title: "Fixer le bon prix avec la suggestion auto" },
      { slug: "modifier-une-annonce", title: "Modifier ou supprimer une annonce" },
      { slug: "boost-une-annonce", title: "Mettre une annonce À la une" },
    ],
  },
  {
    icon: CreditCard,
    title: "Paiement",
    articles: [
      { slug: "comment-payer-en-ligne", title: "Moyens de paiement acceptés" },
      { slug: "paiement-protege", title: "Comment fonctionne le paiement protégé" },
      { slug: "delai-versement", title: "Délais de versement vendeur" },
      { slug: "factures", title: "Récupérer mes factures" },
    ],
  },
  {
    icon: BadgeCheck,
    title: "KYC",
    articles: [
      { slug: "verifier-mon-identite", title: "Vérifier mon identité (KYC)" },
      { slug: "documents-acceptes", title: "Documents acceptés" },
      { slug: "kyc-refuse", title: "Que faire si le KYC est refusé" },
    ],
  },
  {
    icon: Scale,
    title: "Litiges",
    articles: [
      { slug: "ouvrir-un-litige", title: "Ouvrir un litige" },
      { slug: "delais-traitement-litige", title: "Délais de traitement" },
      { slug: "remboursement", title: "Demander un remboursement" },
    ],
  },
  {
    icon: UserCog,
    title: "Compte",
    articles: [
      { slug: "creer-un-compte", title: "Créer un compte" },
      { slug: "supprimer-mon-compte", title: "Supprimer mon compte" },
      { slug: "modifier-mon-quartier", title: "Changer de quartier" },
      { slug: "notifications", title: "Gérer mes notifications" },
    ],
  },
];

const popular = [
  { slug: "comment-publier-une-annonce", title: "Comment publier une annonce en 20 secondes" },
  { slug: "comment-payer-en-ligne", title: "Moyens de paiement acceptés" },
  { slug: "verifier-mon-identite", title: "Vérifier mon identité (KYC)" },
  { slug: "fixer-un-rendez-vous", title: "Fixer un rendez-vous avec un voisin" },
  { slug: "ouvrir-un-litige", title: "Ouvrir un litige" },
];

export default function HelpPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <Eyebrow className="justify-center">Centre d'aide</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Une question ?{" "}
            <span className="font-serif italic text-primary">On répond.</span>
          </h1>
          <div className="mx-auto mt-8 max-w-xl">
            <Input
              placeholder="Rechercher un article…"
              leadingIcon={<Search className="h-4 w-4" />}
              className="h-12"
            />
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="rounded-xl border border-n-100 bg-paper p-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h2 className="mt-4 text-h3 font-medium text-ink">{cat.title}</h2>
                  <ul className="mt-4 space-y-2">
                    {cat.articles.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/help/${a.slug}`}
                          className="text-body-sm text-n-700 hover:text-primary"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container width="narrow">
          <Eyebrow>Questions populaires</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink">
            Les{" "}
            <span className="font-serif italic text-primary">cinq</span> les plus lues.
          </h2>
          <ul className="mt-8 divide-y divide-n-100 border-y border-n-100">
            {popular.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/help/${p.slug}`}
                  className="flex items-center justify-between py-4 text-body-lg text-ink hover:text-primary"
                >
                  {p.title}
                  <span className="text-n-400">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
