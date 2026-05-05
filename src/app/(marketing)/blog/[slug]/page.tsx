import Link from "next/link";
import { Share2, Link2, AtSign } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";

const slugToTitle: Record<string, { title: string; category: string; excerpt: string; author: string; authorRole: string; authorInitials: string }> = {
  "pourquoi-marcher-pour-acheter": {
    title: "Pourquoi marcher pour acheter, en 2026",
    category: "Manifeste",
    excerpt: "Quinze minutes à pied valent mieux que trois jours d'expédition.",
    author: "Fadi Arabi",
    authorRole: "CEO de MyStreet",
    authorInitials: "FA",
  },
};

const related = [
  { slug: "anti-livraison-15-minutes", title: "L'anti-livraison-en-15-minutes" },
  { slug: "louer-plutot-qu-acheter", title: "Louer plutôt qu'acheter : cinq objets" },
  { slug: "vieux-lille-marche-noel", title: "Vieux-Lille : ce que les voisins vendent l'hiver" },
];

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = slugToTitle[slug] ?? {
    title: "Article du journal",
    category: "Journal",
    excerpt: "Une réflexion à propos de notre quartier.",
    author: "Marie Lambert",
    authorRole: "Product, MyStreet",
    authorInitials: "ML",
  };

  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow">
          <Eyebrow>{meta.category}</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            {meta.title}
          </h1>
          <p className="mt-6 text-body-lg text-n-600">{meta.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 text-caption text-n-500">
            <div
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft font-serif italic text-primary"
            >
              {meta.authorInitials}
            </div>
            <span className="text-body-sm font-medium text-ink">{meta.author}</span>
            <span>·</span>
            <span>2 mai 2026</span>
            <span>·</span>
            <span>7 min de lecture</span>
          </div>
        </Container>
      </Section>

      <Container width="narrow">
        <div
          className="aspect-[16/9] w-full rounded-2xl border border-n-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(200,85,61,0.22) 0%, rgba(47,107,94,0.12) 100%)",
          }}
        >
          <div className="flex h-full items-end p-8 sm:p-12">
            <span className="font-serif text-display italic text-primary-ink/40">
              {meta.title.split(" ").slice(0, 3).join(" ")}
            </span>
          </div>
        </div>
      </Container>

      <Section className="bg-paper">
        <Container width="narrow">
          <article className="prose prose-lg max-w-none text-n-700 prose-headings:text-ink prose-headings:font-medium prose-strong:text-ink prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-ink prose-blockquote:font-serif prose-a:text-primary">
            <p>
              On a longtemps pensé qu'un objet livré en deux heures était
              le summum du progrès. Or, depuis trois ans, plusieurs études
              montrent que la livraison express a surtout déplacé un coût :
              des camions en surnombre, des emplois précaires, et des
              centres-villes qui se vident de leurs commerces de
              proximité.
            </p>
            <p>
              MyStreet est née d'un constat simple : à 800 mètres de chez
              vous, quelqu'un possède l'objet que vous cherchez. Le problème
              n'est pas la disponibilité. C'est la mise en relation.
            </p>

            <h2>La distance, comme vertu</h2>
            <p>
              Toutes les marketplaces conventionnelles cherchent à
              <em> effacer </em> la distance. Plus loin, plus vite, plus
              emballé. Notre pari, c'est l'inverse : la distance est ce qui
              transforme une transaction en rencontre.
            </p>

            <blockquote>
              Une vente sur MyStreet ne dure pas trois jours, elle dure
              vingt minutes. Et elle se termine souvent par un café.
            </blockquote>

            <p>
              Ce que la marche apporte n'est pas mesurable en euros. C'est
              un lien faible, un visage reconnu dans le quartier, un signe
              de la main au croisement deux semaines plus tard.
            </p>

            <h2>Trois principes simples</h2>
            <ul>
              <li>Rayon limité à quinze minutes à pied — quinze, pas trente.</li>
              <li>Pas d'expédition ni de point relais.</li>
              <li>Paiement protégé déclenché à la rencontre, jamais avant.</li>
            </ul>

            <p>
              On commence à Lille parce qu'on y vit. La densité y est
              parfaite, les voisins se reconnaissent encore. Si ça
              fonctionne, on avance vers d'autres villes — pas avant.
            </p>
          </article>

          <div className="mt-16 grid gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-n-100 bg-surface p-6 lg:col-span-7">
              <div className="flex items-center gap-4">
                <div
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft font-serif italic text-primary"
                >
                  {meta.authorInitials}
                </div>
                <div>
                  <p className="text-body font-medium text-ink">{meta.author}</p>
                  <p className="text-caption text-n-500">{meta.authorRole}</p>
                </div>
              </div>
              <p className="mt-4 text-body-sm text-n-600">
                Écrit le 2 mai 2026 depuis Lille. Pour réagir,{" "}
                <a href="mailto:bonjour@mystreet.fr" className="text-primary hover:underline">
                  écrivez-nous
                </a>.
              </p>
            </div>
            <div className="rounded-2xl border border-n-100 bg-surface p-6 lg:col-span-5">
              <p className="text-label uppercase tracking-[0.14em] text-n-500">Partager</p>
              <div className="mt-4 flex gap-2">
                <a href="#" aria-label="Partager sur X" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-n-200 bg-paper text-n-700 hover:border-accent hover:text-accent">
                  <AtSign className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Partager" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-n-200 bg-paper text-n-700 hover:border-accent hover:text-accent">
                  <Share2 className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Copier le lien" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-n-200 bg-paper text-n-700 hover:border-accent hover:text-accent">
                  <Link2 className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-t border-divider">
        <Container width="narrow">
          <Eyebrow>Articles similaires</Eyebrow>
          <ul className="mt-8 divide-y divide-n-100 border-y border-n-100">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="flex items-center justify-between py-5 text-body-lg text-ink hover:text-primary"
                >
                  {r.title}
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
