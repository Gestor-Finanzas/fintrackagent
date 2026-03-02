import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
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
import SobreNosotros from "./components/landing_page/SobreNosotros";

// Public pages
import Empresa from "./components/landing_page/pages/Empresa";
import FaqsPublic from "./components/landing_page/pages/FaqsPublic";
import ContactoPage from "./components/landing_page/pages/ContactoPage";
import LegalPrivacidad from "./components/landing_page/pages/LegalPrivacidad";
import LegalTerminos from "./components/landing_page/pages/LegalTerminos";
import LegalCookies from "./components/landing_page/pages/LegalCookies";
import LegalSeguridad from "./components/landing_page/pages/LegalSeguridad";

// Dashboard
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./components/dashboard/pages/Overview";
import Ingresos from "./components/dashboard/pages/Ingresos";
import Gastos from "./components/dashboard/pages/Gastos";
import Balance from "./components/dashboard/pages/Balance";
import Perfil from "./components/dashboard/pages/Perfil";
import Facturacion from "./components/dashboard/pages/Facturacion";
import Categorias from "./components/dashboard/pages/Categorias";
import Faqs from "./components/dashboard/pages/legal/Faqs";
import Privacidad from "./components/dashboard/pages/legal/Privacidad";
import Terminos from "./components/dashboard/pages/legal/Terminos";
import Cookies from "./components/dashboard/pages/legal/Cookies";
import Seguridad from "./components/dashboard/pages/legal/Seguridad";

function Landing({ setShowAuth, showAuth }) {
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

function App() {
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing setShowAuth={setShowAuth} showAuth={showAuth} />} />
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
          <Route path="categorias" element={<Categorias />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="privacidad" element={<Privacidad />} />
          <Route path="terminos" element={<Terminos />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="seguridad" element={<Seguridad />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
