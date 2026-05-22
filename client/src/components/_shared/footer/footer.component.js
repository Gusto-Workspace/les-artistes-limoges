import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Facebook, Instagram } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
import { getSocialLinks } from "@/_assets/utils/site-display.utils";

const defaultLinks = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Réserver", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

const socialFallback = [
  { label: "Facebook", href: "", icon: "facebook" },
  { label: "Instagram", href: "", icon: "instagram" },
];

function SocialItem({ item }) {
  const iconByPlatform = {
    facebook: Facebook,
    instagram: Instagram,
  };
  const Icon = iconByPlatform[item.icon] || Facebook;
  const className = "la-home__social";

  if (!item.href) {
    return (
      <span className={className} aria-hidden="true">
        <Icon size={15} strokeWidth={1.9} />
      </span>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.label}
      className={className}
    >
      <Icon size={15} strokeWidth={1.9} />
    </a>
  );
}

export default function FooterComponent({ links = defaultLinks }) {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const { phone, phoneHref, email } = buildSiteContactSummary(restaurantData);
  const socialLinks = getSocialLinks(restaurantData).filter((item) =>
    ["facebook", "instagram"].includes(item.icon),
  );
  const footerSocialLinks = socialFallback.map(
    (item) =>
      socialLinks.find((socialItem) => socialItem.icon === item.icon) || item,
  );

  return (
    <footer className="pt-2">
      <div className="la-shell">
        <div className="grid gap-8 border-t border-[rgba(197,155,85,0.22)] py-8 text-center min-[960px]:grid-cols-[1.15fr_0.95fr_0.8fr_0.6fr] min-[960px]:gap-0">
          <div className="flex flex-col items-center min-[960px]:px-8">
            <Image
              src="/img/logo.png"
              alt="Les Artistes"
              width={230}
              height={104}
              className="h-auto w-[190px]"
            />

            <div className="mt-6 flex items-center justify-center gap-3">
              {footerSocialLinks.map((item) => (
                <SocialItem key={`${item.label}-${item.icon}`} item={item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center min-[960px]:border-l min-[960px]:border-[rgba(197,155,85,0.16)] min-[960px]:px-8">
            <h3 className="la-home__footer-heading">Les Artistes</h3>
            <p className="mt-4 text-[17px] leading-[1.52] text-[rgba(86,57,44,0.9)]">
              4 rue Fitz-James
              <br />
              87000 Limoges
              <br />À côté de l’Opéra
            </p>
            <p className="mt-4 text-[17px] leading-[1.52] text-[rgba(86,57,44,0.9)]">
              <a href={phoneHref}>{phone}</a>
              <br />
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>

          <div className="flex flex-col items-center min-[960px]:border-l min-[960px]:border-[rgba(197,155,85,0.16)] min-[960px]:px-8">
            <h3 className="la-home__footer-heading">Liens rapides</h3>
            <div className="mt-4 flex flex-col items-center gap-3 text-[17px] leading-none text-[rgba(86,57,44,0.9)]">
              {links.map((item) =>
                item.anchor ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="transition-opacity hover:opacity-72"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-opacity hover:opacity-72"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="flex justify-center min-[960px]:border-l min-[960px]:border-[rgba(197,155,85,0.16)] min-[960px]:px-8">
            <div className="la-home__footer-badge">
              <Image
                src="/img/pictos/5.png"
                alt=""
                width={54}
                height={32}
                className="mx-auto h-auto w-[46px]"
              />
              <p className="mt-4 la-home__footer-heading text-center text-[17px]">
                Brasserie
                <br />
                Bar
                <br />
                Glacier
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--la-burgundy)] text-[#fbf4ea]">
        <div className="la-shell flex flex-col gap-3 py-4 text-center min-[960px]:flex-row min-[960px]:items-center min-[960px]:justify-center min-[960px]:gap-14">
          <p className="text-[15px]">© Les Artistes - Limoges</p>
          <Link
            href="/legales"
            className="text-[15px] transition-opacity hover:opacity-72"
          >
            Mentions légales
          </Link>
          <Link
            href="/policy"
            className="text-[15px] transition-opacity hover:opacity-72"
          >
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
