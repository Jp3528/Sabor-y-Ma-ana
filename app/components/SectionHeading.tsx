import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, copy, align = "left", light = false }: SectionHeadingProps) {
  return (
    <motion.header
      className={`section-heading restaurant-section-heading ${align === "center" ? "align-center" : ""} ${light ? "is-light" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <p className="restaurant-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy && <p>{copy}</p>}
    </motion.header>
  );
}
