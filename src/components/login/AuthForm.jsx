import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaWhatsapp,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

/**
 * Formulario de autenticación reutilizable.
 * Se usa tanto en el modal <Auth /> como en la página <LoginPage />.
 *
 * @param {Object} props
 * @param {Function} [props.onSuccess] - Callback opcional tras login exitoso.
 *   Si no se pasa, se hace navigate("/dashboard").
 */
export default function AuthForm({ onSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNumberInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setPasswordError(t("auth.passwordMismatch"));
      return;
    }
    setPasswordError("");
    // MOCK: en producción este token debe venir del backend (POST /auth/login → JWT).
    // Aquí se guarda un valor fijo solo para permitir el flujo demo.
    localStorage.setItem("fintrack_token", "demo-token-123");
    if (onSuccess) onSuccess();
    else navigate("/dashboard");
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
    "w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all duration-200";
  const inputError =
    "w-full pl-11 pr-11 py-3 rounded-xl border border-red-300 bg-red-50/30 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-300/30 focus:border-red-400 transition-all duration-200";

  return (
    <>
      {/* Header editorial */}
      <div className="mb-6">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
          {isLogin ? t("auth.eyebrowLogin") : t("auth.eyebrowRegister")}
        </span>
        <h2 className="text-2xl font-bold text-dark leading-tight">
          {isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}
        </h2>
        <p className="text-sm text-gray-500 mt-1.5">
          {isLogin ? t("auth.loginSubtitle") : t("auth.registerSubtitle")}
        </p>
      </div>

      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder={t("auth.fullName")}
                required
                className={inputBase}
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder={t("common.email")}
                required
                className={inputBase}
              />
            </div>
            <div className="relative">
              <FaWhatsapp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder={t("auth.whatsapp")}
                required
                onInput={handleNumberInput}
                maxLength={15}
                className={inputBase}
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("common.password")}
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
                aria-label={t("common.password")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder={t("auth.repeatPassword")}
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
                  aria-label={t("auth.repeatPassword")}
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

        {isLogin && (
          <>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder={t("common.email")}
                required
                className={inputBase}
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("common.password")}
                required
                className={inputBase.replace("pr-4", "pr-11")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={t("common.password")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t("auth.forgotPassword")}
              </button>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-dark text-white font-semibold py-3 rounded-xl mt-2 hover:bg-primary transition-colors"
        >
          {isLogin ? t("auth.loginAction") : t("auth.registerAction")}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-500">{t("auth.or")}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <p className="text-sm text-gray-500 text-center">
        {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
        <button
          onClick={handleModeSwitch}
          className="text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          {isLogin ? t("auth.register") : t("auth.loginAction")}
        </button>
      </p>
    </>
  );
}
