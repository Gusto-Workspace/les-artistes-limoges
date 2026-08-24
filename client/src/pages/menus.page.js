import { useContext } from "react";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import MenusPageComponent from "@/components/menus/menus.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";
import { GlobalContext } from "@/contexts/global.context";
import GustoPrintComponent, {
  useGustoPrintMode,
} from "@/components/_shared/gusto-print/gusto-print.component";

export default function MenusPage({ seoRestaurantData = null }) {
  const { restaurantContext } = useContext(GlobalContext);
  const { printMode, autoPrint } = useGustoPrintMode();
  const restaurantData = restaurantContext.restaurantData || seoRestaurantData;
  const menuContent = (
    <MenusPageComponent
      initialRestaurantData={seoRestaurantData}
      printMode={printMode}
    />
  );
  return (
    <>
      <SeoHeadComponent
        title="Carte & menus | Les Artistes Limoges"
        description="Consultez la carte des Artistes à Limoges : cuisine de brasserie, plats maison, suggestions de saison, desserts et formules du moment."
        path="/menus"
        image="/img/brand/og-les-artistes.jpg"
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

      {printMode ? (
        <GustoPrintComponent
          autoPrint={autoPrint}
          restaurant={restaurantData}
          dataLoading={restaurantContext.dataLoading && !seoRestaurantData}
          dataError={restaurantContext.dataError && !seoRestaurantData}
        >
          {menuContent}
        </GustoPrintComponent>
      ) : (
        menuContent
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
