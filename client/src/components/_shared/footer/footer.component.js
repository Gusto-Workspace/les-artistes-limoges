import Link from "next/link";
import { useContext } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music2,
  Phone,
  Youtube,
} from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import {
  getRestaurantBrandParts,
  getRestaurantLocationLabel,
  getSocialLinks,
} from "@/_assets/utils/site-display.utils";

function formatAddress(address) {
  return [address?.line1, [address?.zipCode, address?.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}

export default function FooterComponent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const brand = getRestaurantBrandParts();
  const socialLinks = getSocialLinks(restaurantData);
  const iconByPlatform = {
    facebook: Facebook,
    instagram: Instagram,
    tiktok: Music2,
    youtube: Youtube,
    linkedin: Linkedin,
  };
  const footerLinks = [
    { label: "Accueil", href: "/" },
    { label: "Menus", href: "/menus" },
    { label: "Actualités", href: "/news" },
    { label: "Réservations", href: "/reservations" },
    { label: "Contact", href: "/contact" },
  ];
  const contactItems = [
    {
      key: "location",
      label: "Ville",
      value: getRestaurantLocationLabel(restaurantData) || "Limoges",
      icon: MapPin,
    },
    {
      key: "phone",
      label: "Téléphone",
      value: restaurantData?.phone || "Renseignement à venir",
      href: restaurantData?.phone
        ? `tel:${String(restaurantData.phone).replace(/[^\d+]/g, "")}`
        : "",
      icon: Phone,
    },
    {
      key: "email",
      label: "Email",
      value: restaurantData?.email || "Renseignement à venir",
      href: restaurantData?.email ? `mailto:${restaurantData.email}` : "",
      icon: Mail,
    },
  ];
  const address = formatAddress(restaurantData?.address);

  return (
    <footer className="relative overflow-hidden bg-[#121214] px-5 pb-10 pt-20 text-[var(--site-cream)] tablet:px-8 tablet:pb-12 desktop:px-[90px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(203,96,56,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_20%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(245,239,231,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(245,239,231,0.24)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-12 border-b border-[rgba(245,239,231,0.14)] pb-12 desktop:grid-cols-[0.95fr_1.05fr] desktop:gap-16">
          <div className="max-w-[520px]">
            <Link href="/" className="inline-flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-[rgba(245,239,231,0.16)] bg-white/10 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--site-cream)]">
                LA
              </div>

              <div>
                <p className="nav-font text-[10px] text-[rgba(245,239,231,0.64)]">
                  Restaurant
                </p>
                <p className="yeseva-one-regular mt-1 text-[32px] leading-[0.92]">
                  {brand.main}{" "}
                  <span className="script-font text-[36px] text-[var(--site-orange)]">
                    {brand.accent}
                  </span>
                </p>
              </div>
            </Link>

            <p className="mt-6 text-[16px] leading-[1.85] text-[rgba(245,239,231,0.76)]">
              Nouvelle base de site pour présenter la maison, ses menus, ses
              actualités, ses réservations et ses informations pratiques dans
              une interface plus sobre et plus éditoriale.
            </p>

            {address ? (
              <p className="mt-4 text-[13px] uppercase tracking-[0.18em] text-[rgba(245,239,231,0.5)]">
                {address}
              </p>
            ) : null}
          </div>

          <div className="grid gap-8 tablet:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="nav-font text-[11px] text-[rgba(245,239,231,0.58)]">
                Navigation
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="yeseva-one-regular text-[28px] leading-none transition hover:text-[var(--site-orange)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="nav-font text-[11px] text-[rgba(245,239,231,0.58)]">
                Coordonnées
              </p>
              <div className="mt-5 space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = item.href ? (
                    <a href={item.href} className="transition hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  );

                  return (
                    <div
                      key={item.key}
                      className="rounded-[20px] border border-[rgba(245,239,231,0.12)] bg-white/6 px-4 py-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(245,239,231,0.14)] bg-white/8 text-[var(--site-orange)]">
                          <Icon size={16} strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(245,239,231,0.54)]">
                            {item.label}
                          </p>
                          <p className="mt-2 text-[15px] leading-[1.7] text-[rgba(245,239,231,0.9)]">
                            {content}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 py-8 text-center desktop:flex-row desktop:items-center desktop:justify-between desktop:text-left">
          <div className="flex flex-col items-center gap-4 desktop:items-start">
            <p className="text-[14px] leading-[1.7] text-[rgba(245,239,231,0.72)]">
              © {new Date().getFullYear()} {brand.full}. Tous droits réservés.{" "}
              <a
                href="https://gusto-manager.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Propulsé par Gusto Manager
              </a>
            </p>
            <div className="flex flex-col items-center gap-2 text-[12px] font-medium tracking-[0.16em] text-[rgba(245,239,231,0.76)] desktop:flex-row desktop:items-center desktop:gap-3">
              <Link href="/legales" className="transition hover:text-white">
                Mentions légales
              </Link>
              <span className="hidden desktop:inline">•</span>
              <Link href="/policy" className="transition hover:text-white">
                Politique de confidentialité
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 desktop:justify-end">
            {socialLinks.map((item) => {
              const Icon = iconByPlatform[item.icon] || Music2;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(245,239,231,0.18)] bg-white/8 text-[var(--site-cream)] transition hover:-translate-y-[1px] hover:border-[rgba(245,239,231,0.3)] hover:bg-white/12 hover:text-white"
                >
                  <Icon size={18} strokeWidth={1.8} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
