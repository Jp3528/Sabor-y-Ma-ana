"use client";

import { AnimatePresence, motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import { products } from "../data/menu";
import type { MenuFilter, Product } from "../types";
import { MenuCard } from "./MenuCard";
import { SectionHeading } from "./SectionHeading";

const filters: { id: MenuFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "desayunos", label: "Desayunos" },
  { id: "almuerzos", label: "Almuerzos" },
  { id: "bebidas", label: "Bebidas" },
  { id: "postres", label: "Postres" },
];

interface MenuProps {
  activeFilter: MenuFilter;
  onFilterChange: (filter: MenuFilter) => void;
  loading: boolean;
  favorites: Set<string>;
  onFavorite: (id: string) => void;
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function MenuSection({ activeFilter, onFilterChange, loading, favorites, onFavorite, onOpenProduct, onQuickAdd }: MenuProps) {
  const filteredProducts = activeFilter === "todos" ? products : products.filter((product) => product.category === activeFilter);

  return (
    <section className="restaurant-section menu-section" id="menu">
      <div className="restaurant-shell">
        <SectionHeading eyebrow="Favoritos del barrio" title="Los favoritos de nuestros clientes" copy="Recetas hechas al momento con ingredientes que elegimos cada mañana." />
        <div className="menu-toolbar" role="group" aria-label="Filtrar menú">
          {filters.map((filter) => (
            <button className={activeFilter === filter.id ? "active" : ""} type="button" key={filter.id} onClick={() => onFilterChange(filter.id)}>
              {activeFilter === filter.id && <motion.span layoutId="active-filter" />}
              <em>{filter.label}</em>
            </button>
          ))}
        </div>
        {loading ? (
          <div className="menu-grid" aria-label="Cargando menú">
            {Array.from({ length: 8 }).map((_, index) => <div className="menu-skeleton" key={index}><span /><i /><i /><b /></div>)}
          </div>
        ) : (
          <motion.div className="menu-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <MenuCard key={product.id} product={product} favorite={favorites.has(product.id)} onFavorite={() => onFavorite(product.id)} onOpen={() => onOpenProduct(product)} onAdd={() => onQuickAdd(product)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        {!loading && filteredProducts.length === 0 && <div className="menu-empty"><UtensilsCrossed /><h3>Pronto habrá algo delicioso aquí</h3><p>Estamos terminando de preparar esta parte del menú.</p></div>}
      </div>
    </section>
  );
}
