import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import MenusPageComponent from "@/components/menus/menus.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function MenusPage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Carte & menus | Les Artistes Limoges"
        description="Consultez la carte des Artistes à Limoges : cuisine de brasserie, plats maison, suggestions de saison, desserts et formules du moment."
        path="/menus"
        image="/img/brand/og-les-artistes.svg"
        pageSchemaType="WebPage"
        keywords={[
          "carte restaurant Limoges",
          "menu brasserie Limoges",
          "plats maison Limoges",
        ]}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Carte & Menus", path: "/menus" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <MenusPageComponent initialRestaurantData={seoRestaurantData} />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
