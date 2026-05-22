import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import { hasVisibleNews } from "@/_assets/utils/news.utils";
import ActionLinkComponent from "../action-link.component";

const defaultItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact" },
];

const newsItem = { label: "Actualités", href: "/news" };
let hasPlayedInitialNavReveal = false;

function buildVisibleItems(items, showNews) {
  const itemsWithoutNews = items.filter((item) => item.href !== newsItem.href);

  if (!showNews) {
    return itemsWithoutNews;
  }

  const contactIndex = itemsWithoutNews.findIndex(
    (item) => item.href === "/contact",
  );
  const insertionIndex =
    contactIndex === -1 ? itemsWithoutNews.length : contactIndex;

  return [
    ...itemsWithoutNews.slice(0, insertionIndex),
    newsItem,
    ...itemsWithoutNews.slice(insertionIndex),
  ];
}

function isActiveItem(item, pathname) {
  if (typeof item.active === "boolean") {
    return item.active;
  }

  if (item.anchor) {
    return false;
  }

  if (item.href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(item.href);
}

function NavLink({ item, active, onClick }) {
  const content = (
    <span className="la-home__nav-link">
      {item.label}
      <span
        className={`la-home__nav-underline ${active ? "is-active" : ""}`}
        aria-hidden="true"
      />
    </span>
  );

  if (item.anchor) {
    return (
      <a href={item.href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} onClick={onClick}>
      {content}
    </Link>
  );
}

export default function NavComponent({
  items = defaultItems,
  ctaHref = "/reservations",
  ctaLabel = "Réserver une table",
}) {
  const router = useRouter();
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const restaurantDataLoading = restaurantContext?.dataLoading;
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasStartedNewsVisibilityCheck, setHasStartedNewsVisibilityCheck] =
    useState(false);
  const [newsVisibilityResolved, setNewsVisibilityResolved] = useState(
    hasPlayedInitialNavReveal,
  );
  const [shouldAnimateNav] = useState(!hasPlayedInitialNavReveal);

  const visibleItems = useMemo(
    () =>
      buildVisibleItems(
        items,
        newsVisibilityResolved && hasVisibleNews(restaurantData),
      ),
    [items, newsVisibilityResolved, restaurantData],
  );

  useEffect(() => {
    if (restaurantDataLoading || restaurantData) {
      setHasStartedNewsVisibilityCheck(true);
    }
  }, [restaurantData, restaurantDataLoading]);

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
    if (newsVisibilityResolved) {
      return undefined;
    }

    if (restaurantData) {
      const frame = window.requestAnimationFrame(() => {
        hasPlayedInitialNavReveal = true;
        setNewsVisibilityResolved(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (hasStartedNewsVisibilityCheck && !restaurantDataLoading) {
      const frame = window.requestAnimationFrame(() => {
        hasPlayedInitialNavReveal = true;
        setNewsVisibilityResolved(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const fallback = window.setTimeout(() => {
      hasPlayedInitialNavReveal = true;
      setNewsVisibilityResolved(true);
    }, 500);

    return () => window.clearTimeout(fallback);
  }, [
    hasStartedNewsVisibilityCheck,
    newsVisibilityResolved,
    restaurantData,
    restaurantDataLoading,
  ]);

  const navReady = newsVisibilityResolved || !shouldAnimateNav;

  return (
    <>
      <div
        className={`fixed inset-0 z-[58] bg-[rgba(51,25,31,0.36)] transition-opacity duration-300 min-[1160px]:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-[59] flex h-screen w-[92%] max-w-[430px] flex-col bg-[var(--la-paper)] px-7 pb-9 pt-7 shadow-[0_24px_80px_rgba(74,45,31,0.2)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] min-[1160px]:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Les Artistes"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/img/logo.png"
              alt="Les Artistes"
              width={230}
              height={104}
              className="h-auto w-[176px]"
              priority
            />
          </Link>

          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(197,155,85,0.34)] bg-[#fbf4ea] text-[var(--la-burgundy)]"
          >
            <X size={23} strokeWidth={1.6} />
          </button>
        </div>

        <nav className="mt-12 flex flex-1 flex-col justify-center gap-7">
          {visibleItems.map((item, index) => {
            const active = isActiveItem(item, router.pathname);

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center gap-4 transition-opacity duration-300 hover:opacity-70 ${
                  active ? "opacity-100" : "opacity-[0.82]"
                }`}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[rgba(86,57,44,0.42)]">
                  0{index + 1}
                </span>
                <span className="la-home__display text-[36px] leading-none text-[var(--la-burgundy)] tablet:text-[42px]">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <ActionLinkComponent
          href={ctaHref}
          className="w-full"
          onClick={() => setMenuOpen(false)}
        >
          {ctaLabel}
        </ActionLinkComponent>
      </aside>

      <header
        className={`la-nav la-shell pt-5 tablet:pt-7 desktop:pt-10 ${
          shouldAnimateNav
            ? "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            : "transition-none"
        } ${
          navReady
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-6 opacity-0"
        }`}
        aria-hidden={navReady ? undefined : "true"}
      >
        <div className="flex items-center justify-between gap-5 min-[1160px]:gap-6">
          <Link href="/" aria-label="Les Artistes">
            <Image
              src="/img/logo.png"
              alt="Les Artistes"
              width={315}
              height={142}
              className="h-auto w-[205px] tablet:w-[255px] desktop:w-[340px]"
              priority
            />
          </Link>

          <div className="hidden flex-1 min-[1160px]:flex min-[1160px]:items-center min-[1160px]:justify-center">
            <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {visibleItems.map((item) => (
                <NavLink
                  key={`${item.label}-${item.href}`}
                  item={item}
                  active={isActiveItem(item, router.pathname)}
                />
              ))}
            </nav>
          </div>

          <div className="hidden min-[1160px]:block">
            <ActionLinkComponent href={ctaHref} className="min-w-[220px]">
              {ctaLabel}
            </ActionLinkComponent>
          </div>

          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(197,155,85,0.34)] bg-[#fbf4ea] text-[var(--la-burgundy)] shadow-[0_10px_24px_rgba(74,45,31,0.08)] min-[1160px]:hidden"
          >
            <Menu size={24} strokeWidth={1.6} />
          </button>
        </div>
      </header>
    </>
  );
}
