import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-bgLight shadow-md py-6 px-12 flex justify-between items-center fixed w-full z-50">
      <h1 className="text-2xl font-bold text-primary">FinTrackAgent</h1>
      <ul className="flex gap-8 text-secondary font-medium">
        <li><a href="#features" className="hover:text-primary transition">Características</a></li>
        <li><a href="#workflow" className="hover:text-primary transition">Cómo Funciona</a></li>
        <li><a href="#pricing" className="hover:text-primary transition">Precios</a></li>
        <li><a href="#signup" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Suscribirse</a></li>
      </ul>
    </nav>
  );
}
