"use client";

import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "../types";

interface MenuCardProps {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
  onAdd: () => void;
}

export function MenuCard({ product, favorite, onFavorite, onOpen, onAdd }: MenuCardProps) {
  return (
    <motion.article className="menu-card" layout initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 12 }} transition={{ duration: 0.32 }}>
      <button className="menu-card-image" type="button" onClick={onOpen} aria-label={`Ver detalle de ${product.name}`}>
        <img src={product.image} alt={product.name} />
        {product.badge && <span className={`food-badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}>{product.badge}</span>}
      </button>
      <button className={`favorite-button ${favorite ? "is-favorite" : ""}`} type="button" onClick={onFavorite} aria-label={favorite ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`} title="Favorito">
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>
      <div className="menu-card-body">
        <span className="menu-category">{product.category}</span>
        <button className="menu-title-button" type="button" onClick={onOpen}><h3>{product.name}</h3></button>
        <p>{product.description}</p>
        <div className="menu-card-footer">
          <strong>S/ {product.price.toFixed(2)}</strong>
          <motion.button type="button" className="add-button" onClick={onAdd} whileTap={{ scale: 0.92 }}><Plus size={17} /> Agregar</motion.button>
        </div>
      </div>
    </motion.article>
  );
}
