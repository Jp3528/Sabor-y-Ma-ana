"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % testimonials.length), 5500);
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[active];
  const change = (direction: number) => setActive((index) => (index + direction + testimonials.length) % testimonials.length);

  return (
    <section className="restaurant-section testimonials-section">
      <div className="restaurant-shell testimonials-layout">
        <div className="testimonial-heading-wrap">
          <SectionHeading eyebrow="Lo dicen nuestros clientes" title="Momentos que saben bien" copy="Una mesa compartida, un buen café y esas ganas de volver." />
          <div className="testimonial-controls"><button type="button" onClick={() => change(-1)} aria-label="Testimonio anterior"><ArrowLeft /></button><button type="button" onClick={() => change(1)} aria-label="Siguiente testimonio"><ArrowRight /></button></div>
        </div>
        <div className="testimonial-stage">
          <Quote className="quote-mark" />
          <AnimatePresence mode="wait">
            <motion.article key={testimonial.id} initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -35 }} transition={{ duration: 0.38 }}>
              <div className="testimonial-stars">{Array.from({ length: testimonial.rating }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
              <blockquote>“{testimonial.comment}”</blockquote>
              <footer><span>{testimonial.avatar}</span><div><strong>{testimonial.name}</strong><small>{testimonial.role}</small></div></footer>
            </motion.article>
          </AnimatePresence>
          <div className="testimonial-dots">{testimonials.map((item, index) => <button key={item.id} className={active === index ? "active" : ""} type="button" onClick={() => setActive(index)} aria-label={`Ver testimonio ${index + 1}`} />)}</div>
        </div>
      </div>
    </section>
  );
}
