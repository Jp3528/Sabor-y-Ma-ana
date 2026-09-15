import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Promotion() {
  return (
    <section className="restaurant-section promotion-section">
      <motion.div className="restaurant-shell promotion-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
        <div className="promotion-copy"><span className="promo-pill">Mañanas felices</span><h2>Tu desayuno favorito, ahora con <em>20% de descuento</em></h2><p>De lunes a viernes hasta las 10:00 AM.</p><a className="light-button" href="#menu">Ver promoción <ArrowRight size={17} /></a></div>
        <div className="promotion-image"><img src="/promotion.webp" alt="Desayuno servido con café y frutas" /><span>−20%</span></div>
      </motion.div>
    </section>
  );
}
