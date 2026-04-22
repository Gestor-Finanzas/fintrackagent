import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import HeroDashboardMockup from "./HeroDashboardMockup";
import "./Hero.css";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section
      id="hero"
      className="bg-white md:min-h-0 lg:min-h-[95vh] flex items-center pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pb-10 lg:pt-0 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 px-5 sm:px-6 lg:px-16 relative z-10">
        {/* Texto */}
        <div className="flex-1 animate-fade-in hero-text lg:ml-8">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            {t("hero.eyebrow")}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-[1.1] text-left">
            {t("hero.title")}{" "}
            <span className="text-primary">{t("hero.titleAccent")}</span>{" "}
            {t("hero.titleEnd")}
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#signup"
              className="group bg-dark text-white px-6 py-3.5 rounded-xl hover:bg-primary transition-colors duration-200 flex items-center justify-center gap-2 font-semibold text-sm"
            >
              {t("hero.ctaPrimary")}
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#features"
              className="text-dark border border-gray-300 px-6 py-3.5 rounded-xl hover:border-dark hover:bg-gray-50 transition-colors duration-200 font-semibold flex items-center justify-center text-sm"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 max-w-md">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-5">
              <p className="text-xl sm:text-2xl font-bold text-primary mb-1">+2.000</p>
              <p className="text-xs text-gray-600">{t("hero.stats.users")}</p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-5">
              <p className="text-xl sm:text-2xl font-bold text-primary mb-1">{t("hero.stats.trialDays")}</p>
              <p className="text-xs text-gray-600">{t("hero.stats.trial")}</p>
            </div>
          </div>
        </div>

        {/* SVG Dashboard Illustration — extraído a componente propio */}
        <div
          className="flex-1 w-full animate-fade-in mt-10 md:mt-6 lg:mt-0 lg:max-w-none"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary opacity-10 rounded-2xl blur-3xl" />
            <HeroDashboardMockup className="relative w-full h-auto lg:w-[100%] mx-auto lg:mr-11 lg:mt-10 rounded-2xl border border-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
