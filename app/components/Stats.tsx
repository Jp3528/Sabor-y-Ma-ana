"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

interface CounterProps { value: number; suffix?: string; decimals?: number; label: string; }

function Counter({ value, suffix = "", decimals = 0, label }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.35, ease: "easeOut", onUpdate: (latest) => setDisplay(latest) });
    return controls.stop;
  }, [inView, value]);

  return <div ref={ref} className="stat-item"><strong>{decimals ? display.toFixed(decimals) : Math.round(display)}{suffix}</strong><span>{label}</span></div>;
}

export function Stats() {
  return (
    <section className="stats-section">
      <motion.div className="restaurant-shell stats-grid" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <Counter value={500} suffix="+" label="Clientes felices" />
        <Counter value={30} suffix="+" label="Platos" />
        <Counter value={4.9} decimals={1} label="Calificación" />
        <Counter value={5} label="Años compartiendo sabores" />
      </motion.div>
    </section>
  );
}
