import {
  getRestaurantDisplayName,
  getSocialLinks,
  getVisibleDishCategories,
  getVisibleMenuCategories,
} from "./site-display.utils";

export const DEFAULT_SITE_NAME = "Les Artistes";
export const DEFAULT_SITE_URL = "https://brasserielesartistes.fr";
export const DEFAULT_SOCIAL_IMAGE = "/img/brand/og-les-artistes.svg";
export const DEFAULT_LOGO_IMAGE = "/img/logo.png";

const DEFAULT_RESTAURANT = {
  phone: "05 55 34 12 43",
  email: "contact@brasserielesartistes.fr",
  address: {
    line1: "4 rue Fitz-James",
    zipCode: "87000",
    city: "Limoges",
    country: "FR",
  },
};

const schemaDayByKey = {
  lundi: "Monday",
  monday: "Monday",
  mardi: "Tuesday",
  tuesday: "Tuesday",
  mercredi: "Wednesday",
  wednesday: "Wednesday",
  jeudi: "Thursday",
  thursday: "Thursday",
  vendredi: "Friday",
  friday: "Friday",
  samedi: "Saturday",
  saturday: "Saturday",
  dimanche: "Sunday",
  sunday: "Sunday",
};

function normalizeText(value) {
  return String(value || "").trim();
}

function firstText(...values) {
  return values.map(normalizeText).find(Boolean) || "";
}

function toFiniteNumber(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function normalizeDayKey(value) {
  return normalizeText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function normalizeBaseUrl(value) {
  const sanitizedValue = String(value || "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\s+/g, "");

  if (!sanitizedValue) {
    return DEFAULT_SITE_URL;
  }

  const normalizedValue = sanitizedValue.replace(/\/+$/, "");

  if (/^https?:\/\//i.test(normalizedValue)) {
    try {
      return new URL(normalizedValue).toString().replace(/\/+$/, "");
    } catch {
      return normalizedValue;
    }
  }

  const protocol = /^(localhost|127\.0\.0\.1)(:\d+)?(?:\/.*)?$/i.test(
    normalizedValue,
  )
    ? "http"
    : "https";

  try {
    return new URL(`${protocol}://${normalizedValue}`)
      .toString()
      .replace(/\/+$/, "");
  } catch {
    return `${protocol}://${normalizedValue}`.replace(/\/+$/, "");
  }
}

export function buildAbsoluteUrl(baseUrl, path) {
  if (!path) {
    return baseUrl;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function toSchemaPostalAddress(address) {
  if (!address || typeof address !== "object") {
    return null;
  }

  const streetAddress = firstText(
    address.line1,
    address.streetAddress,
    address.street,
    address.address,
  );
  const postalCode = firstText(
    address.zipCode,
    address.postalCode,
    address.zip,
  );
  const addressLocality = firstText(
    address.city,
    address.addressLocality,
    address.locality,
  );
  const addressCountry = normalizeText(address.country) || "FR";
  const addressRegion = normalizeText(address.region || address.state);

  if (!streetAddress && !postalCode && !addressLocality) {
    return null;
  }

  return {
    "@type": "PostalAddress",
    streetAddress: streetAddress || undefined,
    postalCode: postalCode || undefined,
    addressLocality: addressLocality || undefined,
    addressRegion: addressRegion || undefined,
    addressCountry,
  };
}

function toMapUrl(address, businessName) {
  const query = [
    firstText(address?.line1, address?.streetAddress, address?.street),
    firstText(address?.zipCode, address?.postalCode, address?.zip),
    firstText(address?.city, address?.addressLocality, address?.locality),
    normalizeText(address?.country),
  ]
    .filter(Boolean)
    .join(", ");

  const searchQuery = query || normalizeText(businessName);

  if (!searchQuery) {
    return "";
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
}

function toAreaServed(address) {
  const city = firstText(
    address?.city,
    address?.addressLocality,
    address?.locality,
  );
  const region = normalizeText(address?.region || address?.state);
  const country = normalizeText(address?.country) || "France";

  return compactObject([
    city
      ? {
          "@type": "City",
          name: city,
        }
      : null,
    region
      ? {
          "@type": "AdministrativeArea",
          name: region,
        }
      : null,
    country
      ? {
          "@type": "Country",
          name: country,
        }
      : null,
  ]);
}

function toGeoCoordinates(restaurant) {
  const latitude = toFiniteNumber(
    restaurant?.geo?.latitude ??
      restaurant?.geo?.lat ??
      restaurant?.latitude ??
      restaurant?.lat ??
      restaurant?.address?.latitude ??
      restaurant?.address?.lat,
  );
  const longitude = toFiniteNumber(
    restaurant?.geo?.longitude ??
      restaurant?.geo?.lng ??
      restaurant?.geo?.lon ??
      restaurant?.longitude ??
      restaurant?.lng ??
      restaurant?.lon ??
      restaurant?.address?.longitude ??
      restaurant?.address?.lng ??
      restaurant?.address?.lon,
  );

  if (latitude === null || longitude === null) {
    return null;
  }

  return {
    "@type": "GeoCoordinates",
    latitude,
    longitude,
  };
}

function toContactPoint({ phone, email, baseUrl }) {
  const telephone = normalizeText(phone);
  const contactEmail = normalizeText(email);

  if (!telephone && !contactEmail) {
    return null;
  }

  return compactObject({
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: telephone || undefined,
    email: contactEmail || undefined,
    availableLanguage: ["fr", "en"],
    url: buildAbsoluteUrl(baseUrl, "/contact"),
  });
}

function toOpeningHoursSpecification(openingHours) {
  if (!Array.isArray(openingHours)) {
    return [];
  }

  return openingHours.flatMap((dayData) => {
    const dayOfWeek = schemaDayByKey[normalizeDayKey(dayData?.day)];

    if (!dayOfWeek) {
      return [];
    }

    if (
      dayData?.isClosed ||
      !Array.isArray(dayData?.hours) ||
      dayData.hours.length === 0
    ) {
      return [];
    }

    return dayData.hours
      .map((range) => {
        const opens = normalizeText(range?.open);
        const closes = normalizeText(range?.close);

        if (!opens || !closes) {
          return null;
        }

        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek,
          opens,
          closes,
        };
      })
      .filter(Boolean);
  });
}

function toSchemaPrice(value) {
  const rawValue = normalizeText(value)
    .replace(/\s/g, "")
    .replace("€", "")
    .replace(",", ".");
  const numericValue = Number(rawValue);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "";
  }

  return numericValue.toFixed(2);
}

function toMenuSchema({ restaurant, baseUrl, restaurantId }) {
  const categories = [
    ...getVisibleMenuCategories(restaurant),
    ...getVisibleDishCategories(restaurant),
  ];

  if (!categories.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${baseUrl}/menus#menu`,
    name: `Carte et menus - ${getRestaurantDisplayName()}`,
    url: buildAbsoluteUrl(baseUrl, "/menus"),
    inLanguage: "fr-FR",
    provider: {
      "@id": restaurantId,
    },
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.title,
      description: category.description || undefined,
      hasMenuItem: category.items.map((item) => {
        const price = toSchemaPrice(item.price);

        return {
          "@type": "MenuItem",
          name: item.name,
          description: item.description || undefined,
          offers: price
            ? {
                "@type": "Offer",
                price,
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
              }
            : undefined,
        };
      }),
    })),
  };
}

function compactObject(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => compactObject(item))
      .filter((item) => item !== null && item !== undefined && item !== "");
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .map(([key, entryValue]) => [key, compactObject(entryValue)])
      .filter(([, entryValue]) => {
        if (Array.isArray(entryValue)) {
          return entryValue.length > 0;
        }

        return (
          entryValue !== null && entryValue !== undefined && entryValue !== ""
        );
      }),
  );
}

export function getSeoRouteEntries(baseUrl) {
  const routes = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/menus", priority: "0.9", changefreq: "weekly" },
    { path: "/reservations", priority: "0.9", changefreq: "weekly" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" },
    { path: "/news", priority: "0.7", changefreq: "weekly" },
    { path: "/legales", priority: "0.3", changefreq: "yearly" },
    { path: "/policy", priority: "0.3", changefreq: "yearly" },
  ];

  return routes.map((route) => ({
    ...route,
    url: buildAbsoluteUrl(baseUrl, route.path),
  }));
}

export function buildSeoSchemas({
  baseUrl,
  restaurant,
  title,
  description,
  canonicalUrl,
  imageUrl,
  breadcrumbs = [],
  pageSchemaType = "WebPage",
}) {
  const restaurantData = {
    ...DEFAULT_RESTAURANT,
    ...(restaurant || {}),
    address: {
      ...DEFAULT_RESTAURANT.address,
      ...(restaurant?.address || {}),
    },
  };
  const siteName = getRestaurantDisplayName();
  const socialLinks = getSocialLinks(restaurantData).map((item) => item.href);
  const websiteId = `${baseUrl}/#website`;
  const organizationId = `${baseUrl}/#organization`;
  const restaurantId = `${baseUrl}/#restaurant`;
  const address = toSchemaPostalAddress(restaurantData.address);
  const logoUrl = buildAbsoluteUrl(baseUrl, DEFAULT_LOGO_IMAGE);
  const contactPoint = toContactPoint({
    phone: restaurantData.phone,
    email: restaurantData.email,
    baseUrl,
  });
  const hasMap = toMapUrl(restaurantData.address, siteName);
  const areaServed = toAreaServed(restaurantData.address);
  const geo = toGeoCoordinates(restaurantData);
  const menuSchema = toMenuSchema({
    restaurant: restaurantData,
    baseUrl,
    restaurantId,
  });

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
      image: logoUrl,
      sameAs: socialLinks,
      contactPoint,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      url: baseUrl,
      inLanguage: "fr-FR",
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": pageSchemaType,
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: "fr-FR",
      isPartOf: {
        "@id": websiteId,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: imageUrl,
      },
      about: {
        "@id": restaurantId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": restaurantId,
      name: siteName,
      url: baseUrl,
      image: imageUrl,
      logo: logoUrl,
      servesCuisine: ["Restaurant"],
      acceptsReservations: true,
      menu: buildAbsoluteUrl(baseUrl, "/menus"),
      telephone: normalizeText(restaurant?.phone) || undefined,
      email: normalizeText(restaurant?.email) || undefined,
      address,
      openingHoursSpecification: toOpeningHoursSpecification(
        restaurant?.opening_hours,
      ),
      hasMap: hasMap || undefined,
      areaServed: areaServed.length ? areaServed : undefined,
      currenciesAccepted: "EUR",
      sameAs: socialLinks,
      mainEntityOfPage: canonicalUrl,
      parentOrganization: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      name: ["Accueil", "Carte & Menus", "Réservations", "Contact"],
      url: [
        baseUrl,
        buildAbsoluteUrl(baseUrl, "/menus"),
        buildAbsoluteUrl(baseUrl, "/reservations"),
        buildAbsoluteUrl(baseUrl, "/contact"),
      ],
    },
  ];

  schemas[3] = compactObject({
    ...schemas[3],
    servesCuisine: ["Cuisine française", "Brasserie", "Bar", "Glacier"],
    priceRange: "€€",
    paymentAccepted: ["Cash", "Credit Card"],
    geo,
    hasMenu: menuSchema
      ? {
          "@id": `${baseUrl}/menus#menu`,
        }
      : undefined,
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: buildAbsoluteUrl(baseUrl, "/reservations"),
        inLanguage: "fr-FR",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: `Réservation ${siteName}`,
      },
    },
  });

  if (menuSchema) {
    schemas.push(menuSchema);
  }

  if (breadcrumbs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: buildAbsoluteUrl(baseUrl, item.path),
      })),
    });
  }

  return schemas.map((schema) => compactObject(schema));
}
