import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ActionLinkComponent from "../action-link.component";

const defaultItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact" },
];

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

function NavLink({ item, active }) {
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
    return <a href={item.href}>{content}</a>;
  }

  return <Link href={item.href}>{content}</Link>;
}

export default function NavComponent({
  items = defaultItems,
  ctaHref = "/reservations",
  ctaLabel = "Réserver une table",
}) {
  const router = useRouter();

  return (
    <header className="la-shell pt-7 tablet:pt-8 desktop:pt-10">
      <div className="flex flex-col gap-6 min-[1160px]:flex-row min-[1160px]:items-center min-[1160px]:justify-between">
        <Link href="/" aria-label="Les Artistes">
          <Image
            src="/img/logo.png"
            alt="Les Artistes"
            width={315}
            height={142}
            className="h-auto w-[245px] tablet:w-[280px] desktop:w-[340px]"
            priority
          />
        </Link>

        <div className="flex flex-col gap-5 min-[1160px]:flex-1 min-[1160px]:items-center min-[1160px]:justify-center min-[1160px]:gap-0">
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 min-[1160px]:justify-center">
            {items.map((item) => (
              <NavLink
                key={`${item.label}-${item.href}`}
                item={item}
                active={isActiveItem(item, router.pathname)}
              />
            ))}
          </nav>

          <div className="min-[1160px]:hidden">
            <ActionLinkComponent href={ctaHref} className="min-w-[220px]">
              {ctaLabel}
            </ActionLinkComponent>
          </div>
        </div>

        <div className="hidden min-[1160px]:block">
          <ActionLinkComponent href={ctaHref} className="min-w-[220px]">
            {ctaLabel}
          </ActionLinkComponent>
        </div>
      </div>
    </header>
  );
}
