import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Auth({ onBack }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleNumberInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-50 animate-fade-in">
        {/* Botón Cerrar con X */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-secondary hover:text-primary text-xl"
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>

        <h2 className="text-3xl font-bold text-dark mb-6 text-center">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        <form className="flex flex-col gap-4">
          {/* Registro: correo y teléfono */}
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre completo"
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Número de WhatsApp"
                required
                onInput={handleNumberInput}
                maxLength={15}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="password"
                placeholder="Contraseña"
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </>
          )}

          {/* Login */}
          {isLogin && (
            <>
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="password"
                placeholder="Contraseña"
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 rounded-lg mt-2 hover:scale-105 hover:shadow-xl-glow transition duration-300"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <p className="text-sm text-secondary text-center mt-4">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-semibold hover:underline"
          >
            {isLogin ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
