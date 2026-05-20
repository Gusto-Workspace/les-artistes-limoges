import Image from "next/image";
import { useContext } from "react";
import { MapPin } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import {
  buildSiteContactSummary,
  getMapEmbedSrc,
} from "@/_assets/utils/contact.utils";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FeatureStripComponent from "@/components/_shared/feature-strip.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import ReservationCtaComponent from "@/components/_shared/reservation-cta.component";
import VenueShowcaseComponent from "@/components/_shared/venue-showcase.component";
import FormContactCompnent from "./form.contact.component";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact", active: true },
];

const accessItems = [
  {
    title: "Réservation de groupe",
    description: "Pour vos repas entre amis ou collègues.",
    iconSrc: "/img/pictos/32.png",
    iconAlt: "Pictogramme groupe",
  },
  {
    title: "Privatisation",
    description: "Un espace convivial pour vos événements.",
    iconSrc: "/img/pictos/29.png",
    iconAlt: "Pictogramme privatisation",
  },
  {
    title: "Terrasse",
    description: "Pour les beaux jours au cœur de Limoges.",
    iconSrc: "/img/pictos/31.png",
    iconAlt: "Pictogramme terrasse",
  },
  {
    title: "Avant l’Opéra",
    description: "Un verre ou un dîner avant le spectacle.",
    iconSrc: "/img/pictos/33.png",
    iconAlt: "Pictogramme opéra",
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
    description: "Une ambiance feutrée pour un repas en toute tranquillité.",
    image: "/img/photos/3.png",
    imageAlt: "L'étage cosy des Artistes",
  },
];

const contactOpeningHours = [
  { day: "Lundi", hours: "10:00–23:30" },
  { day: "Mardi", hours: "10:00–23:30" },
  { day: "Mercredi", hours: "10:00–00:00" },
  { day: "Jeudi", hours: "10:00–00:00" },
  { day: "Vendredi", hours: "10:00–01:00" },
  { day: "Samedi", hours: "10:00–01:00" },
  { day: "Dimanche", hours: "10:00–23:30" },
];

function buildMapLink(address) {
  const query = address || "Les Artistes Limoges";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function ContactPageComponent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const { address, phone, phoneHref, email } =
    buildSiteContactSummary(restaurantData);
  const mapLink = buildMapLink(address);
  const mapSrc = getMapEmbedSrc(restaurantData);

  return (
    <div className="la-home la-contact">
      <NavComponent items={navigationItems} />

      <main>
        <section
          id="contact-hero"
          className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10 desktop:pb-12"
        >
          <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
            <div>
              <h1 className="la-home__display text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[102px]">
                Contact
                <br />
                <span className="la-home__script text-[0.8em] text-[var(--la-gold)]">
                  nous écrire
                </span>
              </h1>

              <p className="mt-7 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                Une question, une réservation de groupe, une privatisation ou
                une demande particulière ? L’équipe des Artistes vous répond
                avec plaisir.
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
                <ActionLinkComponent
                  href="#contact-form"
                  className="min-[560px]:min-w-[190px]"
                >
                  Nous écrire
                </ActionLinkComponent>
                <ActionLinkComponent
                  href="/reservations"
                  secondary
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver une table
                </ActionLinkComponent>
              </div>
            </div>

            <div className="relative min-[1100px]:pl-10">
              <div className="absolute right-0 top-0 hidden h-[170px] w-[160px] desktop:block">
                <HeroOrnamentComponent />
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

        <section
          id="contact-form"
          className="la-shell pb-10 pt-8 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-contact__panel relative overflow-hidden px-5 py-6 tablet:px-7 tablet:py-8 desktop:px-8 desktop:py-9">
            <div className="grid gap-10 desktop:grid-cols-[1fr_0.86fr] desktop:gap-0">
              <div className="desktop:pr-10">
                <div className="mx-auto max-w-[540px] text-center">
                  <h2 className="la-contact__panel-title">Écrivez-nous</h2>
                  <p className="mt-3 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.86)] text-balance">
                    Remplissez le formulaire ci-dessous, nous vous répondrons
                    dans les meilleurs délais.
                  </p>
                </div>

                <div className="mt-8">
                  <FormContactCompnent />
                </div>
              </div>

              <div className="desktop:border-l desktop:border-[rgba(197,155,85,0.22)] desktop:pl-10">
                <h2 className="la-contact__panel-title text-center">
                  Informations pratiques
                </h2>

                <div className="mt-8 space-y-7">
                  <div className="la-contact__practical-row">
                    <Image
                      src="/img/pictos/15.png"
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      className="la-contact__practical-icon"
                    />
                    <div className="la-contact__practical-copy">
                      <p className="la-contact__practical-label">Adresse</p>
                      <a
                        href={mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="la-contact__practical-value hover:opacity-72"
                      >
                        {address}
                      </a>
                    </div>
                  </div>

                  <div className="la-contact__practical-row">
                    <Image
                      src="/img/pictos/28.png"
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      className="la-contact__practical-icon"
                    />
                    <div className="la-contact__practical-copy">
                      <p className="la-contact__practical-label">Téléphone</p>
                      <a
                        href={phoneHref}
                        className="la-contact__practical-value hover:opacity-72"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="la-contact__practical-row">
                    <Image
                      src="/img/pictos/27.png"
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      className="la-contact__practical-icon"
                    />
                    <div className="la-contact__practical-copy">
                      <p className="la-contact__practical-label">E-mail</p>
                      <a
                        href={`mailto:${email}`}
                        className="la-contact__practical-value break-words hover:opacity-72"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="la-contact__practical-row">
                    <Image
                      src="/img/pictos/26.png"
                      alt=""
                      aria-hidden="true"
                      width={26}
                      height={26}
                      className="la-contact__practical-icon"
                    />
                    <div className="la-contact__practical-copy">
                      <p className="la-contact__practical-label">Horaires</p>
                      <div className="la-contact__hours-list">
                        {contactOpeningHours.map((item) => (
                          <div key={item.day} className="la-contact__hours-row">
                            <p className="la-contact__hours-day">{item.day}</p>
                            <p className="la-contact__hours-time">
                              {item.hours}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="la-contact__opera-box mt-7">
                  <Image
                    src="/img/pictos/5.png"
                    alt=""
                    aria-hidden="true"
                    width={34}
                    height={22}
                    className="h-auto w-[34px]"
                  />
                  <p className="text-[18px] leading-[1.42] text-[rgba(86,57,44,0.88)]">
                    Idéal avant ou après
                    <br />
                    un spectacle à l’Opéra.
                  </p>
                </div>

                <div className="la-contact__map-card mt-7">
                  {mapSrc ? (
                    <iframe
                      title="Plan Les Artistes"
                      src={mapSrc}
                      loading="lazy"
                      className="la-contact__map-embed"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="la-contact__map-empty">
                      Carte indisponible pour le moment.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeatureStripComponent
          items={accessItems}
          sectionClassName="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
        />

        <VenueShowcaseComponent
          title="Venir aux Artistes"
          description="Profitez d’une brasserie vivante avec sa terrasse et son étage cosy."
          items={venueItems}
        />

        <ReservationCtaComponent
          phone={phone}
          phoneHref={phoneHref}
          highlight="ou contactez-nous"
        />
      </main>

      <FooterComponent />
    </div>
  );
}
