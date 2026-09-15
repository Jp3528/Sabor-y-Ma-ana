import { Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function Location() {
  return (
    <section className="restaurant-section location-section" id="contacto">
      <div className="restaurant-shell">
        <SectionHeading eyebrow="Un lugar para volver" title="Visítanos" copy="Estamos cerca, con café caliente desde temprano y almuerzos hasta la tarde." />
        <div className="location-layout">
          <div className="map-placeholder" aria-label="Mapa referencial de Av. Principal 123, Lima"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><span className="map-pin"><MapPin fill="currentColor" /></span><div className="map-label"><strong>SABOR &amp; MAÑANA</strong><small>Av. Principal 123</small></div></div>
          <div className="location-details">
            <article><span><MapPin /></span><div><small>Dirección</small><h3>Av. Principal 123, Lima</h3><p>A una cuadra del parque principal.</p></div></article>
            <article><span><Clock3 /></span><div><small>Horario</small><h3>Lunes a sábado</h3><p>7:00 AM — 4:00 PM</p><h3>Domingo</h3><p>8:00 AM — 2:00 PM</p></div></article>
            <article><span><Phone /></span><div><small>Contacto</small><h3>+51 999 123 456</h3><p>hola@saborymanana.pe</p></div></article>
            <a className="primary-button" href="https://www.google.com/maps/search/?api=1&query=Av.+Principal+123,+Lima" target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
