import { useContext, useEffect, useRef, useState } from "react";

// CONTEXT
import { GlobalContext } from "@/contexts/global.context";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import BannerComponent from "@/components/_shared/banner/banner.component";
import FormReservationsComponent from "@/components/reservations/form.reservations.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function ReservationsPage({ seoRestaurantData = null }) {
  const { restaurantContext } = useContext(GlobalContext);

  const heroRef = useRef(null);
  const [showScrolledNav, setShowScrolledNav] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrolledNav(entry.intersectionRatio <= 0.1);
      },
      {
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Réservations"
        description="Réservez une table sur le site Les Artistes et choisissez votre date, votre horaire et votre nombre de convives."
        path="/reservations"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Réservations", path: "/reservations" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent
          isVisible={!showScrolledNav}
          scrolled={false}
          logoSrc="/img/logo.webp"
        />

        <NavComponent
          isVisible={showScrolledNav}
          scrolled={true}
          logoSrc="/img/logo.webp"
        />

        <div ref={heroRef}>
          <BannerComponent
            title="Réserver une table"
            eyebrow="Réservations"
            description="Choisissez votre date, votre horaire et vos informations de contact pour finaliser votre demande de réservation."
            imgUrl="reservations/header_reservations.webp"
          />
        </div>

        <FormReservationsComponent
          apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
          restaurant={restaurantContext.restaurantData}
          dataLoading={restaurantContext.dataLoading}
        />

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
