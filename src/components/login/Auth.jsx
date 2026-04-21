import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaEnvelope, FaLock, FaUser, FaWhatsapp, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Auth({ onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleNumberInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    setPasswordError("");
    localStorage.setItem("fintrack_token", "demo-token-123");
    navigate("/dashboard");
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setShowPassword(false);
    setShowConfirm(false);
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all duration-200";
  const inputError =
    "w-full pl-11 pr-11 py-3 rounded-xl border border-red-300 bg-red-50/30 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300/30 focus:border-red-400 transition-all duration-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onBack}
    >
      <div
        className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-200 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onBack}
          className="absolute top-4 right-4 w-8 h-8 rounded-full text-gray-400 hover:text-dark hover:bg-gray-100 flex items-center justify-center transition-colors"
          aria-label="Cerrar"
        >
          <FaTimes className="w-3.5 h-3.5" />
        </button>

        {/* Header editorial */}
        <div className="px-8 pt-8 pb-2">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            {isLogin ? "Acceso" : "Registro"}
          </span>
          <h2 className="text-2xl font-bold text-dark leading-tight">
            {isLogin ? "Bienvenido de nuevo." : "Crea tu cuenta."}
          </h2>
          <p className="text-sm text-gray-500 mt-1.5">
            {isLogin
              ? "Inicia sesión para acceder a tu panel."
              : "Regístrate y empieza a gestionar tus finanzas."}
          </p>
        </div>

        {/* Formulario */}
        <div className="px-8 pb-8 pt-6">
          <div>
            <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
              {/* Campos de registro */}
              {!isLogin && (
                <>
                  {/* Nombre */}
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      required
                      className={inputBase}
                    />
                  </div>
                  {/* Email */}
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      required
                      className={inputBase}
                    />
                  </div>
                  {/* WhatsApp */}
                  <div className="relative">
                    <FaWhatsapp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Número de WhatsApp"
                      required
                      onInput={handleNumberInput}
                      maxLength={15}
                      className={inputBase}
                    />
                  </div>
                  {/* Contraseña */}
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError("");
                      }}
                      className={inputBase.replace("pr-4", "pr-11")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Repetir contraseña */}
                  <div>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Repetir contraseña"
                        required
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (passwordError) setPasswordError("");
                        }}
                        className={
                          passwordError
                            ? inputError
                            : inputBase.replace("pr-4", "pr-11")
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-xs text-red-500 mt-1.5 ml-1">{passwordError}</p>
                    )}
                  </div>
                </>
              )}

              {/* Campos de login */}
              {isLogin && (
                <>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      required
                      className={inputBase}
                    />
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      required
                      className={inputBase.replace("pr-4", "pr-11")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-dark text-white font-semibold py-3 rounded-xl mt-2 hover:bg-primary transition-colors"
              >
                {isLogin ? "Iniciar sesión" : "Crear cuenta"}
              </button>
            </form>

            {/* Separador */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">o</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Switch login/registro */}
            <p className="text-sm text-gray-500 text-center">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <button
                onClick={handleModeSwitch}
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                {isLogin ? "Registrarse" : "Iniciar Sesión"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
