import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";

const sections = [
  {
    title: "Bienveillance",
    lead: "Un voisin n'est pas un client anonyme. On se parle comme on se croiserait dans la rue.",
    bullets: [
      "Pas d'insulte, pas de discrimination, pas de remarque déplacée.",
      "On laisse une note honnête mais constructive — jamais blessante.",
      "Si un échange tourne mal, on cesse, on signale, on ne se laisse pas embarquer.",
    ],
  },
  {
    title: "Transparence",
    lead: "Décrire l'objet honnêtement, c'est le minimum pour que la rencontre se passe bien.",
    bullets: [
      "Photos réelles de l'objet, prises par vous, non issues du fabricant.",
      "Mention claire des défauts visibles, taches, rayures, manques.",
      "Prix affiché en € TTC, sans frais cachés ajoutés au moment de la rencontre.",
    ],
  },
  {
    title: "Pas d'objets interdits",
    lead: "Certaines catégories n'ont pas leur place sur MyStreet, sans exception.",
    bullets: [
      "Contrefaçons et copies de marques.",
      "Animaux vivants (vente, dons et adoption).",
      "Médicaments, dispositifs médicaux soumis à prescription.",
      "Armes, munitions, objets dangereux.",
      "Alcool sans licence de revente.",
      "Tabac, cigarettes électroniques avec liquide nicotiné.",
      "Documents officiels, papiers d'identité, permis.",
    ],
  },
  {
    title: "Pas de revente massive",
    lead: "MyStreet est conçue pour les particuliers et petits commerces locaux.",
    bullets: [
      "Si vous vendez plus de 30 articles par mois en Gratuit, l'app vous proposera de passer en Pro.",
      "Le drop-shipping et la revente d'articles achetés sur AliExpress ne sont pas autorisés.",
      "Les comptes multiples créés pour contourner cette règle sont fermés.",
    ],
  },
  {
    title: "Sanctions progressives",
    lead: "On préfère prévenir que punir. Mais on protège les voisins quand il faut.",
    bullets: [
      "1er manquement : avertissement et explication par e-mail.",
      "2e manquement : suspension temporaire du compte (7 à 30 jours).",
      "Manquement grave (fraude, harcèlement, contrefaçon) : bannissement immédiat et signalement aux autorités si nécessaire.",
      "Vous pouvez contester chaque décision en écrivant à support@mystreet.fr — un humain relit, toujours.",
    ],
  },
];

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <Eyebrow className="justify-center">La charte</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Charte de{" "}
            <span className="font-serif italic text-primary">la communauté.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-n-600">
            Cinq principes simples, tenus par chacun. Si tout le monde les
            respecte, MyStreet reste agréable. Si une personne les enfreint,
            elle quitte la communauté.
          </p>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container width="narrow">
          <div className="space-y-16">
            {sections.map((s, i) => (
              <article key={s.title}>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-display italic text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-h1 tracking-tight text-ink">{s.title}</h2>
                </div>
                <p className="mt-4 text-body-lg text-n-600">{s.lead}</p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-body text-n-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container width="narrow">
          <p className="text-caption text-n-500">
            Dernière mise à jour : 15 mars 2026 — Pour signaler un manquement,
            utilisez le bouton Signaler dans l'app ou écrivez à{" "}
            <a href="mailto:support@mystreet.fr" className="text-primary hover:underline">
              support@mystreet.fr
            </a>.
          </p>
        </Container>
      </Section>
    </>
  );
}
