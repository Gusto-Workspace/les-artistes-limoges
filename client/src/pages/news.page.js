import { useContext } from "react";

// COMPONENTS
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import BannerComponent from "@/components/_shared/banner/banner.component";
import ListNewsComponent from "@/components/news/list.news.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

// CONTEXT
import { GlobalContext } from "@/contexts/global.context";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Actualités", href: "/news", active: true },
  { label: "Contact", href: "/contact" },
];

export default function NewsPage({ seoRestaurantData = null }) {
  const { restaurantContext } = useContext(GlobalContext);

  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Actualités"
        description="Retrouvez les actualités, annonces et nouveautés publiées sur le site Les Artistes."
        path="/news"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Actualités", path: "/news" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="relative">
        <NavComponent items={navigationItems} />

        <BannerComponent
          title="Actualités"
          eyebrow="Le fil du lieu"
          description="Événements, nouveautés, annonces de service et contenus éditoriaux du restaurant."
          imgUrl="news/header_news.webp"
        />

        <ListNewsComponent
          restaurantData={restaurantContext?.restaurantData}
          dataLoading={restaurantContext?.dataLoading}
        />

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
