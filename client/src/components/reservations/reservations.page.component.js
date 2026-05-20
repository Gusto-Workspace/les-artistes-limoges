import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Facebook, Instagram } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import { buildContactInfos } from "@/_assets/utils/contact.utils";
import { getSocialLinks } from "@/_assets/utils/site-display.utils";
import HomeActionLink from "../home/home-action-link.component";
import FormReservationsComponent from "./form.reservations.component";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact" },
];

const featureItems = [
  {
    title: "À côté de l’Opéra",
    description: "L’adresse idéale avant ou après le spectacle.",
    iconSrc: "/img/pictos/1.png",
    iconAlt: "Pictogramme opéra",
  },
  {
    title: "Service continu",
    description: "Une brasserie ouverte pour tous les moments de la journée.",
    iconSrc: "/img/pictos/20.png",
    iconAlt: "Pictogramme horloge",
  },
  {
    title: "Terrasse",
    description: "Profitez des beaux jours en terrasse.",
    iconSrc: "/img/pictos/2.png",
    iconAlt: "Pictogramme terrasse",
  },
  {
    title: "Salle cosy à l’étage",
    description: "Un espace chaleureux pour déjeuner ou dîner.",
    iconSrc: "/img/pictos/4.png",
    iconAlt: "Pictogramme fauteuil",
  },
];

const venueItems = [
  {
    title: "La terrasse",
    description: "Pour un déjeuner au soleil ou un apéritif en ville.",
    image: "/img/photos/1.png",
    imageAlt: "La terrasse des Artistes",
  },
  {
    title: "La salle principale",
    description: "L’ambiance brasserie, vivante et accueillante.",
    image: "/img/photos/2.png",
    imageAlt: "La salle principale des Artistes",
  },
  {
    title: "L’étage cosy",
    description: "Une salle plus calme pour un repas en toute tranquillité.",
    image: "/img/photos/3.png",
    imageAlt: "L'étage cosy des Artistes",
  },
];

const footerLinks = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Réserver", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

const socialFallback = [
  { label: "Facebook", href: "", icon: "facebook" },
  { label: "Instagram", href: "", icon: "instagram" },
];

function HeroOrnament() {
  return (
    <svg
      viewBox="0 0 160 170"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path
        d="M68 19C103 19 131 47 131 82V154"
        stroke="rgba(197,155,85,0.62)"
        strokeWidth="1.4"
      />
      <path
        d="M79 28C105 28 126 49 126 75V154"
        stroke="rgba(197,155,85,0.52)"
        strokeWidth="1.1"
      />
      <path
        d="M90 38C109 38 123 53 123 72V154"
        stroke="rgba(197,155,85,0.45)"
        strokeWidth="1.1"
      />
      <path
        d="M100 48C114 48 123 59 123 73V154"
        stroke="rgba(197,155,85,0.36)"
        strokeWidth="1"
      />
      <circle cx="131" cy="53" r="3.8" fill="rgba(197,155,85,0.72)" />
      {[
        [131, 8],
        [103, 18],
        [88, 43],
        [88, 71],
        [104, 95],
        [131, 104],
        [156, 94],
        [158, 52],
        [156, 13],
      ].map(([x, y], index) => (
        <path
          key={`${x}-${y}-${index}`}
          d={`M131 53L${x} ${y}`}
          stroke="rgba(197,155,85,0.48)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function ReservationsNavLink({ item }) {
  return (
    <Link href={item.href}>
      <span className="la-home__nav-link">
        {item.label}
        <span
          className={`la-home__nav-underline ${item.active ? "is-active" : ""}`}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

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

export default function ReservationsPageComponent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const contactInfos = buildContactInfos(restaurantData);
  const contactByKey = Object.fromEntries(
    contactInfos.map((item) => [item.key, item]),
  );
  const address =
    contactByKey.address?.value && contactByKey.address.value !== "-"
      ? contactByKey.address.value
      : "4 rue Fitz-James, 87000 Limoges";
  const phone =
    contactByKey.phone?.value && contactByKey.phone.value !== "-"
      ? contactByKey.phone.value
      : "05 55 34 12 43";
  const phoneHref = contactByKey.phone?.href || "tel:0555341243";
  const email =
    contactByKey.email?.value && contactByKey.email.value !== "-"
      ? contactByKey.email.value
      : "contact@lesartistes-limoges.fr";
  const socialLinks = getSocialLinks(restaurantData).filter((item) =>
    ["facebook", "instagram"].includes(item.icon),
  );
  const footerSocialLinks = socialFallback.map(
    (item) =>
      socialLinks.find((socialItem) => socialItem.icon === item.icon) || item,
  );

  return (
    <div className="la-home la-reservations">
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
              {navigationItems.map((item) => (
                <ReservationsNavLink key={item.label} item={item} />
              ))}
            </nav>

            <div className="min-[1160px]:hidden">
              <HomeActionLink href="/reservations" className="min-w-[220px]">
                Réserver une table
              </HomeActionLink>
            </div>
          </div>

          <div className="hidden min-[1160px]:block">
            <HomeActionLink href="/reservations" className="min-w-[220px]">
              Réserver une table
            </HomeActionLink>
          </div>
        </div>
      </header>

      <main>
        <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10 desktop:pb-12">
          <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
            <div className="max-w-[400px]">
              <h1 className="la-home__display text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[94px]">
                Réserver
                <br />
                <span className="la-home__script text-[0.8em] text-[var(--la-gold)]">
                  votre table
                </span>
              </h1>

              <p className="mt-7 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                Pour un déjeuner, un dîner, un verre avant l’Opéra ou un moment
                gourmand, réservez votre table chez Les Artistes en quelques
                clics.
              </p>

              <div className="mt-7 flex items-center gap-3 text-[17px] text-[rgba(86,57,44,0.9)]">
                <Image
                  src="/img/pictos/24.png"
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] shrink-0"
                />
                <span>{address}</span>
              </div>

              <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
                <HomeActionLink
                  href="#reservation-form"
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver en ligne
                </HomeActionLink>
                <HomeActionLink
                  href={phoneHref}
                  secondary
                  className="min-[560px]:min-w-[180px]"
                >
                  Nous appeler
                </HomeActionLink>
              </div>
            </div>

            <div className="relative min-[1100px]:pl-10">
              <div className="absolute right-0 top-0 hidden h-[170px] w-[160px] desktop:block">
                <HeroOrnament />
              </div>

              <div className="relative mx-auto max-w-[860px] min-[1100px]:mr-0">
                <div className="relative overflow-hidden border border-[rgba(197,155,85,0.16)] bg-white/70 shadow-[0_20px_40px_rgba(82,49,33,0.12)] min-[1100px]:ml-[85px]">
                  <div className="relative" style={{ aspectRatio: "0.94 / 1" }}>
                    <Image
                      src="/img/hero/1.png"
                      alt="Le bar des Artistes"
                      fill
                      sizes="(max-width: 1099px) 100vw, 720px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-5 min-[720px]:grid-cols-2 min-[1100px]:mt-0">
                  <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[300px] min-[1100px]:w-[220px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.82 / 1" }}
                    >
                      <Image
                        src="/img/hero/2.png"
                        alt="La façade des Artistes"
                        fill
                        sizes="(max-width: 719px) 100vw, 220px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:bottom-[22px] min-[1100px]:right-[-18px] min-[1100px]:w-[252px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.84 / 1" }}
                    >
                      <Image
                        src="/img/photos/3.png"
                        alt="La salle des Artistes"
                        fill
                        sizes="(max-width: 719px) 100vw, 252px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="la-shell py-10 tablet:py-12 desktop:py-14">
          <div className="grid border-y border-[rgba(197,155,85,0.2)] min-[900px]:grid-cols-4">
            {featureItems.map((item, index) => (
              <article
                key={item.title}
                className={`flex flex-col items-center px-6 py-8 text-center ${
                  index > 0
                    ? "border-t border-[rgba(197,155,85,0.18)] min-[900px]:border-l min-[900px]:border-t-0"
                    : ""
                }`}
              >
                <Image
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  width={80}
                  height={80}
                  className="mb-5 h-auto w-[62px]"
                />
                <h2 className="la-home__feature-title">{item.title}</h2>
                <p className="mt-3 max-w-[210px] text-[16px] leading-[1.38] text-[rgba(86,57,44,0.86)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <FormReservationsComponent
          apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
          restaurant={restaurantData}
          dataLoading={restaurantContext.dataLoading}
        />

        <section className="la-shell pb-10 pt-3 tablet:pb-12 desktop:pb-14">
          <div className="la-home__framed-section la-home__framed-section--title-absolute la-home__framed-section--experience">
            <div className="la-home__framed-heading la-home__framed-heading--absolute text-center">
              <h2 className="la-home__section-title">
                Avant ou après votre venue
              </h2>
            </div>

            <div className="la-home__framed-content px-5 pb-6 pt-10 tablet:px-7 desktop:px-8">
              <div className="grid gap-6 desktop:grid-cols-3">
                {venueItems.map((item) => (
                  <article key={item.title} className="text-center">
                    <div
                      className="relative overflow-hidden bg-white"
                      style={{ aspectRatio: "1.18 / 1" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 1279px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <h3 className="mt-5 la-home__feature-title text-[30px] text-[var(--la-burgundy)]">
                      {item.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-[320px] text-[17px] leading-[1.45] text-[rgba(86,57,44,0.88)]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="reservation"
          className="la-shell pb-9 pt-3 tablet:pb-11 desktop:pb-12"
        >
          <div className="la-home__reservation-panel relative overflow-hidden px-5 py-8 tablet:px-8 desktop:px-10 desktop:py-10">
            <span
              className="la-home__reservation-frame la-home__reservation-frame--wide"
              aria-hidden="true"
            />
            <span
              className="la-home__reservation-frame la-home__reservation-frame--tall"
              aria-hidden="true"
            />
            <span
              className="la-home__corner la-home__corner--tl"
              aria-hidden="true"
            />
            <span
              className="la-home__corner la-home__corner--tr"
              aria-hidden="true"
            />
            <span
              className="la-home__corner la-home__corner--bl"
              aria-hidden="true"
            />
            <span
              className="la-home__corner la-home__corner--br"
              aria-hidden="true"
            />

            <div className="flex gap-10 desktop:desktop:items-center">
              <div className="w-full">
                <div className="mx-auto w-full max-w-[430px] opacity-[0.94]">
                  <Image
                    src="/img/pictos/25.png"
                    alt="Illustration de l'Opéra de Limoges"
                    width={577}
                    height={433}
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-6 min-[900px]:items-start">
                <h2 className="la-home__section-title text-left leading-[0.92]">
                  Réservez votre table
                  <br />
                  <span className="la-home__script text-[0.92em] text-[var(--la-gold)]">
                    et laissez-vous inspirer
                  </span>
                </h2>

                <HomeActionLink href="/reservations" className="min-w-[250px]">
                  Réserver en ligne
                </HomeActionLink>

                <div className="flex items-center gap-4 text-[36px] leading-none text-[var(--la-burgundy)]">
                  <Image
                    src="/img/pictos/23.png"
                    alt=""
                    aria-hidden="true"
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0"
                  />
                  <a
                    href={phoneHref}
                    className="transition-opacity hover:opacity-74"
                  >
                    {phone}
                  </a>
                </div>

                <p className="mt-2 text-[18px] leading-[1.42] text-[rgba(86,57,44,0.9)]">
                  Réservation conseillée, notamment les soirs de spectacle.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pt-2">
        <div className="la-shell">
          <div className="grid gap-8 border-t border-[rgba(197,155,85,0.22)] py-8 min-[960px]:grid-cols-[1.15fr_0.95fr_0.8fr_0.6fr] min-[960px]:gap-0">
            <div className="min-[960px]:pr-8">
              <Image
                src="/img/logo.png"
                alt="Les Artistes"
                width={230}
                height={104}
                className="h-auto w-[190px]"
              />

              <div className="mt-6 flex items-center gap-3">
                {footerSocialLinks.map((item) => (
                  <SocialItem key={`${item.label}-${item.icon}`} item={item} />
                ))}
              </div>
            </div>

            <div className="min-[960px]:border-l min-[960px]:border-[rgba(197,155,85,0.16)] min-[960px]:px-8">
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

            <div className="min-[960px]:border-l min-[960px]:border-[rgba(197,155,85,0.16)] min-[960px]:px-8">
              <h3 className="la-home__footer-heading">Liens rapides</h3>
              <div className="mt-4 flex flex-col gap-3 text-[17px] leading-none text-[rgba(86,57,44,0.9)]">
                {footerLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-opacity hover:opacity-72"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="min-[960px]:border-l min-[960px]:border-[rgba(197,155,85,0.16)] min-[960px]:pl-8">
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

          <div className="border-t border-[rgba(197,155,85,0.18)] py-4">
            <div className="flex flex-col gap-3 text-center text-[14px] text-[rgba(86,57,44,0.82)] min-[860px]:flex-row min-[860px]:items-center min-[860px]:justify-center min-[860px]:gap-10">
              <span>© Les Artistes – Limoges</span>
              <Link
                href="/legales"
                className="transition-opacity hover:opacity-72"
              >
                Mentions légales
              </Link>
              <Link
                href="/policy"
                className="transition-opacity hover:opacity-72"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
