import { motion } from "framer-motion";
import { Check, HeartHandshake, Leaf, Soup } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  { icon: Leaf, title: "Ingredientes frescos", text: "Elegidos cada mañana de productores locales." },
  { icon: Soup, title: "Preparado al momento", text: "Nada se apura; cada plato sale cuando está listo." },
  { icon: HeartHandshake, title: "Recetas con pasión", text: "Sabor casero, técnica y una presentación cuidada." },
];

export function About() {
  return (
    <section className="restaurant-section about-restaurant" id="nosotros">
      <div className="restaurant-shell about-layout">
        <motion.div className="about-photo-collage" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
          <img className="about-main-photo" src="/kitchen.webp" alt="Cocina del restaurante preparando platos al momento" />
          <img className="about-small-photo" src="/avocado-toast.webp" alt="Tostada con palta recién servida" />
          <div className="about-quality-seal"><Check /><strong>Hecho<br />en casa</strong></div>
        </motion.div>
        <div className="about-restaurant-copy">
          <SectionHeading eyebrow="Nuestra manera de cocinar" title="Cocinamos como en casa" />
          <p className="about-lead">Creemos que una buena comida puede cambiar tu día. Por eso seleccionamos ingredientes frescos y preparamos cada plato al momento.</p>
          <div className="about-features">{features.map(({ icon: Icon, title, text }) => <motion.article key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><span><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div></motion.article>)}</div>
        </div>
      </div>
    </section>
  );
}
