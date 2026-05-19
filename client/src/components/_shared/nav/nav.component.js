import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getRestaurantBrandParts } from "@/_assets/utils/site-display.utils";

const menuItems = [
  { label: "Accueil", href: "/" },
  { label: "Menus", href: "/menus" },
  { label: "Actualités", href: "/news" },
  { label: "Réservations", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

function isCurrentPath(routerPath, href) {
  if (href === "/") {
    return routerPath === "/";
  }

  return routerPath.startsWith(href);
}

function Brand({ scrolled = false }) {
  const brand = getRestaurantBrandParts();
  const labelColor = scrolled
    ? "text-[rgba(18,18,20,0.58)]"
    : "text-[rgba(245,239,231,0.72)]";
  const titleColor = scrolled ? "text-[var(--site-ink)]" : "text-[var(--site-cream)]";
  const accentColor = scrolled
    ? "text-[var(--site-orange-deep)]"
    : "text-[var(--site-orange)]";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-[11px] font-semibold uppercase tracking-[0.18em] ${
          scrolled
            ? "border-[rgba(18,18,20,0.12)] bg-white/75 text-[var(--site-orange-deep)]"
            : "border-[rgba(245,239,231,0.22)] bg-white/10 text-[var(--site-cream)]"
        }`}
      >
        LA
      </div>

      <div className="leading-none">
        <p className={`nav-font text-[9px] uppercase ${labelColor}`}>
          Restaurant
        </p>
        <p className={`yeseva-one-regular mt-1 text-[28px] ${titleColor}`}>
          {brand.main}{" "}
          <span className={`script-font text-[32px] ${accentColor}`}>
            {brand.accent}
          </span>
        </p>
      </div>
    </div>
  );
}

export default function NavComponent({
  isVisible = true,
  scrolled = false,
  logoSrc: _logoSrc = "/img/logo.webp",
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isVisible) {
      setMenuOpen(false);
    }
  }, [isVisible]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[79] bg-[rgba(18,18,20,0.45)] transition-all duration-300 min-[1180px]:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-[80] flex h-screen w-[92%] max-w-[420px] flex-col border-l border-[rgba(18,18,20,0.08)] bg-[rgba(245,239,231,0.96)] px-7 pb-10 pt-7 shadow-[0_30px_90px_rgba(18,18,20,0.18)] backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[1180px]:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Brand scrolled />
          </Link>

          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(18,18,20,0.1)] text-[var(--site-ink)]"
          >
            <X size={22} strokeWidth={1.6} />
          </button>
        </div>

        <nav className="mt-14 flex flex-1 flex-col justify-center gap-8">
          {menuItems.map((item, index) => {
            const active = isCurrentPath(router.pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center gap-4 transition-opacity duration-300 hover:opacity-72 ${
                  active ? "opacity-100" : "opacity-82"
                }`}
              >
                <span className="nav-font text-[10px] uppercase text-[rgba(18,18,20,0.42)]">
                  0{index + 1}
                </span>
                <span className="yeseva-one-regular text-[30px] leading-none text-[var(--site-ink)] tablet:text-[34px]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav
        className={`fixed left-0 top-0 z-[70] w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        } ${
          scrolled
            ? "border-b border-[rgba(18,18,20,0.08)] bg-[rgba(245,239,231,0.82)] shadow-[0_16px_48px_rgba(18,18,20,0.08)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto flex h-[88px] w-full max-w-[1500px] items-center justify-between gap-6 px-5 tablet:px-8 desktop:px-[90px]">
          <Link href="/" aria-label="Accueil">
            <Brand scrolled={scrolled} />
          </Link>

          <div className="hidden items-center gap-6 min-[1180px]:flex">
            {menuItems.map((item) => {
              const active = isCurrentPath(router.pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-72 ${
                    scrolled ? "text-[var(--site-ink)]" : "text-[var(--site-cream)]"
                  } ${active ? "opacity-100" : "opacity-78"}`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-[var(--site-orange)] transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border min-[1180px]:hidden ${
              scrolled
                ? "border-[rgba(18,18,20,0.12)] text-[var(--site-ink)]"
                : "border-[rgba(245,239,231,0.24)] text-[var(--site-cream)]"
            }`}
          >
            <Menu size={22} strokeWidth={1.7} />
          </button>
        </div>
      </nav>
    </>
  );
}
