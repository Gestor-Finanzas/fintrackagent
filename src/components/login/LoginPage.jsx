import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaGlobe } from "react-icons/fa";
import AuthForm from "./AuthForm";

export default function LoginPage() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language?.startsWith("es") ? "en" : "es";
    i18n.changeLanguage(next);
  };
  const currentLang = i18n.language?.startsWith("es") ? "ES" : "EN";

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.03] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary opacity-[0.03] rounded-full blur-3xl" />

      {/* Top bar: logo + volver + idioma */}
      <header className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="FinTrack">
          <img
            src="/assets/logo2.png"
            alt="FinTrack"
            className="w-7 h-7 object-contain"
          />
          <span className="text-lg font-bold text-dark tracking-tight">
            FinTrack
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label={t("nav.language")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-dark hover:bg-gray-50 transition-colors"
          >
            <FaGlobe className="w-3.5 h-3.5" />
            {currentLang}
          </button>
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-dark hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft className="w-3 h-3" />
            {t("common.back")}
          </Link>
        </div>
      </header>

      {/* Card centrada */}
      <main className="relative z-10 flex items-start sm:items-center justify-center px-5 sm:px-8 py-8 sm:py-12 min-h-[calc(100vh-5rem)]">
        <div className="w-full max-w-[440px]">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <AuthForm />
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 FinTrack Agent
          </p>
        </div>
      </main>
    </div>
  );
}
