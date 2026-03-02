import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import mockUser from "../../mocks/mockUser.json";
import { FaUser, FaFileInvoiceDollar, FaSignOutAlt, FaTags } from "react-icons/fa";

const tabs = [
  { label: "Principal", path: "/dashboard" },
  { label: "Ingresos", path: "/dashboard/ingresos" },
  { label: "Gastos", path: "/dashboard/gastos" },
  { label: "Balance", path: "/dashboard/balance" },
];

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-dash-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 shrink-0"
          >
            <img src="/assets/logo.png" alt="FinTrack" className="w-7 h-7" />
            <span className="text-lg font-bold text-dash-text hidden sm:block">FinTrack</span>
          </button>

          {/* Tabs */}
          <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-150 ${isActive(tab.path)
                  ? "bg-dash-accent/10 text-dash-accent"
                  : "text-dash-text-secondary hover:text-dash-text hover:bg-gray-50"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* User */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-dash-primary text-white flex items-center justify-center text-xs sm:text-sm font-semibold">
                {initials}
              </div>
              <span className="text-sm font-medium text-dash-text hidden md:block">
                {mockUser.nombre.split(" ")[0]}
              </span>
              <svg
                className={`w-4 h-4 text-dash-text-secondary transition-transform duration-150 hidden md:block ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-dash-border py-2 animate-fade-in">
                <div className="px-4 py-2 border-b border-dash-border mb-1">
                  <p className="text-sm font-semibold text-dash-text">{mockUser.nombre}</p>
                  <p className="text-xs text-dash-text-secondary">{mockUser.email}</p>
                </div>
                <button
                  onClick={() => { navigate("/dashboard/perfil"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dash-text hover:bg-gray-50 transition-colors duration-150"
                >
                  <FaUser className="text-dash-text-secondary" /> Mi perfil
                </button>
                <button
                  onClick={() => { navigate("/dashboard/facturacion"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dash-text hover:bg-gray-50 transition-colors duration-150"
                >
                  <FaFileInvoiceDollar className="text-dash-text-secondary" /> Facturación
                </button>
                <button
                  onClick={() => { navigate("/dashboard/categorias"); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dash-text hover:bg-gray-50 transition-colors duration-150"
                >
                  <FaTags className="text-dash-text-secondary" /> Categorías
                </button>
                <div className="border-t border-dash-border my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dash-danger hover:bg-red-50 transition-colors duration-150"
                >
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
