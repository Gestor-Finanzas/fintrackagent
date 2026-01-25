import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        FinTrack
      </h1>

      {/* Menú desktop */}
      <ul className="hidden md:flex gap-8 text-secondary font-medium">
        <li>
          <a
            href="#hero"
            className="hover:text-primary transition duration-300"
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="#features"
            className="hover:text-primary transition duration-300"
          >
            Características
          </a>
        </li>
        <li>
          <a
            href="#workflow"
            className="hover:text-primary transition duration-300"
          >
            Cómo Funciona
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="hover:text-primary transition duration-300"
          >
            Planes
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="hover:text-primary transition duration-300"
          >
            Contacto
          </a>
        </li>
        <li>
          <a
            href="#signup"
            className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-110 hover:shadow-xl-glow hover:brightness-110"
          >
            Suscribirse
          </a>
        </li>
      </ul>

      {/* Menú móvil */}
      <button
        className="md:hidden text-secondary text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 bg-white shadow-lg flex flex-col gap-4 p-6 md:hidden">
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
            <a href="#workflow" className="hover:text-primary transition">
              Cómo Funciona
            </a>
          </li>
          <li>
            <a href="#pricing" className="hover:text-primary transition">
              Planes
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-primary transition">
              Contacto
            </a>
          </li>
          <li>
            <a
              href="#signup"
              className="bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-lg block text-center font-semibold transition duration-300 transform hover:scale-105 hover:shadow-xl-glow hover:brightness-110"
            >
              Suscribirse
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
