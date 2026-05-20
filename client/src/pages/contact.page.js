import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import ContactPageComponent from "@/components/contact/contact.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function ContactPage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Contact"
        description="Contactez Les Artistes à Limoges : formulaire, téléphone, horaires, informations pratiques et accès au restaurant."
        path="/contact"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <ContactPageComponent />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
