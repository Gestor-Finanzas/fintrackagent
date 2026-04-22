import { useState } from "react";
import PageLayout from "./PageLayout";
import { useTranslation } from "react-i18next";
import { FaEnvelope } from "react-icons/fa";

export default function FaqsPublic() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: t("faqsPage.items.q1"), a: t("faqsPage.items.a1") },
    { q: t("faqsPage.items.q2"), a: t("faqsPage.items.a2") },
    { q: t("faqsPage.items.q3"), a: t("faqsPage.items.a3") },
    { q: t("faqsPage.items.q4"), a: t("faqsPage.items.a4") },
    { q: t("faqsPage.items.q5"), a: t("faqsPage.items.a5") },
    { q: t("faqsPage.items.q6"), a: t("faqsPage.items.a6") },
    { q: t("faqsPage.items.q7"), a: t("faqsPage.items.a7") },
    { q: t("faqsPage.items.q8"), a: t("faqsPage.items.a8") },
  ];

  return (
    <PageLayout>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary opacity-[0.025] rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14 sm:py-16 md:py-20 relative z-10">
          <div className="max-w-2xl mb-10 md:mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              {t("faqsPage.eyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              {t("faqsPage.titleStart")} <span className="text-primary">{t("faqsPage.titleAccent")}</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {t("faqsPage.subtitle")}
            </p>
          </div>

          <div className="border-t border-gray-100">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.q} className="border-b border-gray-100">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start gap-5 py-6 text-left group"
                  >
                    <span className="text-sm font-mono font-semibold text-primary/60 pt-0.5 tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base font-semibold text-dark group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 mt-1 shrink-0 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="pl-[3rem] pr-6 pb-6 text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex items-start gap-4 pt-10 border-t border-gray-100">
            <FaEnvelope className="w-4 h-4 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-dark mb-1">
                {t("faqsPage.notFoundTitle")}
              </h3>
              <a
                href="mailto:fintrackagent@gmail.com"
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                fintrackagent@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
