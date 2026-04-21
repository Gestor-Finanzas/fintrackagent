import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ onAuthClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (anchor) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${anchor}` === "/#hero" ? "/" : `/${anchor}`);
      setTimeout(() => {
        const el = document.getElementById(anchor.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(anchor.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = anchor;
    }
    setIsOpen(false);
  };

  const links = [
    { href: "#hero", label: "Inicio" },
    { href: "#features", label: "Características" },
    { href: "#workflow", label: "Cómo funciona" },
    { href: "#pricing", label: "Planes" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50">
      <a href="/" className="flex items-center gap-2.5">
        <img
          src="/assets/logo2.png"
          alt="FinTrack"
          className="w-7 h-7 md:w-8 md:h-8 object-contain"
        />
        <span className="text-xl md:text-2xl font-bold text-dark tracking-tight">
          FinTrack
        </span>
      </a>

      {/* Desktop */}
      <ul className="hidden lg:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={handleNav(l.href)}
              className="text-sm font-medium text-gray-600 hover:text-dark transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={onAuthClick}
            className="bg-dark text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-primary transition-colors duration-200"
          >
            Iniciar sesión
          </button>
        </li>
      </ul>

      {/* Mobile toggle */}
      <button
        className="lg:hidden text-dark text-xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 flex flex-col gap-1 p-4 lg:hidden shadow-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={handleNav(l.href)}
                className="block px-3 py-3 text-sm font-medium text-gray-600 hover:text-dark hover:bg-gray-50 rounded-lg transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <button
              onClick={() => {
                onAuthClick();
                setIsOpen(false);
              }}
              className="w-full bg-dark text-white text-sm px-5 py-3 rounded-xl font-semibold hover:bg-primary transition-colors"
            >
              Iniciar sesión
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
