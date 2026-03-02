import { useNavigate } from "react-router-dom";

export default function LinkFooter({ to, children, className = "" }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      // Ya en landing, solo hacer scroll
      const id = to.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = to;
      }
    } else {
      // Ir a landing y luego scroll
      navigate(`/${to}`);
      setTimeout(() => {
        const id = to.replace("/#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = to;
        }
      }, 400);
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
