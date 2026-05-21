import Link from "next/link";
import LegalDocumentPageComponent from "@/components/legal/legal-document.page.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

const summaryItems = [
  {
    label: "Édition",
    value: "Site édité pour le restaurant Les Artistes à Limoges.",
  },
  {
    label: "Hébergement",
    value: "Infrastructure Vercel Inc. pour la diffusion du site.",
  },
  {
    label: "Validation à prévoir",
    value:
      "Les identifiants juridiques définitifs de l’exploitant doivent être confirmés avant publication finale.",
  },
];

const sections = [
  {
    id: "legal-editor",
    title: "Éditeur du site",
    content: (
      <>
        <p>
          Le présent site internet est édité pour le restaurant{" "}
          <strong>Les Artistes</strong>.
        </p>
        <p>
          Les éléments d’identification complets de l’exploitant tels que la
          raison sociale, le SIRET, le RCS, le numéro de TVA, l’adresse
          juridique et les coordonnées administratives doivent être validés et
          complétés par l’établissement avant publication définitive.
        </p>
      </>
    ),
  },
  {
    id: "legal-publication",
    title: "Direction de la publication",
    content: (
      <>
        <p>
          La direction de la publication est assurée par la personne ou la
          société en charge de l’exploitation du restaurant, sous réserve d’une
          désignation interne différente au moment de la publication
          définitive.
        </p>
      </>
    ),
  },
  {
    id: "legal-hosting",
    title: "Hébergement",
    content: (
      <>
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong>.
        </p>
        <ul>
          <li>
            Adresse : 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis
          </li>
          <li>
            Site web :{" "}
            <Link href="https://vercel.com" target="_blank" rel="noreferrer">
              vercel.com
            </Link>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-purpose",
    title: "Objet du site",
    content: (
      <>
        <p>
          Le site a pour objet de présenter le restaurant Les Artistes, sa
          carte, ses menus, ses informations pratiques, son service de
          réservation ainsi que sa page de contact.
        </p>
      </>
    ),
  },
  {
    id: "legal-ip",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L’ensemble des contenus présents sur le site, notamment les textes,
          photographies, graphismes, logos, éléments d’identité visuelle,
          structure des pages et développements, est protégé par les règles
          applicables en matière de propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, adaptation, diffusion ou exploitation, totale ou
          partielle, sans autorisation préalable écrite, est interdite sauf
          disposition légale impérative contraire.
        </p>
      </>
    ),
  },
  {
    id: "legal-liability",
    title: "Responsabilité",
    content: (
      <>
        <p>
          Malgré le soin apporté à la mise à jour des contenus, certaines
          informations peuvent évoluer, devenir inexactes ou nécessiter une
          validation complémentaire. L’utilisateur reste responsable de l’usage
          qu’il fait des informations consultées sur le site.
        </p>
        <p>
          L’éditeur ne peut être tenu responsable des indisponibilités
          temporaires du service, d’un dysfonctionnement technique ou du
          contenu des sites tiers accessibles via des liens externes.
        </p>
      </>
    ),
  },
  {
    id: "legal-privacy",
    title: "Données personnelles",
    content: (
      <>
        <p>
          Les modalités de collecte, d’utilisation et de conservation des
          données personnelles éventuellement traitées via le site sont
          décrites dans la{" "}
          <Link href="/policy">politique de confidentialité</Link>.
        </p>
      </>
    ),
  },
  {
    id: "legal-law",
    title: "Droit applicable",
    content: (
      <>
        <p>
          Les présentes mentions légales sont soumises au droit français. Sous
          réserve des règles d’ordre public applicables, tout litige relatif au
          site relève des juridictions territorialement compétentes du ressort
          de l’exploitant.
        </p>
      </>
    ),
  },
];

export default function LegalesPage({ seoRestaurantData = null }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Mentions légales"
        description="Consultez les mentions légales du site Les Artistes : édition, hébergement, propriété intellectuelle et cadre d’utilisation."
        path="/legales"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/legales" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <LegalDocumentPageComponent
        title="Mentions"
        highlight="légales"
        description="Les informations d’identification du site, de son hébergement et du cadre général d’utilisation sont regroupées ici."
        panelEyebrow="Cadre légal"
        panelTitle="Informations administratives"
        panelDescription="Cette page présente les principales informations administratives, techniques et juridiques liées au site Les Artistes."
        summaryItems={summaryItems}
        sections={sections}
      />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
