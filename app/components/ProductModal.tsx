"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, X } from "lucide-react";
import type { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (product: Product, quantity: number, notes: string) => void;
}

interface ProductModalContentProps {
  product: Product;
  onClose: () => void;
  onAdd: (product: Product, quantity: number, notes: string) => void;
}

function ProductModalContent({ product, onClose, onAdd }: ProductModalContentProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div className="restaurant-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.section className="product-modal" role="dialog" aria-modal="true" aria-label={`Detalle de ${product.name}`} initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close-button" type="button" onClick={onClose} aria-label="Cerrar detalle"><X /></button>
        <div className="product-modal-image"><img src={product.image} alt={product.name} />{product.badge && <span className="food-badge">{product.badge}</span>}</div>
        <div className="product-modal-content">
          <span className="menu-category">{product.category}</span>
          <h2>{product.name}</h2>
          <p className="product-modal-description">{product.description}</p>
          <strong className="product-modal-price">S/ {product.price.toFixed(2)}</strong>
          <div className="ingredients-block">
            <span>Incluye</span>
            <ul>{product.ingredients.map((ingredient) => <li key={ingredient}><Check size={14} />{ingredient}</li>)}</ul>
          </div>
          <label className="notes-field">
            <span>Observaciones</span>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} maxLength={120} placeholder="Ej. Sin cebolla" />
          </label>
          <div className="product-modal-actions">
            <div className="quantity-control" aria-label="Cantidad">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Disminuir cantidad"><Minus size={17} /></button>
              <strong>{quantity}</strong>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Aumentar cantidad"><Plus size={17} /></button>
            </div>
            <motion.button className="primary-button modal-add-button" type="button" whileTap={{ scale: 0.97 }} onClick={() => { onAdd(product, quantity, notes.trim()); onClose(); }}>
              Agregar al pedido · S/ {(product.price * quantity).toFixed(2)}
            </motion.button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <ProductModalContent key={product.id} product={product} onClose={onClose} onAdd={onAdd} />
      )}
    </AnimatePresence>
  );
}
