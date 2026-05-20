import { useContext } from "react";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import BannerComponent from "@/components/_shared/banner/banner.component";
import ListMenusComponent from "@/components/menus/list.menus.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

// CONTEXT
import { GlobalContext } from "@/contexts/global.context";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus", active: true },
  { label: "Actualités", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export default function MenusPage({ seoRestaurantData = null }) {
  const { restaurantContext } = useContext(GlobalContext);

  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Menus"
        description="Consultez la page menus du site Les Artistes : carte, plats, formules et contenus publiés par le restaurant."
        path="/menus"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Menus", path: "/menus" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent items={navigationItems} />

        <BannerComponent
          title="Menus"
          eyebrow="La carte"
          description="La page rassemble les plats, les menus et les formules visibles sur le site, dans une structure plus claire et plus directe."
          imgUrl="menu-inspired/header_menu.webp"
        />

        <ListMenusComponent restaurantData={restaurantContext.restaurantData} />

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
