"use client";

import { motion } from "motion/react";
import { Container, Section, Eyebrow } from "../shell/Container";

const voices = [
  {
    quote:
      "J'ai vendu mon vélo en quarante minutes à une dame de la rue Royale. On a pris un café après.",
    name: "Marie L.",
    where: "Vieux-Lille",
  },
  {
    quote:
      "Pour un louage de perceuse, c'est imbattable. Mon voisin me la dépose à la sortie du métro.",
    name: "Camille B.",
    where: "Wazemmes",
  },
  {
    quote:
      "On y trouve les vêtements de bébé qu'on échangerait sinon entre amis. Sauf qu'ici les amis, on les rencontre.",
    name: "Léa M.",
    where: "Vauban",
  },
];

export function Voices() {
  return (
    <Section className="bg-surface border-y border-divider">
      <Container>
        <Eyebrow>Premières voix</Eyebrow>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {voices.map((v, i) => (
            <motion.figure
              key={v.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="rounded-xl border border-n-100 bg-paper p-6"
            >
              <span className="font-serif text-display italic text-primary leading-none">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-body-lg text-ink leading-relaxed">
                {v.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-2 text-caption text-n-500">
                <span className="h-px w-6 bg-n-300" />
                {v.name} · {v.where}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
