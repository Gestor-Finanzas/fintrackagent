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
            className={`fixed bottom-6 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-xl transition-opacity duration-300 hover:bg-accent focus:outline-none ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-label="Volver arriba"
            style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)" }}
        >
            <FaArrowUp size={22} />
        </button>
    );
}
