import Image from "next/image";
import { useContext } from "react";
import { MapPin } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FeatureStripComponent from "@/components/_shared/feature-strip.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import ReservationCtaComponent from "@/components/_shared/reservation-cta.component";
import VenueShowcaseComponent from "@/components/_shared/venue-showcase.component";

const navigationItems = [
  { label: "Accueil", href: "/", active: true },
  { label: "Carte & Menus", href: "/menus" },
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
    title: "Salle à l’étage",
    description: "Un espace chaleureux pour manger en toute tranquillité.",
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

export default function HomePageComponent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const { address, phone, phoneHref } = buildSiteContactSummary(restaurantData);

  return (
    <div className="la-home">
      <NavComponent items={navigationItems} />

      <main>
        <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10">
          <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
            <div>
              <h1 className="la-home__display text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[102px]">
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
                <ActionLinkComponent
                  href="/reservations"
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver une table
                </ActionLinkComponent>
                <ActionLinkComponent
                  href="/menus"
                  secondary
                  className="min-[560px]:min-w-[220px]"
                >
                  Découvrir la carte
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
                        src="/img/photos/4.webp"
                        alt="Carpaccio des Artistes"
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

        <FeatureStripComponent items={featureItems} />

        <section
          id="cuisine"
          className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-home__framed-section la-home__framed-section--with-button la-home__framed-section--title-absolute la-home__framed-section--cuisine">
            <div className="la-home__framed-heading la-home__framed-heading--absolute la-home__framed-heading--cuisine text-center">
              <p className="la-home__eyebrow">Les incontournables</p>
              <div className="la-home__framed-title-row la-home__framed-title-row--with-lines">
                <h2 className="la-home__section-title">
                  Notre cuisine de brasserie
                </h2>
              </div>
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
                <ActionLinkComponent
                  href="/menus"
                  secondary
                  className="min-w-[320px] max-w-full"
                >
                  Découvrir la carte & les menus
                </ActionLinkComponent>
              </div>
            </div>
          </div>
        </section>

        <VenueShowcaseComponent
          sectionId="brasserie"
          title="Une expérience conviviale"
          description="Trois ambiances, une même envie : vous faire passer un bon moment."
          items={ambienceItems}
          sectionClassName="la-shell pb-10 pt-2 tablet:pb-12 desktop:pb-14"
          headingClassName="la-home__framed-heading--experience"
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
