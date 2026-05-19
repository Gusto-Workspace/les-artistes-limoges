import { useEffect, useRef, useState } from "react";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import MapContactComponent from "@/components/contact/map.contact.component";
import InfosContactComponent from "@/components/contact/infos.contact.component";
import BannerComponent from "@/components/_shared/banner/banner.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function ContactPage({ seoRestaurantData = null }) {
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
        title="Les Artistes | Contact"
        description="Adresse, téléphone, horaires, carte et formulaire de contact du site Les Artistes."
        path="/contact"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
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
            title="Nous contacter"
            eyebrow="Échanger"
            description="Retrouvez ici les coordonnées du restaurant, le formulaire de contact et la carte pour organiser votre venue."
            imgUrl="contact/header_contact.webp"
          />
        </div>

        <MapContactComponent />
        <InfosContactComponent />
        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
