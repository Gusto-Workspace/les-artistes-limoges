import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/global.context";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FeatureStripComponent from "@/components/_shared/feature-strip.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import ReservationCtaComponent from "@/components/_shared/reservation-cta.component";
import VenueShowcaseComponent from "@/components/_shared/venue-showcase.component";
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
    image: "/img/photos/outside/5.png",
    imageAlt: "La terrasse des Artistes",
  },
  {
    title: "La salle principale",
    description: "L’ambiance brasserie, vivante et accueillante.",
    image: "/img/photos/floor-0/3.png",
    imageAlt: "La salle principale des Artistes",
  },
  {
    title: "L’étage cosy",
    description: "Une salle plus calme pour un repas en toute tranquillité.",
    image: "/img/photos/floor-1/2.png",
    imageAlt: "L'étage cosy des Artistes",
  },
];

export default function ReservationsPageComponent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const { address, phone, phoneHref } = buildSiteContactSummary(restaurantData);

  return (
    <div className="la-home la-reservations">
      <NavComponent items={navigationItems} />

      <main>
        <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10 desktop:pb-12">
          <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
            <div>
              <h1 className="la-home__display text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[102px]">
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

              <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
                <ActionLinkComponent
                  href="#reservation-form"
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver en ligne
                </ActionLinkComponent>
                <ActionLinkComponent
                  href={phoneHref}
                  secondary
                  className="min-[560px]:min-w-[180px]"
                >
                  Nous appeler
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
                        src="/img/photos/floor-0/3.png"
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

        <FeatureStripComponent items={featureItems} />

        <FormReservationsComponent
          apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
          restaurant={restaurantData}
          dataLoading={restaurantContext.dataLoading}
        />

        <VenueShowcaseComponent
          title="Avant ou après votre venue"
          description="Trois espaces pour prolonger votre moment aux Artistes."
          items={venueItems}
          contentClassName="la-home__framed-content px-5 pb-6 pt-10 tablet:px-7 desktop:px-8"
        />

        <ReservationCtaComponent
          phone={phone}
          phoneHref={phoneHref}
          highlight="et laissez-vous inspirer"
        />
      </main>

      <FooterComponent />
    </div>
  );
}
