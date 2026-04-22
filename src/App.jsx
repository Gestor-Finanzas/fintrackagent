import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/landing_page/Navbar";
import Hero from "./components/landing_page/Hero";
import Product from "./components/landing_page/Product";
import Features from "./components/landing_page/Features";
import Workflow from "./components/landing_page/Workflow";
import Pricing from "./components/landing_page/Pricing";
import Contact from "./components/landing_page/Contact";
import Footer from "./components/landing_page/Footer";
import ScrollToTopButton from "./components/landing_page/ScrollToTopButton";
import Auth from "./components/login/Auth";
import ProtectedRoute from "./components/login/ProtectedRoute";
import NotFound from "./components/NotFound";

const LoginPage = lazy(() => import("./components/login/LoginPage"));

// Public pages (lazy)
const SobreNosotros = lazy(() => import("./components/landing_page/SobreNosotros"));
const Empresa = lazy(() => import("./components/landing_page/pages/Empresa"));
const FaqsPublic = lazy(() => import("./components/landing_page/pages/FaqsPublic"));
const ContactoPage = lazy(() => import("./components/landing_page/pages/ContactoPage"));
const LegalPrivacidad = lazy(() => import("./components/landing_page/pages/LegalPrivacidad"));
const LegalTerminos = lazy(() => import("./components/landing_page/pages/LegalTerminos"));
const LegalCookies = lazy(() => import("./components/landing_page/pages/LegalCookies"));
const LegalSeguridad = lazy(() => import("./components/landing_page/pages/LegalSeguridad"));

// Dashboard (lazy)
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const Overview = lazy(() => import("./components/dashboard/pages/Overview"));
const Ingresos = lazy(() => import("./components/dashboard/pages/Ingresos"));
const Gastos = lazy(() => import("./components/dashboard/pages/Gastos"));
const Balance = lazy(() => import("./components/dashboard/pages/Balance"));
const Perfil = lazy(() => import("./components/dashboard/pages/Perfil"));
const Facturacion = lazy(() => import("./components/dashboard/pages/Facturacion"));
const Planes = lazy(() => import("./components/dashboard/pages/Planes"));
const Categorias = lazy(() => import("./components/dashboard/pages/Categorias"));
const Sugerencias = lazy(() => import("./components/dashboard/pages/Sugerencias"));
const Faqs = lazy(() => import("./components/dashboard/pages/legal/Faqs"));
const Privacidad = lazy(() => import("./components/dashboard/pages/legal/Privacidad"));
const Terminos = lazy(() => import("./components/dashboard/pages/legal/Terminos"));
const Cookies = lazy(() => import("./components/dashboard/pages/legal/Cookies"));
const Seguridad = lazy(() => import("./components/dashboard/pages/legal/Seguridad"));

function PageFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center" role="status" aria-live="polite">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

function Landing({ setShowAuth, showAuth }) {
  // AOS solo se carga dentro de la landing — no infla el bundle del dashboard
  // ni de las páginas legales donde no se usa.
  useEffect(() => {
    let mounted = true;
    Promise.all([import("aos"), import("aos/dist/aos.css")]).then(([mod]) => {
      if (mounted) mod.default.init({ duration: 1000, once: false, mirror: true });
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="App bg-bgLight overflow-x-hidden relative">
      <Navbar onAuthClick={() => setShowAuth(true)} />
      <Hero />
      <Product />
      <Features />
      <Workflow />
      <Pricing onAuthClick={() => setShowAuth(true)} />
      <Contact />
      <Footer />
      <ScrollToTopButton />
      {showAuth && <Auth onBack={() => setShowAuth(false)} />}
    </div>
  );
}

/**
 * Sincroniza el atributo `lang` del <html> con el idioma de i18next.
 * Mejora SEO y accesibilidad: los screen readers usan esta propiedad
 * para escoger la pronunciación correcta.
 */
function HtmlLangSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const applyLang = () => {
      const current = i18n.language?.startsWith("es") ? "es" : "en";
      document.documentElement.lang = current;
    };
    applyLang();
    i18n.on("languageChanged", applyLang);
    return () => i18n.off("languageChanged", applyLang);
  }, [i18n]);
  return null;
}

function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <Router>
      <HtmlLangSync />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Landing setShowAuth={setShowAuth} showAuth={showAuth} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />

          {/* Public pages */}
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/faqs" element={<FaqsPublic />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/privacidad" element={<LegalPrivacidad />} />
          <Route path="/terminos" element={<LegalTerminos />} />
          <Route path="/cookies" element={<LegalCookies />} />
          <Route path="/seguridad" element={<LegalSeguridad />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<Overview />} />
            <Route path="ingresos" element={<Ingresos />} />
            <Route path="gastos" element={<Gastos />} />
            <Route path="balance" element={<Balance />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="facturacion" element={<Facturacion />} />
            <Route path="planes" element={<Planes />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="sugerencias" element={<Sugerencias />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="privacidad" element={<Privacidad />} />
            <Route path="terminos" element={<Terminos />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="seguridad" element={<Seguridad />} />
          </Route>

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
