import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import mockUser from "../../mocks/mockUser.json";
import { FaUser, FaSignOutAlt, FaTags, FaLightbulb, FaCrown, FaGlobe } from "react-icons/fa";
import { HiOutlineHome, HiArrowTrendingUp, HiArrowTrendingDown, HiChartBar } from "react-icons/hi2";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const tabs = [
    { label: t("dashboard.nav.principal"), path: "/dashboard", icon: HiOutlineHome },
    { label: t("dashboard.nav.income"), path: "/dashboard/ingresos", icon: HiArrowTrendingUp },
    { label: t("dashboard.nav.expenses"), path: "/dashboard/gastos", icon: HiArrowTrendingDown },
    { label: t("dashboard.nav.balance"), path: "/dashboard/balance", icon: HiChartBar },
  ];

  const toggleLang = () => {
    const next = i18n.language?.startsWith("es") ? "en" : "es";
    i18n.changeLanguage(next);
  };
  const currentLang = i18n.language?.startsWith("es") ? "ES" : "EN";

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  const initials = mockUser.nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("fintrack_token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Top navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2.5 shrink-0"
            >
              <img src="/assets/logo2.png" alt="FinTrack" className="w-7 h-7" />
              <span className="text-xl font-bold text-dark tracking-tight">
                FinTrack
              </span>
            </button>

            {/* Tabs - desktop */}
            <div className="hidden sm:flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive(tab.path)
                      ? "bg-gray-100 text-dark"
                      : "text-gray-500 hover:text-dark hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Plan + User */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={toggleLang}
                aria-label={t("nav.language")}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-dark hover:bg-gray-50 transition-colors"
              >
                <FaGlobe className="w-3 h-3" />
                {currentLang}
              </button>
              <button
                onClick={() => navigate("/dashboard/facturacion")}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-400 text-dark text-xs font-semibold hover:bg-gray-200 transition-colors"
              >
                <FaCrown className="w-3 h-3 text-primary" />
                {t("dashboard.nav.plan")}
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className={`flex items-center gap-2 sm:gap-3 px-1.5 sm:px-2 py-1 rounded-xl hover:bg-gray-50 transition-colors ${
                    open ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-dark text-white flex items-center justify-center text-xs sm:text-sm font-semibold">
                    {initials}
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-dark">
                    {mockUser.nombre}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-150 hidden sm:block ${
                      open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-gray-200 shadow-lg py-2 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-semibold text-dark">
                        {mockUser.nombre}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {mockUser.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/dashboard/perfil");
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaUser className="text-gray-400 w-3.5 h-3.5" /> {t("dashboard.nav.profile")}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard/facturacion");
                        setOpen(false);
                      }}
                      className="sm:hidden w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaCrown className="text-primary w-3.5 h-3.5" /> {t("dashboard.nav.plan")}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard/categorias");
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaTags className="text-gray-400 w-3.5 h-3.5" /> {t("dashboard.nav.categories")}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/dashboard/sugerencias");
                        setOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaLightbulb className="text-gray-400 w-3.5 h-3.5" /> {t("dashboard.nav.suggestions")}
                    </button>
                    <button
                      onClick={toggleLang}
                      className="sm:hidden w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaGlobe className="text-gray-400 w-3.5 h-3.5" /> {t("nav.language")} · {currentLang}
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="w-3.5 h-3.5" /> {t("dashboard.nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom tab bar - mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
        <div className="flex items-center justify-around h-14">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive(tab.path)
                  ? "text-dark"
                  : "text-gray-500"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
