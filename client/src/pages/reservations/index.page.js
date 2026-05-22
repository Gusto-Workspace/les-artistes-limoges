import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import ReservationsPageComponent from "@/components/reservations/reservations.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function ReservationsPage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Réserver une table | Les Artistes Limoges"
        description="Réservez votre table aux Artistes à Limoges : choisissez le nombre de convives, la date et l’horaire pour votre repas en brasserie."
        path="/reservations"
        image="/img/brand/og-les-artistes.svg"
        keywords={[
          "réservation restaurant Limoges",
          "réserver brasserie Limoges",
          "réserver Les Artistes Limoges",
        ]}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Réserver", path: "/reservations" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <ReservationsPageComponent />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
