import Link from "next/link";

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 py-20">
      <div className="mx-auto w-full max-w-xl text-center">
        <p className="text-label uppercase tracking-[0.16em] text-n-500">
          Maintenance
        </p>
        <h1 className="mt-6 font-serif text-display-xl italic text-primary">
          On répare une rue.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-body-lg text-n-600">
          MyStreet est temporairement indisponible. On profite de ce
          moment calme pour améliorer le service. Tout devrait revenir à
          la normale dans les minutes ou heures qui viennent.
        </p>
        <p className="mx-auto mt-4 max-w-md text-body text-n-500">
          Suivez-nous sur{" "}
          <Link
            href="https://twitter.com/mystreetfr"
            className="font-medium text-primary hover:underline"
          >
            X (@mystreetfr)
          </Link>{" "}
          pour les mises à jour en direct.
        </p>

        <p className="mt-10 text-caption text-n-500">
          Vous pouvez nous écrire à{" "}
          <a href="mailto:support@mystreet.fr" className="text-primary hover:underline">
            support@mystreet.fr
          </a>{" "}
          si vous avez une question urgente.
        </p>
      </div>
    </main>
  );
}
