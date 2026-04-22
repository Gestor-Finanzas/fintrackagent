import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
          {t("notFound.code")}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-dark leading-tight mb-4">
          {t("notFound.title")}
        </h1>
        <p className="text-base text-gray-500 leading-relaxed mb-8">
          {t("notFound.description")}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-xl hover:bg-primary transition-colors font-semibold text-sm"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          {t("notFound.cta")}
        </Link>
      </div>
    </div>
  );
}
