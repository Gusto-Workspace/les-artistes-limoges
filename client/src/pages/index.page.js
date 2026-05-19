import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import HomePageComponent from "@/components/home/home.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function HomePage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Accueil"
        description="Découvrez Les Artistes à Limoges : une brasserie à deux pas de l’Opéra, sa carte, ses actualités, ses réservations et ses informations de contact."
        path="/"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[{ name: "Accueil", path: "/" }]}
        restaurantData={seoRestaurantData}
      />

      <HomePageComponent />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
