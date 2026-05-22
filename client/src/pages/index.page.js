import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import HomePageComponent from "@/components/home/home.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function HomePage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Brasserie, bar & glacier à Limoges"
        description="Les Artistes à Limoges : brasserie, bar et glacier près de l’Opéra. Cuisine maison, terrasse, carte de saison et réservation de table en ligne."
        path="/"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[{ name: "Accueil", path: "/" }]}
        keywords={[
          "terrasse Limoges",
          "cuisine maison Limoges",
          "brasserie près de l'Opéra de Limoges",
        ]}
        restaurantData={seoRestaurantData}
      />

      <HomePageComponent />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
