import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import LinkFooter from "./LinkFooter";

export default function Footer() {
  const producto = [
    { to: "/#hero", label: "Inicio" },
    { to: "/#features", label: "Características" },
    { to: "/#workflow", label: "Cómo funciona" },
    { to: "/#pricing", label: "Planes" },
  ];
  const empresa = [
    { to: "/empresa", label: "Empresa" },
    { to: "/faqs", label: "FAQs" },
    { to: "/contacto", label: "Contacto" },
    { to: "/sobre-nosotros", label: "Sobre nosotros" },
  ];
  const legal = [
    { to: "/privacidad", label: "Privacidad" },
    { to: "/terminos", label: "Términos" },
    { to: "/cookies", label: "Cookies" },
    { to: "/seguridad", label: "Seguridad" },
  ];

  return (
    <footer className="bg-dark py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-10 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/logo2.png"
                alt="FinTrack"
                className="w-7 h-7 object-contain"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                FinTrack
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Tu gestión financiera desde WhatsApp, con la ayuda de
              inteligencia artificial.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Producto
            </h4>
            <ul className="space-y-3">
              {producto.map((l) => (
                <li key={l.to}>
                  <LinkFooter
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </LinkFooter>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Empresa
            </h4>
            <ul className="space-y-3">
              {empresa.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 FinTrack Agent. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            <a
              href="/#hero"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="/#hero"
              aria-label="Twitter"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="/#hero"
              aria-label="Instagram"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
