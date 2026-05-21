import Link from "next/link";
import { useContext } from "react";
import LegalDocumentPageComponent from "@/components/legal/legal-document.page.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";
import { GlobalContext } from "@/contexts/global.context";

export default function PolicyPage({ seoRestaurantData = null }) {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData || seoRestaurantData;
  const restaurantName =
    String(restaurantData?.name || "").trim() || "Les Artistes";
  const { address, phone, email } = buildSiteContactSummary(restaurantData);
  const summaryItems = [
    {
      label: "Données concernées",
      value: "Contact, réservation et éléments techniques nécessaires au service.",
    },
    {
      label: "Finalités",
      value: "Répondre aux demandes, gérer les réservations et assurer le bon fonctionnement du site.",
    },
    {
      label: "Exercer vos droits",
      value: `Via la page contact, par e-mail à ${email} ou par téléphone au ${phone}.`,
    },
  ];
  const sections = [
    {
      id: "policy-controller",
      title: "Responsable du traitement",
      content: (
        <>
          <p>
            Le responsable du traitement des données personnelles collectées via
            le site correspond à l’exploitant du restaurant{" "}
            <strong>{restaurantName}</strong>.
          </p>
          <p>
            Coordonnées de contact : <strong>{address}</strong>,{" "}
            <Link href={`mailto:${email}`}>{email}</Link>,{" "}
            <Link href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</Link>.
          </p>
        </>
      ),
    },
    {
      id: "policy-data",
      title: "Données susceptibles d’être collectées",
      content: (
        <>
          <ul>
            <li>
              Formulaire de contact : prénom, nom, e-mail, téléphone et contenu
              du message.
            </li>
            <li>
              Réservation : identité de contact, nombre de convives, date,
              horaire et commentaire éventuel.
            </li>
            <li>
              Données techniques strictement nécessaires au bon fonctionnement du
              site et à la continuité de certaines étapes de réservation.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "policy-purposes",
      title: "Finalités du traitement",
      content: (
        <>
          <ul>
            <li>Répondre aux demandes envoyées via le formulaire.</li>
            <li>
              Gérer, confirmer et suivre les réservations effectuées sur le site.
            </li>
            <li>
              Sécuriser certaines réservations lorsqu’un prestataire spécialisé
              intervient dans le parcours.
            </li>
            <li>
              Assurer le fonctionnement technique du site et conserver les
              éléments utiles au suivi des échanges.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "policy-bases",
      title: "Bases juridiques",
      content: (
        <>
          <p>
            Les traitements sont réalisés selon les cas sur la base de
            l’exécution de mesures précontractuelles ou contractuelles, du
            respect d’obligations légales ou de l’intérêt légitime de
            l’exploitant à administrer son activité et ses réservations.
          </p>
        </>
      ),
    },
    {
      id: "policy-recipients",
      title: "Destinataires des données",
      content: (
        <>
          <p>
            Les données sont accessibles uniquement aux personnes habilitées et
            aux prestataires techniques nécessaires au service.
          </p>
          <ul>
            <li>
              Prestataire d’e-mail transactionnel pour l’envoi des messages de
              contact.
            </li>
            <li>
              Prestataire de paiement ou de sécurisation de réservation lorsqu’un
              parcours spécifique est activé.
            </li>
            <li>
              Prestataires techniques liés à l’hébergement, à l’infrastructure et
              à la maintenance du site.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "policy-retention",
      title: "Durée de conservation",
      content: (
        <>
          <p>
            Les données sont conservées pendant la durée strictement nécessaire à
            la finalité poursuivie, puis archivées lorsque cela est nécessaire au
            respect des obligations légales ou à la gestion d’un éventuel litige.
          </p>
          <ul>
            <li>
              Les messages de contact sont conservés le temps utile au traitement
              de la demande.
            </li>
            <li>
              Les données de réservation sont conservées pour la gestion
              opérationnelle du service et son suivi administratif.
            </li>
            <li>
              Les stockages locaux techniques sont supprimés ou expirent
              automatiquement selon leur usage.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "policy-cookies",
      title: "Cookies et stockages techniques",
      content: (
        <>
          <p>
            Le site n’intègre pas, à notre connaissance, de suivi publicitaire
            tiers dans sa version actuelle. En revanche, certains stockages
            techniques du navigateur peuvent être utilisés pour le bon
            fonctionnement du site, notamment pour conserver un état temporaire
            lié à la navigation ou à une réservation en cours.
          </p>
        </>
      ),
    },
    {
      id: "policy-transfers",
      title: "Transferts hors Union européenne",
      content: (
        <>
          <p>
            Certains prestataires techniques peuvent traiter certaines données en
            dehors de l’Union européenne. Le cas échéant, ces transferts doivent
            être encadrés par les garanties juridiques appropriées prévues par la
            réglementation applicable.
          </p>
        </>
      ),
    },
    {
      id: "policy-rights",
      title: "Vos droits",
      content: (
        <>
          <p>
            Vous pouvez demander l’accès à vos données, leur rectification, leur
            effacement, la limitation de certains traitements ou vous opposer à
            un traitement lorsque la loi le permet.
          </p>
          <p>
            Pour exercer vos droits, vous pouvez utiliser la{" "}
            <Link href="/contact">page contact</Link> ou écrire à{" "}
            <Link href={`mailto:${email}`}>{email}</Link>.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            également introduire une réclamation auprès de la CNIL.
          </p>
        </>
      ),
    },
    {
      id: "policy-update",
      title: "Mise à jour de la politique",
      content: (
        <>
          <p>
            Cette politique peut être mise à jour pour refléter une évolution du
            site, des outils utilisés ou du cadre légal. La version publiée sur
            cette page est celle applicable à la date de consultation.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Politique de confidentialité"
        description="Consultez la politique de confidentialité du site Les Artistes : données traitées, finalités, conservation et droits associés."
        path="/policy"
        image="/img/brand/og-les-artistes.svg"
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Politique de confidentialité", path: "/policy" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <LegalDocumentPageComponent
        title="Politique"
        highlight="de confidentialité"
        description="Cette page résume les données pouvant être traitées via le site, leurs finalités et les droits associés."
        panelEyebrow="Protection"
        panelTitle="Protection des données"
        panelDescription="Les traitements décrits ci-dessous correspondent aux fonctionnalités actuellement visibles sur le site : contact, réservation et services techniques associés."
        summaryItems={summaryItems}
        sections={sections}
      />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
