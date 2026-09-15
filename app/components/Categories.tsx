"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../data/menu";
import type { MenuFilter } from "../types";
import { SectionHeading } from "./SectionHeading";

interface CategoriesProps {
  onSelect: (filter: MenuFilter) => void;
}

export function Categories({ onSelect }: CategoriesProps) {
  return (
    <section className="restaurant-section categories-section" id="categorias">
      <div className="restaurant-shell">
        <SectionHeading eyebrow="Para cada momento" title="¿Qué se te antoja hoy?" copy="Desde el primer café de la mañana hasta ese postre que te mereces." />
        <motion.div className="category-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          {categories.map((category) => (
            <motion.button
              className="category-card"
              key={category.id}
              variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -7 }}
              onClick={() => {
                onSelect(category.filter);
                document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
            >
              <span className="category-image"><img src={category.image} alt="" /></span>
              <span className="category-copy"><strong>{category.name}</strong><small>{category.description}</small></span>
              <span className="category-arrow"><ArrowUpRight size={17} /></span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
