import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="restaurant-footer">
      <div className="restaurant-shell footer-layout">
        <div className="footer-about"><a className="restaurant-brand footer-logo" href="#inicio"><span className="brand-seal">S&amp;M</span><span>SABOR <em>&amp;</em> MAÑANA</span></a><p>Desayunos frescos y almuerzos hechos al momento para disfrutar lo cotidiano un poco más.</p><div className="social-links"><a href="#" aria-label="Instagram"><span>IG</span></a><a href="#" aria-label="Facebook"><span>FB</span></a><a href="#" aria-label="TikTok"><span>TT</span></a></div></div>
        <div><strong>Explora</strong><a href="#inicio">Inicio</a><a href="#menu">Menú</a><a href="#nosotros">Nosotros</a><a href="#reservas">Reservas</a><a href="#contacto">Contacto</a></div>
        <div><strong>Horario</strong><span>Lun — Sáb</span><p>7:00 AM — 4:00 PM</p><span>Domingo</span><p>8:00 AM — 2:00 PM</p></div>
        <div><strong>Encuéntranos</strong><a href="tel:+51999123456"><Phone />+51 999 123 456</a><a href="mailto:hola@saborymanana.pe"><Mail />hola@saborymanana.pe</a><span><MapPin />Av. Principal 123, Lima</span></div>
      </div>
      <div className="restaurant-shell footer-bottom"><span>© 2026 SABOR &amp; MAÑANA. Todos los derechos reservados.</span><span>Hecho con ingredientes frescos y mucho cariño.</span></div>
    </footer>
  );
}
