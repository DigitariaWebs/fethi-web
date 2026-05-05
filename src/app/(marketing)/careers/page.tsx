import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";

const values = [
  { title: "Faire moins, mieux", body: "On préfère lancer une fonctionnalité utile à dix mille voisins qu'expédier dix gadgets à un million." },
  { title: "Lille comme terrain", body: "On est sur le terrain, pas devant un Looker. Le produit se conçoit dans les rues qu'on observe." },
  { title: "Sobriété & autonomie", body: "Pas de comité à six étages. Chacun décide, défend et apprend." },
  { title: "Dire la vérité tôt", body: "Aux voisins, à l'équipe, aux investisseurs. Le coût d'un mensonge poli est toujours plus élevé qu'on ne le pense." },
];

const positions = [
  { slug: "senior-backend-engineer", title: "Senior Backend Engineer", team: "Tech", location: "Lille / Remote-FR", seniority: "Senior" },
  { slug: "product-designer", title: "Product Designer", team: "Product", location: "Lille", seniority: "Mid–Senior" },
  { slug: "community-manager-lille", title: "Community Manager Lille", team: "Community", location: "Lille (terrain)", seniority: "Mid" },
  { slug: "operations-trust", title: "Operations & Trust", team: "Trust & Safety", location: "Lille / Remote-FR", seniority: "Mid" },
  { slug: "ios-engineer", title: "iOS Engineer", team: "Tech", location: "Lille / Remote-FR", seniority: "Senior" },
];

export default function CareersPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <Eyebrow className="justify-center">Carrières</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Construire MyStreet,{" "}
            <span className="font-serif italic text-primary">depuis Lille.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-n-600">
            On est une petite équipe avec un parti-pris fort : la
            marketplace doit faire rencontrer les voisins, pas les éloigner.
            Si ça vous parle, lisez la suite.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container width="narrow">
          <Eyebrow>Notre mission</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink sm:text-display">
            Faire des marketplaces{" "}
            <span className="font-serif italic text-primary">un outil de rue.</span>
          </h2>
          <p className="mt-6 text-body-lg text-n-600">
            On veut prouver qu'une marketplace peut renforcer le quartier
            au lieu de le remplacer par des entrepôts. Cela passe par un
            produit sobre, une équipe lucide, et une obsession du terrain.
          </p>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container>
          <Eyebrow>Nos valeurs</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink sm:text-display">
            Comment on travaille,{" "}
            <span className="font-serif italic text-primary">en quatre points.</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-n-100 bg-surface p-6">
                <h3 className="text-h3 font-medium text-ink">{v.title}</h3>
                <p className="mt-2 text-body-sm text-n-600">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container>
          <Eyebrow>Postes ouverts</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink sm:text-display">
            Cinq rôles,{" "}
            <span className="font-serif italic text-primary">une équipe.</span>
          </h2>
          <ul className="mt-10 divide-y divide-n-100 overflow-hidden rounded-2xl border border-n-100 bg-paper">
            {positions.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/careers/${p.slug}`}
                  className="flex flex-col gap-3 p-6 transition-colors hover:bg-n-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="text-h3 font-medium text-ink">{p.title}</h3>
                    <p className="mt-1 text-body-sm text-n-500">{p.team}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Pill tone="neutral">{p.location}</Pill>
                    <Pill tone="accent">{p.seniority}</Pill>
                    <span className="text-n-400 hidden sm:inline">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <h2 className="text-display tracking-tight text-ink">
            Vous ne trouvez pas votre rôle ?{" "}
            <span className="font-serif italic text-primary">Écrivez-nous.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="mailto:hello@mystreet.fr" size="lg">hello@mystreet.fr</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
