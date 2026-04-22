import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";

export default function Navbar({ onAuthClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleNav = (anchor) => (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/${anchor}` === "/#hero" ? "/" : `/${anchor}`);
      setTimeout(() => {
        const el = document.getElementById(anchor.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(anchor.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.hash = anchor;
    }
    setIsOpen(false);
  };

  const toggleLang = () => {
    const next = i18n.language?.startsWith("es") ? "en" : "es";
    i18n.changeLanguage(next);
  };

  const links = [
    { href: "#hero", label: t("nav.home") },
    { href: "#features", label: t("nav.features") },
    { href: "#workflow", label: t("nav.howItWorks") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const currentLang = i18n.language?.startsWith("es") ? "ES" : "EN";

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50">
      <a href="/" className="flex items-center gap-2.5" aria-label="FinTrack - Inicio">
        <img
          src="/assets/logo2.png"
          alt="FinTrack"
          className="w-7 h-7 md:w-8 md:h-8 object-contain"
        />
        <span className="text-xl md:text-2xl font-bold text-dark tracking-tight">
          FinTrack
        </span>
      </a>

      <ul className="hidden lg:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={handleNav(l.href)}
              className="text-sm font-medium text-gray-600 hover:text-dark transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={toggleLang}
            aria-label={t("nav.language")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-dark hover:bg-gray-50 transition-colors"
          >
            <FaGlobe className="w-3.5 h-3.5" />
            {currentLang}
          </button>
        </li>
        <li>
          <button
            onClick={onAuthClick}
            className="bg-dark text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:bg-primary transition-colors duration-200"
          >
            {t("nav.login")}
          </button>
        </li>
      </ul>

      <div className="lg:hidden flex items-center gap-2">
        <button
          onClick={toggleLang}
          aria-label={t("nav.language")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-dark transition-colors"
        >
          <FaGlobe className="w-3.5 h-3.5" />
          {currentLang}
        </button>
        <button
          className="text-dark text-xl p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("common.close") : t("nav.home")}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 flex flex-col gap-1 p-4 lg:hidden shadow-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={handleNav(l.href)}
                className="block px-3 py-3 text-sm font-medium text-gray-600 hover:text-dark hover:bg-gray-50 rounded-lg transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <button
              onClick={() => {
                onAuthClick();
                setIsOpen(false);
              }}
              className="w-full bg-dark text-white text-sm px-5 py-3 rounded-xl font-semibold hover:bg-primary transition-colors"
            >
              {t("nav.login")}
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
