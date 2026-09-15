"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock3, Phone, UserRound, UsersRound } from "lucide-react";
import type { Reservation as ReservationData } from "../types";

const initialReservation: ReservationData = { name: "", phone: "", date: "", time: "", people: "2" };

export function Reservation() {
  const [form, setForm] = useState(initialReservation);
  const [errors, setErrors] = useState<Partial<Record<keyof ReservationData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const update = (field: keyof ReservationData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof ReservationData, string>> = {};
    if (form.name.trim().length < 3) nextErrors.name = "Ingresa tu nombre completo.";
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) nextErrors.phone = "Ingresa un teléfono válido.";
    if (!form.date) nextErrors.date = "Selecciona una fecha.";
    if (!form.time) nextErrors.time = "Selecciona una hora.";
    if (!form.people) nextErrors.people = "Indica el número de personas.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted(true);
    setForm(initialReservation);
    window.setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="reservation-section" id="reservas">
      <div className="restaurant-shell reservation-layout">
        <motion.div className="reservation-intro" initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }}>
          <p className="restaurant-eyebrow">Tu mesa te espera</p><h2>Reserva tu mesa</h2><p>Planea una mañana tranquila o ese almuerzo que tienes pendiente. Nosotros nos encargamos del resto.</p><div className="reservation-note"><Clock3 /><div><strong>Respuesta inmediata</strong><span>Confirmación simulada en esta versión.</span></div></div>
        </motion.div>
        <motion.form className="reservation-form" onSubmit={handleSubmit} noValidate initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
          <div className={`form-field ${errors.name ? "has-error" : ""}`}><label htmlFor="reservation-name">Nombre</label><span><UserRound /><input id="reservation-name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Tu nombre completo" /></span>{errors.name && <small>{errors.name}</small>}</div>
          <div className={`form-field ${errors.phone ? "has-error" : ""}`}><label htmlFor="reservation-phone">Teléfono</label><span><Phone /><input id="reservation-phone" value={form.phone} onChange={(event) => update("phone", event.target.value)} inputMode="tel" placeholder="999 999 999" /></span>{errors.phone && <small>{errors.phone}</small>}</div>
          <div className={`form-field ${errors.date ? "has-error" : ""}`}><label htmlFor="reservation-date">Fecha</label><span><CalendarDays /><input id="reservation-date" type="date" min={minDate} value={form.date} onChange={(event) => update("date", event.target.value)} /></span>{errors.date && <small>{errors.date}</small>}</div>
          <div className={`form-field ${errors.time ? "has-error" : ""}`}><label htmlFor="reservation-time">Hora</label><span><Clock3 /><select id="reservation-time" value={form.time} onChange={(event) => update("time", event.target.value)}><option value="">Seleccionar</option><option>08:00 AM</option><option>09:30 AM</option><option>11:00 AM</option><option>12:30 PM</option><option>02:00 PM</option><option>03:30 PM</option></select></span>{errors.time && <small>{errors.time}</small>}</div>
          <div className={`form-field full-field ${errors.people ? "has-error" : ""}`}><label htmlFor="reservation-people">Número de personas</label><span><UsersRound /><select id="reservation-people" value={form.people} onChange={(event) => update("people", event.target.value)}>{[1, 2, 3, 4, 5, 6, 7, 8].map((people) => <option value={people} key={people}>{people} {people === 1 ? "persona" : "personas"}</option>)}</select></span>{errors.people && <small>{errors.people}</small>}</div>
          <motion.button className="terracotta-button full-field" type="submit" whileTap={{ scale: 0.98 }}>Confirmar reserva</motion.button>
          <AnimatePresence>{submitted && <motion.div className="reservation-success full-field" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status"><CheckCircle2 /><div><strong>¡Reserva registrada!</strong><span>Te esperamos para compartir algo delicioso.</span></div></motion.div>}</AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
