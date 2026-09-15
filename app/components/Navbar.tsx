"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menú", href: "#menu" },
  { label: "Desayunos", href: "#categorias" },
  { label: "Almuerzos", href: "#menu" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 36));

  return (
    <motion.header
      className={`restaurant-header ${scrolled ? "is-scrolled" : ""}`}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="restaurant-brand" href="#inicio" aria-label="Sabor y Mañana, inicio">
        <span className="brand-seal">S&amp;M</span>
        <span>SABOR <em>&amp;</em> MAÑANA</span>
      </a>
      <nav className="restaurant-nav" aria-label="Navegación principal">
        {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
      </nav>
      <div className="restaurant-actions">
        <motion.button
          className="cart-icon-button"
          type="button"
          aria-label={`Abrir carrito, ${cartCount} productos`}
          onClick={onOpenCart}
          whileTap={{ scale: 0.92 }}
          title="Ver mi pedido"
        >
          <ShoppingBag size={19} />
          <AnimatePresence mode="popLayout">
            <motion.span key={cartCount} initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>{cartCount}</motion.span>
          </AnimatePresence>
        </motion.button>
        <a className="primary-button header-reservation" href="#reservas">Reservar mesa</a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            aria-label="Navegación móvil"
          >
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
            ))}
            <a className="primary-button" href="#reservas" onClick={() => setMobileMenuOpen(false)}>Reservar mesa</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
