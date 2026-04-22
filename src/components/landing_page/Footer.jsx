import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LinkFooter from "./LinkFooter";

export default function Footer() {
  const { t } = useTranslation();

  const producto = [
    { to: "/#hero", label: t("footer.links.home") },
    { to: "/#features", label: t("footer.links.features") },
    { to: "/#workflow", label: t("footer.links.howItWorks") },
    { to: "/#pricing", label: t("footer.links.pricing") },
  ];
  const empresa = [
    { to: "/empresa", label: t("footer.links.company") },
    { to: "/faqs", label: t("footer.links.faqs") },
    { to: "/contacto", label: t("footer.links.contact") },
    { to: "/sobre-nosotros", label: t("footer.links.aboutUs") },
  ];
  const legal = [
    { to: "/privacidad", label: t("footer.links.privacy") },
    { to: "/terminos", label: t("footer.links.terms") },
    { to: "/cookies", label: t("footer.links.cookies") },
    { to: "/seguridad", label: t("footer.links.security") },
  ];

  return (
    <footer className="bg-dark py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-10 rounded-full blur-3xl" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/logo2.png"
                alt="FinTrack"
                loading="lazy"
                className="w-7 h-7 object-contain"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                FinTrack
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              {t("footer.product")}
            </h4>
            <ul className="space-y-3">
              {producto.map((l) => (
                <li key={l.to}>
                  <LinkFooter
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </LinkFooter>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              {t("footer.company")}
            </h4>
            <ul className="space-y-3">
              {empresa.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 FinTrack Agent. {t("footer.rights")}
          </p>
          <div className="flex gap-5">
            <a
              href="/#hero"
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="/#hero"
              aria-label="Twitter"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="/#hero"
              aria-label="Instagram"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
