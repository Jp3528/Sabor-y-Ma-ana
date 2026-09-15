"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { CartItem, MenuFilter, Product } from "../types";
import { About } from "./About";
import { CartDrawer } from "./CartDrawer";
import { Categories } from "./Categories";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Location } from "./Location";
import { MenuSection } from "./Menu";
import { Navbar } from "./Navbar";
import { ProductModal } from "./ProductModal";
import { Promotion } from "./Promotion";
import { Reservation } from "./Reservation";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { Toast } from "./Toast";

export function RestaurantApp() {
  const [activeFilter, setActiveFilter] = useState<MenuFilter>("todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToCart = (product: Product, quantity = 1, notes = "") => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes } : item);
      return [...current, { product, quantity, notes }];
    });
    setToast(`${product.name} agregado al pedido.`);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((current) => current.flatMap((item) => {
      if (item.product.id !== id) return [item];
      const quantity = item.quantity + delta;
      return quantity > 0 ? [{ ...item, quantity }] : [];
    }));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const continueOrder = () => {
    const summary = cart.map((item) => `${item.quantity}× ${item.product.name}`).join(", ");
    window.open(`https://wa.me/51999123456?text=${encodeURIComponent(`Hola, quisiera confirmar mi pedido: ${summary}`)}`, "_blank", "noopener,noreferrer");
    setToast("Tu pedido está listo para confirmar por WhatsApp.");
    setCartOpen(false);
  };

  return (
    <main className="restaurant-app">
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <Categories onSelect={setActiveFilter} />
      <MenuSection activeFilter={activeFilter} onFilterChange={setActiveFilter} loading={loading} favorites={favorites} onFavorite={toggleFavorite} onOpenProduct={setSelectedProduct} onQuickAdd={(product) => addToCart(product)} />
      <Promotion />
      <About />
      <Stats />
      <Testimonials />
      <Reservation />
      <Location />
      <Footer />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQuantity={updateQuantity} onRemove={(id) => setCart((current) => current.filter((item) => item.product.id !== id))} onContinue={continueOrder} />
      <Toast message={toast} />
      <motion.a className="whatsapp-button" href="https://wa.me/51999123456" target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp" title="WhatsApp" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}><MessageCircle /></motion.a>
    </main>
  );
}
