import Head from "next/head";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/global.context";
import {
  DEFAULT_SITE_NAME,
  DEFAULT_SOCIAL_IMAGE,
  buildAbsoluteUrl,
  buildSeoSchemas,
  normalizeBaseUrl,
} from "@/_assets/utils/seo.utils";

export default function SeoHead({
  title,
  description,
  path = "/",
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
  noIndex = false,
  breadcrumbs = [],
  restaurantData = null,
  pageSchemaType = "WebPage",
  keywords = [],
}) {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantSeoData = restaurantData || restaurantContext?.restaurantData;
  const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_BASE_URL);
  const canonicalUrl = buildAbsoluteUrl(baseUrl, path);
  const resolvedImage =
    image === "/img/brand/og-les-artistes.svg" ? DEFAULT_SOCIAL_IMAGE : image;
  const imageUrl = buildAbsoluteUrl(baseUrl, resolvedImage);
  const city = restaurantSeoData?.address?.city || "Limoges";
  const region = restaurantSeoData?.address?.region || "Nouvelle-Aquitaine";
  const postalCode = restaurantSeoData?.address?.zipCode || "87000";
  const latitude = Number(
    restaurantSeoData?.geo?.latitude ??
      restaurantSeoData?.latitude ??
      restaurantSeoData?.address?.latitude,
  );
  const longitude = Number(
    restaurantSeoData?.geo?.longitude ??
      restaurantSeoData?.longitude ??
      restaurantSeoData?.address?.longitude,
  );
  const hasGeoPosition =
    Number.isFinite(latitude) && Number.isFinite(longitude);
  const keywordContent = Array.from(
    new Set(
      [
        "Les Artistes",
        "restaurant Limoges",
        "brasserie Limoges",
        "bar Limoges",
        "glacier Limoges",
        "restaurant près Opéra Limoges",
        ...keywords,
      ].filter(Boolean),
    ),
  ).join(", ");
  const robots = noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const schemas = buildSeoSchemas({
    baseUrl,
    restaurant: restaurantSeoData,
    title,
    description,
    canonicalUrl,
    imageUrl,
    breadcrumbs,
    pageSchemaType,
  });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="robots" content={robots} />
      <meta name="author" content={DEFAULT_SITE_NAME} />
      <meta name="application-name" content={DEFAULT_SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={DEFAULT_SITE_NAME} />
      <meta name="theme-color" content="#6f202a" />
      <meta
        name="format-detection"
        content="telephone=yes, address=yes, email=yes"
      />
      <meta name="geo.region" content="FR-87" />
      <meta name="geo.placename" content={city} />
      {hasGeoPosition ? (
        <>
          <meta name="geo.position" content={`${latitude};${longitude}`} />
          <meta name="ICBM" content={`${latitude}, ${longitude}`} />
        </>
      ) : null}
      <meta name="business:contact_data:locality" content={city} />
      <meta name="business:contact_data:region" content={region} />
      <meta name="business:contact_data:postal_code" content={postalCode} />
      {!noIndex ? <link rel="canonical" href={canonicalUrl} /> : null}
      {!noIndex ? (
        <>
          <link rel="alternate" hrefLang="fr-FR" href={canonicalUrl} />
          <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        </>
      ) : null}

      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {!noIndex
        ? schemas.map((schema, index) => (
            <script
              key={`seo-schema-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
              }}
            />
          ))
        : null}
    </Head>
  );
}
