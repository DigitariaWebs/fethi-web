import { Wrench, Refrigerator, Music, Tent, Bike, ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";
import { Button } from "@/components/ui/Button";

const categories = [
  { icon: Wrench, title: "Outils", body: "Perceuse, ponceuse, tronçonneuse, escabeau. Ce qu'on utilise deux fois par an." },
  { icon: Refrigerator, title: "Électroménager", body: "Yaourtière, machine à pâtes, gaufrier — pour tester sans acheter." },
  { icon: Music, title: "Loisirs", body: "Guitare, raquette de paddle, télescope, lecteur vinyle." },
  { icon: Tent, title: "Évènement", body: "Tente, table pliante, chaises de jardin, sono portable, percolateur." },
  { icon: Bike, title: "Vélo", body: "Vélo cargo, remorque enfant, VAE — à la journée ou au week-end." },
];

const steps = [
  { n: "01", title: "Réservez", body: "Choisissez les dates. Le voisin valide en moins d'une heure." },
  { n: "02", title: "Récupérez", body: "Dix minutes à pied, photos d'état des lieux dans l'app." },
  { n: "03", title: "Rendez", body: "Au jour prévu. La caution est libérée si tout va bien." },
];

const safety = [
  "Caution bloquée automatiquement, libérée à la restitution.",
  "État des lieux photo avant/après directement dans l'app.",
  "Assurance casse incluse jusqu'à 1 500 € sur les locations vérifiées.",
  "Litige tranché par notre équipe sous 48 h, week-ends compris.",
];

export default function RentalsPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <Eyebrow className="justify-center">Locations entre voisins</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Plutôt qu'acheter,{" "}
            <span className="font-serif italic text-primary">emprunter.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-body-lg text-n-600">
            Une perceuse à 80 € pour deux trous par an, c'est absurde.
            MyStreet vous permet d'emprunter ce que votre voisin n'utilise
            pas, à pied, sans caution liquide.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/#waitlist" size="lg">
              Rejoindre la liste
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container>
          <Eyebrow>Catégories</Eyebrow>
          <h2 className="mt-6 text-h1 tracking-tight text-ink sm:text-display">
            Cinq catégories,{" "}
            <span className="font-serif italic text-primary">déjà testées.</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="rounded-xl border border-n-100 bg-paper p-6">
                  <Icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 text-h3 font-medium text-ink">{c.title}</h3>
                  <p className="mt-2 text-body-sm text-n-600">{c.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow>Comment ça marche</Eyebrow>
              <h2 className="mt-6 text-h1 tracking-tight text-ink">
                Réserver. Récupérer.{" "}
                <span className="font-serif italic text-primary">Rendre.</span>
              </h2>
            </div>
            <div className="grid gap-6 lg:col-span-8 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="rounded-xl border border-n-100 bg-surface p-6">
                  <span className="font-serif text-h1 italic text-primary">{s.n}</span>
                  <h3 className="mt-4 text-h3 font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-body-sm text-n-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container width="narrow">
          <ShieldCheck className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-h1 tracking-tight text-ink sm:text-display">
            Assurance &{" "}
            <span className="font-serif italic text-primary">tranquillité.</span>
          </h2>
          <ul className="mt-8 space-y-3">
            {safety.map((s) => (
              <li key={s} className="flex gap-3 text-body text-n-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-paper">
        <Container width="narrow" className="text-center">
          <h2 className="text-display tracking-tight text-ink">
            Moins de placards encombrés.{" "}
            <span className="font-serif italic text-primary">Plus de voisins.</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/#waitlist" size="lg">
              Rejoindre la liste
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
