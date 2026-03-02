import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ onAuthClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navegación inteligente: si no estamos en la landing, redirige y luego scroll
  const handleNav = (anchor) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${anchor}` === "/#hero" ? "/" : `/${anchor}`);
      setTimeout(() => {
        const el = document.getElementById(anchor.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(anchor.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = anchor;
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        <img src="/assets/logo2.png" alt="Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain" style={{ marginRight: 4 }} />
        FinTrack
      </h1>

      {/* Menú desktop */}
      <ul className="hidden lg:flex items-center gap-8 text-secondary font-medium">
        <li>
          <a href="#hero" className="hover:text-primary transition duration-300" onClick={handleNav("#hero")}>Inicio</a>
        </li>
        <li>
          <a href="#features" className="hover:text-primary transition duration-300" onClick={handleNav("#features")}>Características</a>
        </li>
        <li>
          <a href="#workflow" className="hover:text-primary transition duration-300" onClick={handleNav("#workflow")}>Cómo Funciona</a>
        </li>
        <li>
          <a href="#pricing" className="hover:text-primary transition duration-300" onClick={handleNav("#pricing")}>Planes</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-primary transition duration-300" onClick={handleNav("#contact")}>Contacto</a>
        </li>
        <li>
          <button
            onClick={onAuthClick}
            className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-110 hover:shadow-xl-glow hover:brightness-110 cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </li>
      </ul>

      {/* Menú móvil */}
      <button
        className="lg:hidden text-secondary text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 bg-white shadow-lg flex flex-col gap-4 p-6 lg:hidden">
          <li>
            <a href="#hero" className="hover:text-primary transition" onClick={handleNav("#hero")}>Inicio</a>
          </li>
          <li>
            <a href="#features" className="hover:text-primary transition" onClick={handleNav("#features")}>Características</a>
          </li>
          <li>
            <a href="#workflow" className="hover:text-primary transition" onClick={handleNav("#workflow")}>Cómo Funciona</a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-primary transition" onClick={handleNav("#pricing")}>Planes</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-primary transition" onClick={handleNav("#contact")}>Contacto</a>
          </li>
          <li>
            <button
              onClick={onAuthClick}
              className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-lg block text-center font-semibold transition duration-300 transform hover:scale-105 hover:shadow-xl-glow hover:brightness-110 cursor-pointer w-full"
            >
              Iniciar Sesión
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
