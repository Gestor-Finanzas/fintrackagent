import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group flex items-center justify-center w-11 h-11 bg-dark text-white rounded-xl border border-white/10 hover:bg-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      aria-label="Volver arriba"
    >
      <FaArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
