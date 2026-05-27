import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/global.context";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
import {
  buildMenuBlocks,
  getMenuPriceLabel,
  getMenuTitle,
  getVisibleMenus,
  isMenuBlankLine,
  isMenuSeparatorLabel,
} from "@/_assets/utils/menu-display.utils";
import {
  getVisibleDishCategories,
  getVisibleMenuCategories,
} from "@/_assets/utils/site-display.utils";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import ReservationCtaComponent from "@/components/_shared/reservation-cta.component";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus", active: true },
  { label: "Contact", href: "/contact" },
];

const fallbackCardSections = [
  {
    id: "menu-section-partager",
    title: "En entrée ou à partager",
    items: [
      {
        name: "Planche des artistes",
        price: "17,00 €",
        details:
          "Jambon de pays, rosette, terrine de campagne, salade, emmental, chèvre et roquefort.",
      },
      {
        name: "Planche de bouchées croustillantes",
        price: "17,00 €",
        details:
          "Accras de morue, oignons rings, beignets de calamar, crevettes panées, mozzarella sticks, légumes tempura.",
      },
      {
        name: "Planchette de charcuterie",
        price: "13,00 €",
        details: "Terrine, jambon de pays, rosette.",
      },
      {
        name: "Planche de saumon",
        price: "19,00 €",
        details: "Club saumon, rillette et saumon gravlax.",
      },
      { name: "Le fuet", price: "8,00 €" },
      {
        name: "Club saumon",
        price: "14,50 €",
        details: "Saumon gravlax, tomates, concombre pickles, fromage frais.",
      },
      {
        name: "Camembert rôti",
        price: "16,50 €",
        details: "Miel-romarin, jambon cru, noix, frites.",
      },
      { name: "Terrine de campagne", price: "6,50 €" },
      { name: "Saumon gravlax", price: "14,00 €" },
      {
        name: "Salade de chèvre",
        price: "8 €",
        details: "Palet de chèvre, miel, tomates, oeufs, noix, lardons.",
      },
      { name: "Oeufs mimosas", price: "7,00 €" },
      { name: "Beignets de calamar", price: "10,00 €" },
      { name: "Rillettes poisson", price: "8,50 €" },
    ],
    showOrnament: true,
  },
  {
    id: "menu-section-tartines",
    title: "Nos tartines traditionnelles",
    intro: "Pain boulanger aillé et persillé.",
    items: [
      {
        name: "Tartine italienne",
        price: "13,00 €",
        details: "Jambon de pays, tomates, mozzarella, pesto.",
      },
      {
        name: "Tartine norvégienne",
        price: "13,50 €",
        details: "Saumon fumé, crème, mozzarella.",
      },
      {
        name: "Tartine berrichonne",
        price: "12,50 €",
        details: "Chèvre, mozzarella, tomates, crème, miel.",
      },
      {
        name: "Tartine fromagère",
        price: "13,00 €",
        details: "Roquefort, mozzarella chèvre, tomates.",
      },
    ],
    showOrnament: true,
  },
  {
    id: "menu-section-viandes",
    title: "Sélection de viandes",
    items: [
      { name: "Entrecôte limousine", price: "27,50 €" },
      { name: "Pièce du boucher limousine", price: "21,50 €" },
      { name: "Demi magret de canard ou entier", price: "21,50 € / 30,00 €" },
      { name: "Steack haché limousin à cheval", price: "17,00 €" },
      {
        name: "Andouillette grillée",
        price: "17,50 €",
        details: "Ferme de Mont Vert, sauce moutarde.",
      },
      { name: "Confit de canard", price: "18,00 €" },
      {
        name: "Escalope de volaille à la crème",
        price: "16,00 €",
        details: "À la crème et ses champignons.",
      },
      {
        name: "Tartare de boeuf limousin",
        price: "18,00 €",
        details: "Préparé ou poêlé à la demande.",
      },
      { name: "Carpaccio de boeuf", price: "15,50 €" },
    ],
    note: "Tous nos plats sont accompagnés de : frites, salade, riz ou légumes.",
    showOrnament: true,
  },
  {
    id: "menu-section-mer",
    title: "Mer & traditions",
    items: [
      { name: "Gambas persillade", price: "20,00 €" },
      { name: "Noix de saint-jacques persillade", price: "23,50 €" },
      { name: "Pavé de saumon", price: "17,50 €" },
      { name: "Fish and chips sauce tartare", price: "16,50 €" },
      {
        name: "Farandole marine",
        price: "29,00 €",
        details: "Noix de St Jacques, gambas, pavé saumon, sauce tartare.",
      },
    ],
    showOrnament: true,
  },
  {
    id: "menu-section-burgers",
    title: "Burgers & petits creux",
    items: [
      {
        name: "Cheesebacon",
        price: "18,50 €",
        details:
          "Pain maison, steak haché, cheddar, bacon, tomates, oignons, salade.",
      },
      {
        name: "Maxi hamburger",
        price: "23,00 €",
        details:
          "Pain maison, deux steak haché, cheddar, tomates, oignons, salade.",
      },
      {
        name: "Hamburger poulet",
        price: "17,50 €",
        details: "Pain maison, tenders, tomates, oignons, cheddar, salade.",
      },
      {
        name: "Hamburger fish",
        price: "19,50 €",
        details: "Pain maison, fish pané, tomates, oignons, cheddar, salade.",
      },
      { name: "Croque-monsieur", price: "9,50 €" },
      { name: "Croque-madame", price: "10,00 €" },
      { name: "Croque-monsieur au chèvre", price: "10,50 €" },
      { name: "Croque-monsieur au roquefort", price: "10,50 €" },
      {
        name: "Croque fromager",
        price: "12,00 €",
        details: "Chèvre et roquefort.",
      },
    ],
    showOrnament: true,
  },
  {
    id: "menu-section-salades",
    title: "Salades maisons & traditions",
    items: [
      {
        name: "Salade des artistes",
        price: "18,50 €",
        details:
          "Gésiers, manchons de canard, magret séché, tomates, oeuf, noix, croûtons.",
      },
      {
        name: "Salade chèvre chaud et miel sur toast",
        price: "15,00 €",
        details: "Palet de chèvre, miel, tomates, oeuf, noix, lardons.",
      },
      {
        name: "Salade parisienne",
        price: "13,50 €",
        details: "Jambon blanc, tomates, oeuf, emmental.",
      },
      {
        name: "Salade César",
        price: "15,00 €",
        details: "Poulet pané, oeuf, tomates, croûtons, parmesan, sauce César.",
      },
      {
        name: "Salade de fruits de mer",
        price: "17,00 €",
        details: "Gambas, saumon gravlax, agrumes, oeuf, tapenade, tomates.",
      },
      {
        name: "Salade italienne",
        price: "15,00 €",
        details:
          "Jambon de pays, tomates confites, mozzarella, olives, oignons rouges, pesto.",
      },
      {
        name: "Salade rustique",
        price: "15,50 €",
        details:
          "Jambon de pays, tomates, camembert pané, oeuf, oignons rouges.",
      },
    ],
    showOrnament: true,
  },
  {
    id: "menu-section-desserts",
    title: "Le côté gourmand",
    items: [
      { name: "Assiette de fruits frais", price: "7,00 €" },
      { name: "Crème brûlée", price: "7,00 €" },
      { name: "Tiramisu", price: "7,00 €" },
      { name: "Mousse au chocolat", price: "6,00 €" },
      { name: "Moelleux au chocolat", price: "8,00 €" },
      { name: "Profiterole chantilly", price: "7,50 €" },
      { name: "Café gourmand", price: "9,00 €" },
      { name: "Thé gourmand", price: "9,50 €" },
      { name: "Baba au rhum", price: "8,00 €" },
      { name: "Gaufre au sucre", price: "4,50 €" },
      { name: "Gaufre Nutella ou caramel", price: "5,50 €" },
      { name: "Crêpe sucre", price: "4,00 €" },
      { name: "Crêpe Nutella ou caramel", price: "5,50 €" },
      { name: "Fromage blanc coulis au choix", price: "6,00 €" },
    ],
    showOrnament: true,
  },
  {
    id: "menu-section-supplements",
    title: "Suppléments & accompagnements",
    items: [
      {
        name: "Sauce",
        price: "2,00 €",
        details: "Roquefort, poivre, moutarde, échalote, tartare.",
      },
      {
        name: "Petit plus",
        price: "5,00 €",
        details:
          "Assiette de frites, assiette de légumes, assiette de riz ou salade verte.",
      },
      {
        name: "À ajouter au dessert",
        price: "2,60 €",
        details: "Chantilly, caramel, chocolat, coulis fruit, sauce café.",
      },
    ],
    showOrnament: false,
  },
];

const qualityItems = [
  {
    title: "Cuisine maison",
    description:
      "Des plats faits maison à partir de produits frais et de saison.",
    iconSrc: "/img/pictos/6.png",
    iconAlt: "Pictogramme cuisine maison",
  },
  {
    title: "Service de brasserie",
    description:
      "Une équipe attentionnée pour un service chaleureux et efficace.",
    iconSrc: "/img/pictos/10.png",
    iconAlt: "Pictogramme service de brasserie",
  },
  {
    title: "Terrasse animée",
    description:
      "Profitez de notre terrasse ensoleillée, à deux pas de l’Opéra.",
    iconSrc: "/img/pictos/2.png",
    iconAlt: "Pictogramme terrasse",
  },
  {
    title: "Salle cosy à l’étage",
    description:
      "Un espace confortable pour vos repas de groupe ou en toute intimité.",
    iconSrc: "/img/pictos/4.png",
    iconAlt: "Pictogramme salle cosy",
  },
];

const categoryTabs = [
  {
    id: "formules",
    label: "Formules",
    iconSrc: "/img/pictos/37.png",
    iconAlt: "Pictogramme formules",
    href: "#menu-formule",
    sectionIds: ["menu-formule", "menu-bambino"],
  },
  {
    id: "entrees",
    label: "Entrées & à partager",
    iconSrc: "/img/pictos/38.png",
    iconAlt: "Pictogramme entrées et à partager",
    href: "#menu-section-partager",
    sectionIds: ["menu-section-partager"],
  },
  {
    id: "brasserie",
    label: "Viandes & mer",
    iconSrc: "/img/pictos/34.png",
    iconAlt: "Pictogramme viandes et mer",
    href: "#menu-section-viandes",
    sectionIds: ["menu-section-viandes", "menu-section-mer"],
  },
  {
    id: "snacking",
    label: "Burgers & salades",
    iconSrc: "/img/pictos/35.png",
    iconAlt: "Pictogramme burgers et salades",
    href: "#menu-section-tartines",
    sectionIds: [
      "menu-section-tartines",
      "menu-section-burgers",
      "menu-section-salades",
    ],
  },
  {
    id: "desserts",
    label: "Desserts & douceurs",
    iconSrc: "/img/pictos/36.png",
    iconAlt: "Pictogramme desserts et douceurs",
    href: "#menu-section-desserts",
    sectionIds: ["menu-section-desserts", "menu-section-supplements"],
  },
];

const lunchFormulaItems = [
  {
    description: "Entrée du jour, plat du jour et dessert du jour",
    price: "15,10 €",
  },
  {
    description:
      "Entrée du jour, plat du jour ou plat du jour et dessert du jour",
    price: "12,50 €",
  },
  {
    description: "Plat du jour",
    price: "9,90 €",
  },
];

const bambinoItems = [
  {
    description:
      "Steak haché ou tenders de poulet, frites, glace, diabolo ou sirop à l’eau.",
    price: "10,00 €",
  },
];

const fallbackMenuOffers = [
  {
    id: "menu-formule",
    title: "Formule déjeuner",
    subtitle: "Lundi au vendredi hors jours fériés.",
    items: lunchFormulaItems,
  },
  {
    id: "menu-bambino",
    title: "Menu bambino",
    subtitle: "Moins de 8 ans.",
    items: bambinoItems,
  },
];

function slugifyMenuValue(value, fallback = "section") {
  const normalizedValue = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalizedValue || fallback;
}

function buildRuntimeCardSections(restaurantData) {
  const apiSections = getVisibleDishCategories(restaurantData).map(
    (category, index) => ({
      id: `menu-section-${slugifyMenuValue(category?.title, `api-${index + 1}`)}`,
      title: category.title,
      intro: category.description,
      items: (category.items || []).map((item) => ({
        name: item.name,
        details: item.description,
        price: item.price,
      })),
      showOrnament: true,
    }),
  );

  return apiSections.length ? apiSections : fallbackCardSections;
}

function buildMenuOfferItemsFromBlocks(blocks = []) {
  return blocks
    .map((block) => {
      const lines = (block.lines || [])
        .filter((line) => !isMenuBlankLine(line))
        .map((line) => ({
          value: line,
          isSeparator: isMenuSeparatorLabel(line),
        }));

      const hasReadableLines = lines.some((line) => !line.isSeparator);
      const showTitle =
        !block.price &&
        String(block.title || "").trim() &&
        block.title !== "Sélection";

      return {
        id: block.id,
        title:
          (!block.price || !hasReadableLines) &&
          String(block.title || "").trim() &&
          block.title !== "Sélection"
            ? block.title
            : "",
        lines,
        price: block.price,
        hasReadableLines,
      };
    })
    .filter((item) => item.title || item.lines.length || item.price);
}

function buildRuntimeMenuOffers(restaurantData) {
  const apiMenus = getVisibleMenus(restaurantData).map((menu, index) => {
    const blocks = buildMenuBlocks(menu);
    const items = buildMenuOfferItemsFromBlocks(blocks);
    const fallbackPrice = getMenuPriceLabel(menu);
    const fallbackDescription = String(menu?.description || "").trim();

    return {
      id: menu?._id || `menu-offer-${index + 1}`,
      title: getMenuTitle(menu, index),
      subtitle: fallbackDescription,
      items:
        items.length > 0
          ? items
          : [
              {
                id: `${menu?._id || `menu-offer-${index + 1}`}-price`,
                title: "",
                lines: fallbackDescription
                  ? [{ value: fallbackDescription, isSeparator: false }]
                  : [],
                price: fallbackPrice,
                hasReadableLines: Boolean(fallbackDescription),
              },
            ],
    };
  });

  if (apiMenus.length) {
    return apiMenus;
  }

  const apiMenuCategories = getVisibleMenuCategories(restaurantData).map(
    (category, index) => ({
      id: category?.id || `menu-category-offer-${index + 1}`,
      title: category.title,
      subtitle: category.description,
      items: (category.items || []).map((item) => ({
        id: item.id,
        title: item.name,
        lines: item.description
          ? [{ value: item.description, isSeparator: false }]
          : [],
        price: item.price,
        hasReadableLines: Boolean(item.description),
      })),
    }),
  );

  return apiMenuCategories.length ? apiMenuCategories : fallbackMenuOffers;
}

function getFormulaItemChoiceLines(item) {
  const lines = [];

  if (item.title) {
    lines.push({
      value: item.title,
      isSeparator: false,
      isTitle: true,
    });
  }

  if (item.lines?.length) {
    lines.push(...item.lines);
  } else if (item.description) {
    lines.push({
      value: item.description,
      isSeparator: false,
    });
  }

  return lines.filter((line) => String(line?.value || "").trim());
}

function mergeSamePriceFormulaItems(items = []) {
  const priceCounts = items.reduce((counts, item) => {
    const price = String(item?.price || "").trim();

    if (!price) {
      return counts;
    }

    counts.set(price, (counts.get(price) || 0) + 1);

    return counts;
  }, new Map());

  const groupsByPrice = new Map();

  return items.reduce((mergedItems, item) => {
    const price = String(item?.price || "").trim();

    if (!price || priceCounts.get(price) <= 1) {
      mergedItems.push(item);
      return mergedItems;
    }

    const choiceLines = getFormulaItemChoiceLines(item);
    const existingGroup = groupsByPrice.get(price);

    if (existingGroup) {
      if (existingGroup.lines.length && choiceLines.length) {
        existingGroup.lines.push({
          value: "ou",
          isSeparator: true,
        });
      }

      existingGroup.lines.push(...choiceLines);
      return mergedItems;
    }

    const nextGroup = {
      id: `${item.id || "formula"}-same-price-${price}`,
      title: "",
      lines: choiceLines,
      price: item.price,
      hasReadableLines: choiceLines.some((line) => !line.isSeparator),
    };

    groupsByPrice.set(price, nextGroup);
    mergedItems.push(nextGroup);

    return mergedItems;
  }, []);
}

function MenuCategoryTab({ item }) {
  return (
    <article className="la-menu__category-link">
      <Image
        src={item.iconSrc}
        alt={item.iconAlt}
        width={62}
        height={62}
        className="la-menu__category-icon"
      />
      <span className="la-menu__category-label">{item.label}</span>
    </article>
  );
}

function MenuSectionMarker({ eyebrow, title }) {
  return (
    <div className="la-menu__section-marker">
      <Image
        src="/img/pictos/5.png"
        alt=""
        aria-hidden="true"
        width={42}
        height={24}
        className="la-menu__section-marker-icon"
      />
      <p className="la-home__eyebrow">{eyebrow}</p>
      <div className="la-home__framed-title-row la-home__framed-title-row--with-lines la-menu__section-marker-row">
        <h2 className="la-home__section-title la-menu__section-marker-title">
          {title}
        </h2>
      </div>
    </div>
  );
}

function FormulaStrip({ id, title, subtitle, items }) {
  const displayItems = mergeSamePriceFormulaItems(items);

  return (
    <article id={id} className="la-menu__lunch-strip">
      <div>
        <h2 className="la-contact__panel-title">{title}</h2>
        {subtitle ? (
          <p className="mt-3 text-[17px] leading-[1.45] text-[rgba(86,57,44,0.86)]">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="la-menu__formula-list">
        {displayItems.map((item) => (
          <div
            key={
              item.id ||
              `${title}-${item.title || item.description}-${item.price}`
            }
            className="la-menu__formula-row"
          >
            <div className="la-menu__formula-copy">
              {item.title ? (
                <p className="la-menu__formula-item-title">{item.title}</p>
              ) : null}

              {item.lines?.length ? (
                <div className="la-menu__formula-lines">
                  {item.lines.map((line, lineIndex) =>
                    line.isSeparator ? (
                      <p
                        key={`${item.id || title}-sep-${lineIndex}`}
                        className="la-menu__formula-separator"
                      >
                        {line.value}
                      </p>
                    ) : line.isTitle ? (
                      <p
                        key={`${item.id || title}-title-line-${lineIndex}`}
                        className="la-menu__formula-item-title"
                      >
                        {line.value}
                      </p>
                    ) : (
                      <p
                        key={`${item.id || title}-line-${lineIndex}`}
                        className="la-menu__formula-description"
                      >
                        {line.value}
                      </p>
                    ),
                  )}
                </div>
              ) : item.description ? (
                <p className="la-menu__formula-description">
                  {item.description}
                </p>
              ) : null}
            </div>

            {item.price ? (
              <p className="la-menu__formula-price">{item.price}</p>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  );
}

function MenuListCard({ column }) {
  return (
    <article id={column.id} className="la-menu__list-card">
      <div className="px-5 pb-6 pt-7 tablet:px-7 desktop:px-9">
        <div className="la-menu__list-header">
          <h3 className="la-menu__list-heading">{column.title}</h3>

          {column.intro ? (
            <p className="la-menu__list-intro">{column.intro}</p>
          ) : null}
        </div>

        <div className="la-menu__list-items">
          {column.items.map((item) => (
            <div
              key={`${column.title}-${item.name}`}
              className="la-menu__list-item"
            >
              <div>
                <p className="la-menu__list-name">{item.name}</p>
                {item.details ? (
                  <p className="la-menu__list-details">{item.details}</p>
                ) : null}
              </div>
              <span className="la-menu__list-price">{item.price}</span>
            </div>
          ))}
        </div>

        {column.note ? (
          <p className="la-menu__list-note">{column.note}</p>
        ) : null}

        {column.showOrnament ? (
          <Image
            src="/img/pictos/5.png"
            alt=""
            aria-hidden="true"
            width={42}
            height={24}
            className="mx-auto mt-6 h-auto w-[34px]"
          />
        ) : null}
      </div>
    </article>
  );
}

function QualityCard({ item, index }) {
  return (
    <article
      className={`la-menu__quality-item ${index > 0 ? "is-separated" : ""}`}
    >
      <Image
        src={item.iconSrc}
        alt={item.iconAlt}
        width={70}
        height={70}
        className="mb-5 h-auto w-[58px]"
      />
      <h3 className="la-home__feature-title text-[24px]">{item.title}</h3>
      <p className="mx-auto mt-3 max-w-[228px] text-[16px] leading-[1.45] text-[rgba(86,57,44,0.86)]">
        {item.description}
      </p>
    </article>
  );
}

export default function MenusPageComponent({ initialRestaurantData = null }) {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData =
    restaurantContext?.restaurantData || initialRestaurantData;
  const { address, phone, phoneHref } = buildSiteContactSummary(restaurantData);
  const cardSections = buildRuntimeCardSections(restaurantData);
  const menuOffers = buildRuntimeMenuOffers(restaurantData);

  return (
    <div className="la-home la-menu">
      <NavComponent items={navigationItems} />

      <main>
        <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10 desktop:pb-12">
          <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
            <div>
              <h1 className="la-home__display text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[102px]">
                Carte &
                <br />
                <span className="text-[var(--la-gold)]">Menus</span>
              </h1>

              <p className="mt-7 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                Une carte généreuse, fidèle à l’esprit brasserie. Des produits
                de saison, des plats faits maison, des desserts gourmands et nos
                glaces artisanales pour toutes vos envies.
              </p>

              <p className="mt-5 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                À deux pas de l’Opéra, au cœur de Limoges.
              </p>

              <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
                <ActionLinkComponent
                  href="/reservations"
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver une table
                </ActionLinkComponent>
                <ActionLinkComponent
                  href="#menu-categories"
                  secondary
                  className="min-[560px]:min-w-[220px]"
                >
                  Voir les suggestions
                </ActionLinkComponent>
              </div>
            </div>

            <div className="relative min-[1100px]:pl-10">
              <div className="absolute right-0 top-0 hidden h-[170px] w-[160px] desktop:block">
                <HeroOrnamentComponent />
              </div>

              <div className="la-hero-media relative mx-auto max-w-[860px] min-[1100px]:mr-0">
                <div className="la-hero-media__main relative overflow-hidden border border-[rgba(197,155,85,0.16)] bg-white/70 shadow-[0_20px_40px_rgba(82,49,33,0.12)] min-[1100px]:ml-[85px]">
                  <div className="relative" style={{ aspectRatio: "0.94 / 1" }}>
                    <Image
                      src="/img/hero/1.png"
                      alt="Le bar des Artistes"
                      fill
                      sizes="(max-width: 1099px) 100vw, 720px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="la-hero-media__thumbs mt-5 grid gap-5 min-[720px]:grid-cols-2 min-[1100px]:mt-0">
                  <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[290px] min-[1100px]:w-[214px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.82 / 1" }}
                    >
                      <Image
                        src="/img/dishes/1.png"
                        alt="Suggestion de carpaccio"
                        fill
                        sizes="(max-width: 719px) 100vw, 214px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:bottom-[14px] min-[1100px]:right-[-18px] min-[1100px]:w-[248px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.84 / 1" }}
                    >
                      <Image
                        src="/img/hero/2.png"
                        alt="Façade des Artistes"
                        fill
                        sizes="(max-width: 719px) 100vw, 248px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="menu-categories"
          className="la-shell pb-10 pt-7 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-menu__category-grid custom-scrollbar">
            {categoryTabs.map((item) => (
              <MenuCategoryTab key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* <section
          id="menu-highlights"
          className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-home__framed-section la-home__framed-section--title-absolute la-menu__framed-section">
            <div className="la-home__framed-heading la-home__framed-heading--absolute la-menu__title-band">
              <div className="la-home__framed-title-row la-home__framed-title-row--with-lines la-menu__title-band">
                <h2 className="la-home__section-title">Aperçu de la carte</h2>
              </div>
            </div>

            <div className="la-home__framed-content px-3 pb-6 pt-4 tablet:px-5 desktop:px-7">
              <div className="grid gap-5 min-[700px]:grid-cols-2 desktop:grid-cols-4">
                {highlightItems.map((item) => (
                  <HighlightCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section> */}

        <section className="la-shell pb-8 pt-1 tablet:pb-10 desktop:pb-12">
          <MenuSectionMarker eyebrow="Brasserie" title="La carte" />
          <div className="la-menu__sections-stack">
            {cardSections.map((column) => (
              <MenuListCard key={column.id} column={column} />
            ))}
          </div>
        </section>

        <section className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14">
          <MenuSectionMarker eyebrow="Formules" title="Les menus" />
          <div className="la-menu__offers-grid">
            {menuOffers.map((item) => (
              <FormulaStrip
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                items={item.items}
              />
            ))}
          </div>
        </section>

        <section className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14">
          <div className="la-home__framed-section la-home__framed-section--title-absolute la-menu__qualities-frame">
            <div className="la-home__framed-heading la-home__framed-heading--absolute la-menu__title-band">
              <div className="la-home__framed-title-row la-home__framed-title-row--with-lines la-menu__title-band">
                <h2 className="la-home__section-title la-menu__qualities-title">
                  L’esprit brasserie, tout simplement
                </h2>
              </div>
            </div>

            <div className="la-home__framed-content px-4 pb-4 pt-4 tablet:px-6 desktop:px-8">
              <div className="grid min-[900px]:grid-cols-4">
                {qualityItems.map((item, index) => (
                  <QualityCard key={item.title} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <ReservationCtaComponent
          phone={phone}
          phoneHref={phoneHref}
          buttonLabel="Réserver une table"
          note="Réservation conseillée, notamment le week-end et les soirs de spectacle."
        />
      </main>

      <FooterComponent />
    </div>
  );
}
