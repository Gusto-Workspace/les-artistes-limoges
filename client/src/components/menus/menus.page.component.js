import Image from "next/image";
import { useContext, useState } from "react";
import { GlobalContext } from "@/contexts/global.context";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
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

const categoryTabs = [
  {
    id: "formule",
    label: "Formules",
    iconSrc: "/img/pictos/10.png",
    iconAlt: "Pictogramme formule du midi",
    href: "#menu-formule",
  },
  {
    id: "partager",
    label: "À partager",
    iconSrc: "/img/pictos/9.png",
    iconAlt: "Pictogramme à partager",
    href: "#menu-section-partager",
  },
  {
    id: "brasserie",
    label: "Viandes & mer",
    iconSrc: "/img/pictos/21.png",
    iconAlt: "Pictogramme brasserie",
    href: "#menu-section-viandes",
  },
  {
    id: "burgers",
    label: "Burgers & salades",
    iconSrc: "/img/pictos/6.png",
    iconAlt: "Pictogramme burgers et salades",
    href: "#menu-section-burgers",
  },
  {
    id: "desserts",
    label: "Desserts",
    iconSrc: "/img/pictos/11.png",
    iconAlt: "Pictogramme desserts",
    href: "#menu-section-desserts",
  },
];

const highlightItems = [
  {
    title: "Carpaccio de boeuf",
    price: "15,50 €",
    image: "/img/dishes/1.png",
    imageAlt: "Carpaccio de boeuf",
  },
  {
    title: "Tartare de boeuf limousin",
    description: "Préparé ou poêlé à la demande.",
    price: "18,00 €",
    image: "/img/dishes/2.png",
    imageAlt: "Tartare de boeuf limousin",
  },
  {
    title: "Farandole marine",
    description:
      "Noix de St Jacques, gambas, pavé saumon, sauce tartare.",
    price: "29,00 €",
    image: "/img/dishes/3.png",
    imageAlt: "Farandole marine",
  },
  {
    title: "Profiterole chantilly",
    price: "7,50 €",
    image: "/img/dishes/4.png",
    imageAlt: "Profiterole chantilly",
  },
];

const menuSections = [
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
        details:
          "Pain maison, tenders, tomates, oignons, cheddar, salade.",
      },
      {
        name: "Hamburger fish",
        price: "19,50 €",
        details:
          "Pain maison, fish pané, tomates, oignons, cheddar, salade.",
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
        details:
          "Poulet pané, oeuf, tomates, croûtons, parmesan, sauce César.",
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
        details: "Jambon de pays, tomates, camembert pané, oeuf, oignons rouges.",
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
        details:
          "Chantilly, caramel, chocolat, coulis fruit, sauce café.",
      },
    ],
    showOrnament: false,
  },
];

const qualityItems = [
  {
    title: "Cuisine maison",
    description: "Des plats faits maison à partir de produits frais et de saison.",
    iconSrc: "/img/pictos/6.png",
    iconAlt: "Pictogramme cuisine maison",
  },
  {
    title: "Service de brasserie",
    description: "Une équipe attentionnée pour un service chaleureux et efficace.",
    iconSrc: "/img/pictos/10.png",
    iconAlt: "Pictogramme service de brasserie",
  },
  {
    title: "Terrasse animée",
    description: "Profitez de notre terrasse ensoleillée, à deux pas de l’Opéra.",
    iconSrc: "/img/pictos/2.png",
    iconAlt: "Pictogramme terrasse",
  },
  {
    title: "Salle cosy à l’étage",
    description: "Un espace confortable pour vos repas de groupe ou en toute intimité.",
    iconSrc: "/img/pictos/4.png",
    iconAlt: "Pictogramme salle cosy",
  },
];

function MenuCategoryTab({ item, active, onClick }) {
  return (
    <a
      href={item.href}
      onClick={() => onClick(item.id)}
      className={`la-menu__category-link ${active ? "is-active" : ""}`}
    >
      <Image
        src={item.iconSrc}
        alt={item.iconAlt}
        width={62}
        height={62}
        className="la-menu__category-icon"
      />
      <span className="la-menu__category-label">{item.label}</span>
    </a>
  );
}

function HighlightCard({ item }) {
  return (
    <article className="la-menu__spotlight-card">
      <div className="la-menu__spotlight-media">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="px-4 pb-6 pt-5 text-center">
        <h3 className="text-[23px] leading-[1.14] text-[var(--la-burgundy)]">
          {item.title}
        </h3>
        {item.description ? (
          <p className="mx-auto mt-4 max-w-[280px] text-[16px] leading-[1.55] text-[rgba(86,57,44,0.86)]">
            {item.description}
          </p>
        ) : null}
        <p className="la-menu__spotlight-price">{item.price}</p>
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

export default function MenusPageComponent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const { address, phone, phoneHref } = buildSiteContactSummary(restaurantData);
  const [activeCategory, setActiveCategory] = useState(categoryTabs[0].id);

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
                de saison, des plats faits maison, des desserts gourmands et
                nos glaces artisanales pour toutes vos envies.
              </p>

              <p className="mt-5 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                À deux pas de l’Opéra, au cœur de Limoges.
              </p>

              <div className="mt-7 flex items-center gap-3 text-[17px] text-[rgba(86,57,44,0.9)]">
                <Image
                  src="/img/pictos/24.png"
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] shrink-0"
                />
                <span>{address}</span>
              </div>

              <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
                <ActionLinkComponent
                  href="/reservations"
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver une table
                </ActionLinkComponent>
                <ActionLinkComponent
                  href="#menu-highlights"
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

              <div className="relative mx-auto max-w-[860px] min-[1100px]:mr-0">
                <div className="relative overflow-hidden border border-[rgba(197,155,85,0.16)] bg-white/70 shadow-[0_20px_40px_rgba(82,49,33,0.12)] min-[1100px]:ml-[85px]">
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

                <div className="mt-5 grid gap-5 min-[720px]:grid-cols-2 min-[1100px]:mt-0">
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
          <div className="la-menu__category-grid">
            {categoryTabs.map((item) => (
              <MenuCategoryTab
                key={item.id}
                item={item}
                active={activeCategory === item.id}
                onClick={setActiveCategory}
              />
            ))}
          </div>
        </section>

        <section
          id="menu-highlights"
          className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-home__framed-section la-home__framed-section--title-absolute la-menu__framed-section">
            <div className="la-home__framed-heading la-home__framed-heading--absolute la-menu__title-band">
              <div className="la-home__framed-title-row la-home__framed-title-row--with-lines la-menu__title-band">
                <h2 className="la-home__section-title">Les incontournables</h2>
              </div>
            </div>

            <div className="la-home__framed-content px-3 pb-6 pt-8 tablet:px-5 desktop:px-7">
              <div className="grid gap-5 min-[700px]:grid-cols-2 desktop:grid-cols-4">
                {highlightItems.map((item) => (
                  <HighlightCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="la-shell pb-8 pt-1 tablet:pb-10 desktop:pb-12">
          <div className="la-menu__sections-stack">
            {menuSections.map((column) => (
              <MenuListCard key={column.id} column={column} />
            ))}
          </div>
        </section>

        <section
          id="menu-formule"
          className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
        >
          <div className="la-menu__lunch-strip">
            <div>
              <h2 className="la-contact__panel-title">Formule déjeuner</h2>
              <p className="mt-3 text-[17px] leading-[1.45] text-[rgba(86,57,44,0.86)]">
                Lundi au vendredi hors jours fériés.
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div>
                <p className="la-home__feature-title text-[18px]">
                  Formule déjeuner
                </p>
                <p className="mt-2 text-[17px] leading-[1.45] text-[rgba(86,57,44,0.86)]">
                  Entrée du jour, plat du jour et dessert du jour
                </p>
              </div>

              <div>
                <p className="text-[17px] leading-[1.45] text-[rgba(86,57,44,0.86)]">
                  Entrée du jour, plat du jour
                  <br />
                  ou plat du jour et dessert du jour
                </p>
              </div>

              <div>
                <p className="la-home__feature-title text-[18px]">
                  Plat du jour
                </p>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <p className="la-menu__formula-price text-[2.35rem]">15,10 €</p>
              <p className="la-menu__formula-price text-[2.35rem]">12,50 €</p>
              <p className="la-menu__formula-price text-[2.35rem]">9,90 €</p>
            </div>
          </div>
        </section>

        <section className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14">
          <div className="la-menu__lunch-strip">
            <div>
              <h2 className="la-contact__panel-title">Menu bambino</h2>
              <p className="mt-3 text-[17px] leading-[1.45] text-[rgba(86,57,44,0.86)]">
                Moins de 8 ans.
              </p>
            </div>

            <div className="text-center">
              <p className="text-[17px] leading-[1.45] text-[rgba(86,57,44,0.86)]">
                Steak haché ou tenders de poulet,
                <br />
                frites, glace, diabolo ou sirop à l’eau.
              </p>
            </div>

            <div className="text-center">
              <p className="la-menu__formula-price">10,00 €</p>
            </div>
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

            <div className="la-home__framed-content px-4 pb-4 pt-8 tablet:px-6 desktop:px-8">
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
