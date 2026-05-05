import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";

export default function MentionsLegalesPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow">
          <Eyebrow>Légal</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Mentions{" "}
            <span className="font-serif italic text-primary">légales.</span>
          </h1>
          <p className="mt-4 text-caption text-n-500">
            Dernière mise à jour : 15 mars 2026
          </p>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container width="narrow">
          <div className="prose prose-lg max-w-none text-n-700 prose-headings:text-ink prose-headings:font-medium prose-strong:text-ink">
            <h2>Éditeur</h2>
            <p>
              MyStreet est en phase pré-lancement. La structure juridique
              d&apos;exploitation est en cours de constitution et sera
              renseignée ici avant l&apos;ouverture du service à Lille en
              septembre 2026 (immatriculation prévue au RCS de Lille Métropole).
            </p>
            <p>
              Conception et développement : studio <strong>Projix</strong>,
              basé à Montréal. Direction du projet : Fethi, à Lille.
            </p>

            <h2>Directeur de la publication</h2>
            <p>Fethi, fondateur de MyStreet.</p>

            <h2>Hébergeur</h2>
            <p>
              <strong>Vercel Inc.</strong><br />
              440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.<br />
              Téléphone : +1 559 288 7060.<br />
              Site web : vercel.com.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question relative au site, vous pouvez écrire à{" "}
              <a href="mailto:hello@mystreet.fr">hello@mystreet.fr</a>.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments composant le site mystreet.fr
              (textes, graphismes, logo, photographies, marque, code source)
              est la propriété exclusive de MyStreet ou de ses partenaires.
              Toute reproduction, représentation, modification ou
              exploitation, partielle ou totale, sans autorisation écrite
              préalable, est interdite et constitue une contrefaçon
              sanctionnée par les articles L335-2 et suivants du Code de la
              propriété intellectuelle.
            </p>

            <h2>Médiation de la consommation</h2>
            <p>
              Conformément aux articles L611-1 et suivants du Code de la
              consommation, l&apos;Utilisateur consommateur pourra recourir
              gratuitement au médiateur de la consommation référencé sur
              mystreet.fr/help dès l&apos;ouverture du service.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
