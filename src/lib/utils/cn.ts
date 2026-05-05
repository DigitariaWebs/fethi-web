import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about our custom font-size names so they don't collide
// with text-color classes. Without this, `cn("text-white", "text-body")` would
// drop one of them — most often the color, which is why some buttons rendered
// with dark inherited body text on a terracotta fill.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display",
            "h1",
            "h2",
            "h3",
            "body-lg",
            "body",
            "body-sm",
            "caption",
            "label",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
