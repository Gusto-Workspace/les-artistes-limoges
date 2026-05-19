import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import { buildContactInfos } from "@/_assets/utils/contact.utils";
import { getSocialLinks } from "@/_assets/utils/site-display.utils";
import HomeActionLink from "./home-action-link.component";

const navigationItems = [
  { label: "Accueil", href: "/", active: true },
  { label: "La Brasserie", href: "#brasserie", anchor: true },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Réserver", href: "/reservations" },
  { label: "Contact", href: "/contact" },
];

const featureItems = [
  {
    title: "À côté de l’Opéra",
    description: "L’adresse idéale avant ou après vos spectacles.",
    iconSrc: "/img/pictos/1.png",
    iconAlt: "Pictogramme opéra",
  },
  {
    title: "Terrasse",
    description: "Profitez des beaux jours en terrasse.",
    iconSrc: "/img/pictos/2.png",
    iconAlt: "Pictogramme terrasse",
  },
  {
    title: "Brasserie & Bar",
    description: "Cuisine maison, vins choisis et cocktails de caractère.",
    iconSrc: "/img/pictos/3.png",
    iconAlt: "Pictogramme cocktail",
  },
  {
    title: "Salle cosy à l’étage",
    description:
      "Un espace chaleureux pour déjeuner ou dîner en toute tranquillité.",
    iconSrc: "/img/pictos/4.png",
    iconAlt: "Pictogramme fauteuil",
  },
];

const dishItems = [
  {
    title: "Carpaccio de tomates, fenouil & olives",
    subtitle: "Fraîcheur & saison",
    image: "/img/dishes/5.png",
    imageAlt: "Carpaccio de tomates, fenouil et olives",
  },
  {
    title: "Tartare de bœuf préparé au couteau",
    subtitle: "Classique intemporel",
    image: "/img/dishes/2.png",
    imageAlt: "Tartare de bœuf",
  },
  {
    title: "Blanquette de veau, écrasé de pommes de terre",
    subtitle: "Généreux & gourmand",
    image: "/img/dishes/3.png",
    imageAlt: "Blanquette de veau",
  },
  {
    title: "Coupe glacée maison",
    subtitle: "Glacier artisanal",
    image: "/img/dishes/4.png",
    imageAlt: "Coupe glacée maison",
  },
];

const ambienceItems = [
  {
    title: "La Terrasse",
    description:
      "Un coin de soleil en cœur de ville pour vos déjeuners et apéritifs.",
    image: "/img/photos/1.png",
    imageAlt: "La terrasse des Artistes",
  },
  {
    title: "La Salle Principale",
    description: "L’ambiance brasserie : vivante, accueillante et authentique.",
    image: "/img/photos/2.png",
    imageAlt: "La salle principale",
  },
  {
    title: "L’Étage Cosy",
    description:
      "À l’étage, une salle intime et chaleureuse pour vos repas en toute tranquillité.",
    image: "/img/photos/3.png",
    imageAlt: "La salle cosy à l'étage",
  },
];

const footerLinks = [
  { label: "La Brasserie", href: "#brasserie", anchor: true },
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

function HomeNavLink({ item }) {
  const content = (
    <span className="la-home__nav-link">
      {item.label}
      <span
        className={`la-home__nav-underline ${item.active ? "is-active" : ""}`}
        aria-hidden="true"
      />
    </span>
  );

  if (item.anchor) {
    return <a href={item.href}>{content}</a>;
  }

  return <Link href={item.href}>{content}</Link>;
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

export default function HomePageComponent() {
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
    <div className="la-home">
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

          <div className="flex flex-col gap-5 min-[1160px]:flex-1 min-[1160px]:items-center">
            <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 min-[1160px]:justify-center">
              {navigationItems.map((item) => (
                <HomeNavLink key={item.label} item={item} />
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
        <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10  ">
          <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
            <div className="max-w-[390px]">
              <div className="mb-8 h-px w-14 bg-[var(--la-gold)]" />

              <h1 className="la-home__display text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[84px]">
                La brasserie
                <br />
                des sorties
                <br />
                <span className="la-home__script text-[0.8em] text-[var(--la-gold)]">
                  à Limoges
                </span>
              </h1>

              <p className="mt-7 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                À deux pas de l’Opéra, Les Artistes vous accueillent du déjeuner
                au dîner et pour vos envies de dernière minute : un verre, une
                coupe glacée, un moment avant ou après le spectacle.
              </p>

              <div className="mt-7 flex items-center gap-3 text-[17px] text-[rgba(86,57,44,0.9)]">
                <MapPin
                  size={20}
                  strokeWidth={2}
                  className="shrink-0 text-[var(--la-gold)]"
                />
                <span>{address}</span>
              </div>

              <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
                <HomeActionLink
                  href="/reservations"
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver une table
                </HomeActionLink>
                <HomeActionLink
                  href="/menus"
                  secondary
                  className="min-[560px]:min-w-[220px]"
                >
                  Découvrir la carte
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
                        src="/img/photos/4.webp"
                        alt="floor"
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
                        src="/img/hero/2.png"
                        alt="Façade des Artistes"
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
            {featureItems.map((item, index) => {
              return (
                <article
                  key={item.title}
                  className={`flex flex-col items-center px-6 py-8 text-center ${
                    index > 0
                      ? "border-t border-[rgba(197,155,85,0.18)] min-[900px]:border-l min-[900px]:border-t-0"
                      : ""
                  }`}
                >
                  {item.iconSrc ? (
                    <Image
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      width={80}
                      height={80}
                      className="mb-5 h-auto w-[62px]"
                    />
                  ) : null}

                  <h2 className="la-home__feature-title">{item.title}</h2>
                  <p className="mt-3 max-w-[210px] text-[16px] leading-[1.38] text-[rgba(86,57,44,0.86)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="cuisine"
          className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-home__framed-section la-home__framed-section--with-button la-home__framed-section--title-absolute la-home__framed-section--cuisine">
            <div className="la-home__framed-heading la-home__framed-heading--absolute la-home__framed-heading--cuisine text-center">
              <p className="la-home__eyebrow">Les incontournables</p>
              <h2 className="la-home__section-title">
                Notre cuisine de brasserie
              </h2>
            </div>

            <div className="la-home__framed-content la-home__framed-content--with-button px-3 pt-10 tablet:px-6 desktop:px-7">
              <div className="grid gap-6 min-[640px]:grid-cols-2 desktop:grid-cols-4">
                {dishItems.map((item) => (
                  <article
                    key={item.title}
                    className="la-home__dish-card text-center"
                  >
                    <div
                      className="la-home__dish-media relative overflow-hidden"
                      style={{ aspectRatio: "0.95 / 1" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                        className="la-home__dish-image"
                      />
                    </div>

                    <h3 className="mt-5 text-[21px] leading-[1.12] text-[var(--la-burgundy)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 la-home__eyebrow text-[15px] text-[var(--la-gold)]">
                      {item.subtitle}
                    </p>
                  </article>
                ))}
              </div>

              <div className="la-home__frame-button">
                <HomeActionLink
                  href="/menus"
                  secondary
                  className="min-w-[320px] max-w-full"
                >
                  Découvrir la carte & les menus
                </HomeActionLink>
              </div>
            </div>
          </div>
        </section>

        <section
          id="brasserie"
          className="la-shell pb-10 pt-2 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-home__framed-section la-home__framed-section--title-absolute la-home__framed-section--experience">
            <div className="la-home__framed-heading la-home__framed-heading--absolute la-home__framed-heading--experience text-center">
              <h2 className="la-home__section-title">
                Une expérience conviviale
              </h2>
              <p className="mt-2 text-[18px] leading-[1.45] text-[rgba(86,57,44,0.88)]">
                Trois ambiances, une même envie : vous faire passer un bon
                moment.
              </p>
            </div>

            <div className="la-home__framed-content px-5 pb-6 tablet:px-7 desktop:px-8">
              <div className="grid gap-6 desktop:grid-cols-3">
                {ambienceItems.map((item) => (
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
              <div className="flex flex-col gap-6 w-full min-[900px]:items-start">
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
                  <Phone
                    size={26}
                    strokeWidth={2.2}
                    className="shrink-0 text-[var(--la-burgundy)]"
                  />
                  <a
                    href={phoneHref}
                    className="transition-opacity hover:opacity-74"
                  >
                    {phone}
                  </a>
                </div>

                <p className="mt-5 text-[18px] leading-[1.42] text-[rgba(86,57,44,0.9)]">
                  Réservation conseillée, notamment les soirs de spectacle.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pt-2">
        <div className="la-shell">
          <div className="grid gap-8 border-t border-[rgba(197,155,85,0.22)] py-8 min-[960px]:grid-cols-[1.15fr_0.88fr_0.78fr_0.7fr_0.6fr] min-[960px]:gap-0">
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
              <h3 className="la-home__footer-heading">Horaires</h3>
              <p className="mt-4 text-[17px] leading-[1.52] text-[rgba(86,57,44,0.9)]">
                Lundi au Samedi
                <br />
                8h30 - 23h30
                <br />
                Service continu
                <br />
                <br />
                Fermé le dimanche
              </p>
            </div>

            <div className="min-[960px]:border-l min-[960px]:border-[rgba(197,155,85,0.16)] min-[960px]:px-8">
              <h3 className="la-home__footer-heading">Liens rapides</h3>
              <div className="mt-4 flex flex-col gap-3 text-[17px] leading-none text-[rgba(86,57,44,0.9)]">
                {footerLinks.map((item) =>
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
    </div>
  );
}
