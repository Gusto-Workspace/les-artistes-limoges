import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import ReservationsPageComponent from "@/components/reservations/reservations.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function ReservationsPage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Réserver"
        description="Réservez votre table chez Les Artistes à Limoges : nombre de convives, date, horaire et informations de contact dans une interface claire."
        path="/reservations"
        image="/img/brand/og-les-artistes.svg"
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
