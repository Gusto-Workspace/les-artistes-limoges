import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import MenusPageComponent from "@/components/menus/menus.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function MenusPage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Carte & Menus"
        description="Consultez la carte et les menus des Artistes à Limoges : suggestions de brasserie, entrées, plats, desserts et formules du moment."
        path="/menus"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Carte & Menus", path: "/menus" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <MenusPageComponent />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
