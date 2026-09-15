"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CartItem } from "../types";

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onContinue: () => void;
}

export function CartDrawer({ open, items, onClose, onQuantity, onRemove, onContinue }: CartDrawerProps) {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 5.9 : 0;
  const total = subtotal + delivery;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cart-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Mi pedido" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 330, damping: 34 }} onMouseDown={(event) => event.stopPropagation()}>
            <header className="cart-header"><div><span>Tu selección</span><h2>Mi pedido</h2></div><button type="button" onClick={onClose} aria-label="Cerrar carrito"><X /></button></header>
            {items.length === 0 ? (
              <div className="empty-cart"><span><ShoppingBag size={32} /></span><h3>Tu carrito está esperando algo delicioso.</h3><p>Explora nuestros favoritos y agrega el primero.</p><button className="primary-button" type="button" onClick={onClose}>Ver el menú</button></div>
            ) : (
              <>
                <div className="cart-items">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.article className="cart-item" key={item.product.id} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30, height: 0 }}>
                        <img src={item.product.image} alt="" />
                        <div className="cart-item-copy"><h3>{item.product.name}</h3>{item.notes && <small>{item.notes}</small>}<strong>S/ {(item.product.price * item.quantity).toFixed(2)}</strong><div className="cart-item-actions"><div className="quantity-control compact"><button type="button" onClick={() => onQuantity(item.product.id, -1)} aria-label="Disminuir"><Minus /></button><span>{item.quantity}</span><button type="button" onClick={() => onQuantity(item.product.id, 1)} aria-label="Aumentar"><Plus /></button></div><button className="remove-item" type="button" onClick={() => onRemove(item.product.id)} aria-label={`Eliminar ${item.product.name}`} title="Eliminar"><Trash2 /></button></div></div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="cart-summary"><dl><div><dt>Subtotal</dt><dd>S/ {subtotal.toFixed(2)}</dd></div><div><dt>Delivery</dt><dd>S/ {delivery.toFixed(2)}</dd></div><div className="cart-total"><dt>Total</dt><dd>S/ {total.toFixed(2)}</dd></div></dl><button className="primary-button cart-continue" type="button" onClick={onContinue}>Continuar pedido</button><small>El pedido se confirmará por WhatsApp.</small></div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
