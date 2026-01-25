import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Auth from "./components/Auth";

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
    <div className="App bg-bgLight overflow-x-hidden relative">
      <Navbar onAuthClick={() => setShowAuth(true)} />
      <Hero />
      <Product />
      <Features />
      <Workflow />
      <Pricing />
      <Contact />
      <Footer />

      {showAuth && <Auth onBack={() => setShowAuth(false)} />}
    </div>
  );
}

export default App;
