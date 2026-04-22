import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import AuthForm from "./AuthForm";
import useEscapeKey from "../../hooks/useEscapeKey";

/**
 * Modal de login usado desde la landing page (botón "Iniciar sesión").
 * Para la página dedicada con URL propia, ver <LoginPage />.
 */
export default function Auth({ onBack }) {
  const { t } = useTranslation();
  useEscapeKey(onBack, true);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={onBack}
    >
      <div
        className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-200 relative animate-fade-in my-4 sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onBack}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full text-gray-500 hover:text-dark hover:bg-gray-100 flex items-center justify-center transition-colors z-10"
          aria-label={t("common.close")}
        >
          <FaTimes className="w-3.5 h-3.5" />
        </button>
        <div className="px-5 sm:px-8 pt-7 sm:pt-8 pb-6 sm:pb-8">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
