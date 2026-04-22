import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaWhatsapp,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthForm({ onSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();

  // `state.from` lo setea ProtectedRoute al echar al usuario a /login:
  // respetarlo hace que vuelva a la URL original tras autenticar.
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWhatsappInput = (e) => {
    const cleaned = e.target.value.replace(/[^\d\s+-]/g, "");
    setWhatsapp(cleaned);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!isLogin) {
      if (password !== confirmPassword) {
        setError(t("auth.passwordMismatch"));
        return;
      }
      if (password.length < 8) {
        setError(t("auth.passwordTooShort"));
        return;
      }
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error: signInError } = await signIn({ email, password });
        if (signInError) {
          setError(mapAuthError(signInError, t));
          return;
        }
        if (onSuccess) onSuccess();
        else navigate(redirectTo, { replace: true });
      } else {
        const { data, error: signUpError } = await signUp({
          email,
          password,
          fullName,
          whatsapp,
        });
        if (signUpError) {
          setError(mapAuthError(signUpError, t));
          return;
        }
        // Con confirmación de email activa en Supabase, signUp no abre
        // sesión; el usuario tiene que confirmar antes.
        if (data?.user && !data.session) {
          setInfo(t("auth.checkEmail"));
          return;
        }
        if (onSuccess) onSuccess();
        else navigate(redirectTo, { replace: true });
      }
    } catch (_err) {
      setError(t("auth.genericError"));
    } finally {
      setLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setPassword("");
    setConfirmPassword("");
    setError("");
    setInfo("");
    setShowPassword(false);
    setShowConfirm(false);
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all duration-200";
  const inputError =
    "w-full pl-11 pr-11 py-3 rounded-xl border border-red-300 bg-red-50/30 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-300/30 focus:border-red-400 transition-all duration-200";

  return (
    <>
      <div className="mb-6">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
          {isLogin ? t("auth.eyebrowLogin") : t("auth.eyebrowRegister")}
        </span>
        <h2 id="auth-modal-title" className="text-2xl font-bold text-dark leading-tight">
          {isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}
        </h2>
        <p className="text-sm text-gray-600 mt-1.5">
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
                name="fullName"
                autoComplete="name"
                placeholder={t("auth.fullName")}
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputBase}
              />
            </div>
            <div className="relative">
              <FaWhatsapp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="tel"
                name="whatsapp"
                autoComplete="tel"
                placeholder={t("auth.whatsapp")}
                required
                value={whatsapp}
                onChange={handleWhatsappInput}
                maxLength={20}
                className={inputBase}
              />
            </div>
          </>
        )}

        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder={t("common.email")}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder={t("common.password")}
            required
            minLength={isLogin ? undefined : 8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputBase.replace("pr-4", "pr-11")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>

        {!isLogin && (
          <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                placeholder={t("auth.repeatPassword")}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={error && password !== confirmPassword ? inputError : inputBase.replace("pr-4", "pr-11")}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? t("auth.hidePassword") : t("auth.showPassword")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {isLogin && (
          <div className="flex justify-end -mt-1">
            <button
              type="button"
              onClick={() => setInfo(t("auth.forgotComingSoon"))}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
            >
              {t("auth.forgotPassword")}
            </button>
          </div>
        )}

        {/* Feedback: error o info */}
        <div aria-live="polite" aria-atomic="true">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}
          {info && !error && (
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-xs text-primary font-medium">{info}</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-dark text-white font-semibold py-3 rounded-xl mt-2 hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          )}
          {isLogin ? t("auth.loginAction") : t("auth.registerAction")}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-500">{t("auth.or")}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <p className="text-sm text-gray-600 text-center">
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

// Traduce mensajes crudos del SDK de Supabase Auth a las keys de i18n.
function mapAuthError(err, t) {
  const msg = (err?.message || "").toLowerCase();
  if (msg.includes("invalid login credentials") || msg.includes("invalid_grant")) {
    return t("auth.errorInvalidCredentials");
  }
  if (msg.includes("user already registered") || msg.includes("already exists")) {
    return t("auth.errorUserExists");
  }
  if (msg.includes("email not confirmed")) {
    return t("auth.errorEmailNotConfirmed");
  }
  if (msg.includes("password")) {
    return t("auth.errorPassword");
  }
  if (msg.includes("rate limit") || msg.includes("too many")) {
    return t("auth.errorRateLimit");
  }
  return err?.message || t("auth.genericError");
}
