import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Logo y descripción */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
              FinTrack
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Controla tus finanzas desde WhatsApp con la ayuda de IA avanzada.
            </p>
          </div>

          {/* Columna 2: Producto */}
          <div>
            <h4 className="text-lg font-bold mb-4">Producto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#hero" className="hover:text-primary transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition">
                  Características
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary transition">
                  Precios
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Empresa */}
          <div>
            <h4 className="text-lg font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Carrera
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Prensa
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
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
                href="#"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition duration-300 text-xl"
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
