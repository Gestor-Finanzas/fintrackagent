import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import LinkFooter from "./LinkFooter";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Logo y descripción */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src="/assets/logo.png" alt="Logo" className="w-6 h-6 md:w-7 md:h-7 object-contain mr-1" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FinTrack
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Controla tus finanzas desde WhatsApp con la ayuda de IA avanzada.
            </p>
          </div>

          {/* Columna 2: Producto */}
          <div>
            <h4 className="text-lg font-bold mb-4">Producto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <LinkFooter to="/#hero" className="hover:text-primary transition">
                  Inicio
                </LinkFooter>
              </li>
              <li>
                <LinkFooter to="/#features" className="hover:text-primary transition">
                  Características
                </LinkFooter>
              </li>
              <li>
                <LinkFooter to="/#workflow" className="hover:text-primary transition">
                  Cómo funciona
                </LinkFooter>
              </li>
              <li>
                <LinkFooter to="/#pricing" className="hover:text-primary transition">
                  Planes
                </LinkFooter>
              </li>
            </ul>
          </div>

          {/* Columna 3: Empresa */}
          <div>
            <h4 className="text-lg font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/empresa" className="hover:text-primary transition">
                  Empresa
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-primary transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/contacto" className="hover:text-primary transition">
                  Contacto
                </a>
              </li>
              <li>
                <a href="/sobre-nosotros" className="hover:text-primary transition">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/privacidad" className="hover:text-primary transition">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos" className="hover:text-primary transition">
                  Términos
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-primary transition">
                  Cookies
                </a>
              </li>
              <li>
                <a href="/seguridad" className="hover:text-primary transition">
                  Seguridad
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2026 FinTrack Agent. Todos los derechos reservados.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-6 mt-6 md:mt-0">
              <a
                href="/#hero"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="/#hero"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="/#hero"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="/#hero"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
