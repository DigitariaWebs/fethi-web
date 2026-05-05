import { Container, Section, Eyebrow } from "@/components/marketing/shell/Container";

const cookies = [
  { name: "ms_session", purpose: "Authentification et session utilisateur", duration: "30 jours", type: "Strictement nécessaire" },
  { name: "ms_csrf", purpose: "Protection contre les attaques CSRF", duration: "Session", type: "Strictement nécessaire" },
  { name: "ms_consent", purpose: "Mémorisation de vos préférences cookies", duration: "13 mois", type: "Strictement nécessaire" },
  { name: "ms_locale", purpose: "Langue d'affichage", duration: "1 an", type: "Préférences" },
  { name: "ms_analytics", purpose: "Statistiques d'usage anonymisées (Plausible)", duration: "Session", type: "Mesure d'audience" },
];

export default function CookiesPage() {
  return (
    <>
      <Section className="bg-paper">
        <Container width="narrow">
          <Eyebrow>Légal</Eyebrow>
          <h1 className="mt-6 text-display tracking-tight text-ink sm:text-display-xl">
            Politique{" "}
            <span className="font-serif italic text-primary">cookies.</span>
          </h1>
          <p className="mt-4 text-caption text-n-500">
            Dernière mise à jour : 15 mars 2026
          </p>
        </Container>
      </Section>

      <Section className="bg-surface border-y border-divider">
        <Container width="narrow">
          <div className="prose prose-lg max-w-none text-n-700 prose-headings:text-ink prose-headings:font-medium prose-strong:text-ink">
            <h2>Que sont les cookies</h2>
            <p>
              Les cookies sont de petits fichiers texte déposés sur votre
              appareil quand vous visitez un site web. Ils permettent
              notamment à MyStreet de vous identifier, mémoriser vos
              préférences et mesurer l'usage du service.
            </p>
            <p>
              Conformément aux recommandations de la CNIL, MyStreet ne
              dépose aucun cookie non essentiel sans votre consentement
              explicite, recueilli au premier passage.
            </p>

            <h2>Cookies que nous utilisons</h2>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-n-100 bg-surface">
            <table className="w-full text-left">
              <thead className="border-b border-n-100 bg-n-50">
                <tr>
                  <th className="px-5 py-3 text-label uppercase tracking-[0.12em] text-n-500">Nom</th>
                  <th className="px-5 py-3 text-label uppercase tracking-[0.12em] text-n-500">Finalité</th>
                  <th className="px-5 py-3 text-label uppercase tracking-[0.12em] text-n-500">Durée</th>
                  <th className="px-5 py-3 text-label uppercase tracking-[0.12em] text-n-500">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-n-100">
                {cookies.map((c) => (
                  <tr key={c.name}>
                    <td className="px-5 py-3 font-mono text-body-sm text-primary-ink">{c.name}</td>
                    <td className="px-5 py-3 text-body-sm text-n-700">{c.purpose}</td>
                    <td className="px-5 py-3 text-body-sm text-n-700">{c.duration}</td>
                    <td className="px-5 py-3 text-body-sm text-n-500">{c.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose prose-lg mt-10 max-w-none text-n-700 prose-headings:text-ink prose-headings:font-medium prose-strong:text-ink">
            <h2>Vos préférences</h2>
            <p>
              Vous pouvez modifier vos préférences à tout moment depuis le
              lien Cookies en pied de page ou directement dans les
              paramètres de votre compte. Le retrait du consentement est
              aussi simple que le don : un clic suffit.
            </p>

            <h2>Cookies tiers</h2>
            <p>
              MyStreet n'utilise aucun cookie publicitaire. Les seuls
              services tiers concernés sont Plausible (mesure d'audience
              anonymisée, sans empreinte) et Stripe (paiement, uniquement
              sur les pages de paiement). Aucun de ces cookies ne nous sert
              à vous suivre hors de notre plateforme.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
