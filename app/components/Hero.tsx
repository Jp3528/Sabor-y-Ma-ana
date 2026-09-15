"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock3, Star } from "lucide-react";

export function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 44]);

  return (
    <section className="restaurant-hero" id="inicio">
      <div className="hero-copy-block">
        <motion.p className="restaurant-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }}>
          Cocina honesta · Lima
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}>
          Empieza bien tu día. <span>Disfruta mejor</span> tu almuerzo.
        </motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
          Desayunos frescos, almuerzos preparados al momento y sabores que hacen de cada comida una experiencia especial.
        </motion.p>
        <motion.div className="hero-buttons" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.5 }}>
          <a className="primary-button" href="#menu">Ver nuestro menú <ArrowRight size={17} /></a>
          <a className="secondary-button" href="#reservas">Reservar mesa</a>
        </motion.div>
        <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72, duration: 0.5 }}>
          <div className="proof-rating">
            <span className="proof-icon"><Star size={17} fill="currentColor" /></span>
            <div><strong>4.9</strong><small>+500 clientes felices</small></div>
          </div>
          <div className="proof-hours">
            <span className="proof-icon"><Clock3 size={17} /></span>
            <div><strong>Lun — Sáb</strong><small>7:00 AM — 4:00 PM</small></div>
          </div>
        </motion.div>
      </div>

      <motion.div className="hero-photo-wrap" initial={{ opacity: 0, scale: 0.94, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ y: imageY }}>
        <img src="/hero-breakfast.webp" alt="Mesa de desayuno con platos frescos, café y frutas" />
        <motion.div className="floating-note" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}>
          <span>Hecho al momento</span>
          <strong>Ingredientes frescos</strong>
        </motion.div>
        <span className="hero-arch" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
