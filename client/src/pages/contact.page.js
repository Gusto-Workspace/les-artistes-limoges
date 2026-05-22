import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import ContactPageComponent from "@/components/contact/contact.page.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

export default function ContactPage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Contact & accès | Les Artistes Limoges"
        description="Contactez Les Artistes à Limoges : adresse près de l’Opéra, téléphone, horaires, formulaire de contact, accès et informations pratiques."
        path="/contact"
        image="/img/brand/og-les-artistes.jpg"
        pageSchemaType="ContactPage"
        keywords={[
          "contact Les Artistes Limoges",
          "adresse Les Artistes Limoges",
          "horaires brasserie Limoges",
        ]}
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
