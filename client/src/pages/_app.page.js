import "@/styles/style.scss";
import "@/styles/tailwind.css";
import "@/styles/custom/_index.scss";

import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  Sora,
} from "next/font/google";
import { appWithTranslation } from "next-i18next";
import { GlobalProvider } from "@/contexts/global.context";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage-grotesque",
});

const sora = Sora({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

function TrackVisits() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID;

  // Durée de session : 5 minutes
  const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    if (!router.isReady || !RESTAURANT_ID) return;

    const now = Date.now();
    const last = parseInt(localStorage.getItem("lastVisitSession") || "0", 10);

    // Si pas de session ou session expirée, on logge une nouvelle session
    if (!last || now - last > SESSION_TIMEOUT) {
      localStorage.setItem("lastVisitSession", String(now));

      const visitUrl = `${API_URL}/restaurants/${RESTAURANT_ID}/visits`;
      const timeoutId = window.setTimeout(() => {
        fetch(visitUrl, {
          method: "POST",
          keepalive: true,
        }).catch((e) => console.error("log session :", e));
      }, 2500);

      return () => window.clearTimeout(timeoutId);
    }
  }, [router.isReady, router.asPath, API_URL, RESTAURANT_ID]);

  return null;
}

function ScrollRevealController() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const selectors = [
      ".la-home main > section:not(:first-child)",
      ".la-home__dish-card",
      ".la-home__framed-content > .grid > article",
      ".la-menu__category-link",
      ".la-menu__list-card",
      ".la-menu__lunch-strip",
      ".la-menu__quality-item",
      ".la-contact__access-item",
      ".la-home__footer-badge",
    ].join(",");

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight || 0;

    const elements = Array.from(document.querySelectorAll(selectors)).filter(
      (element) => {
        const isLargeSection =
          element.matches(".la-home main > section:not(:first-child)") &&
          viewportHeight > 0 &&
          element.scrollHeight > viewportHeight * 1.6;

        return (
          !isLargeSection &&
          !element.closest(".la-home main > section:first-child") &&
          !element.closest("#reservation") &&
          !element.closest("#cuisine")
        );
      },
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element, index) => {
      element.classList.add("la-scroll-reveal");
      element.style.setProperty("--la-reveal-delay", `${(index % 4) * 55}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [router.asPath]);

  return null;
}

function App({ Component, pageProps }) {
  return (
    <div
      className={`${sora.variable} ${bricolageGrotesque.variable} ${cormorantGaramond.variable} font-root`}
    >
      <GlobalProvider>
        <TrackVisits />
        <ScrollRevealController />
        <Component {...pageProps} />
      </GlobalProvider>
    </div>
  );
}

export default appWithTranslation(App);
