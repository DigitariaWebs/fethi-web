"use client";

import { motion } from "motion/react";
import { neighborhoods } from "@/lib/fixtures/neighborhoods";
import { Container, Section, Eyebrow } from "../shell/Container";

const stats = [
  { id: "vieux-lille", count: 218, status: "live" },
  { id: "wazemmes", count: 182, status: "live" },
  { id: "vauban", count: 158, status: "live" },
  { id: "moulins", count: 144, status: "live" },
  { id: "saint-maurice", count: 122, status: "live" },
  { id: "bois-blancs", count: 118, status: "soon" },
  { id: "lille-sud", count: 110, status: "soon" },
  { id: "fives", count: 104, status: "soon" },
];

export function Neighborhoods() {
  return (
    <Section className="bg-paper">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Conçu pour Lille</Eyebrow>
            <h2 className="mt-4 text-display tracking-[-0.02em] text-ink">
              On part du{" "}
              <span className="font-serif italic text-primary">Vieux-Lille</span>,
              <br />
              on déborde lentement.
            </h2>
            <p className="mt-4 max-w-md text-body-lg text-n-600">
              MyStreet ouvre quartier par quartier. On ne croit pas à la
              marketplace globale qui crée trois cents kilomètres de logistique pour
              une perceuse à dix euros.
            </p>
            <p className="mt-3 max-w-md text-body text-n-500">
              Lancement intra-muros en septembre 2026. Hellemmes et Lomme
              suivent dans la foulée. Roubaix, Tourcoing et Villeneuve-d&apos;Ascq
              en 2027.
            </p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              {neighborhoods.map((n, i) => {
                const s = stats.find((x) => x.id === n.id);
                const live = s?.status === "live";
                return (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                    className="rounded-md border border-n-100 bg-surface p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-body font-medium text-ink">{n.name}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${live ? "bg-success-soft text-success" : "bg-n-100 text-n-500"}`}
                      >
                        <span className={`h-1 w-1 rounded-full ${live ? "bg-success" : "bg-n-400"}`} />
                        {live ? "Actif" : "Bientôt"}
                      </span>
                    </div>
                    <p className="mt-2 text-caption text-n-500 tabular">
                      {s?.count ?? 0} annonces · {Math.round((s?.count ?? 0) * 4)} habitants
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
