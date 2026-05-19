import Link from "next/link";
import OtherMenusComponent from "./other-menus.menus.component";
import SectionHeadingComponent from "../_shared/section-heading.component";
import RevealOnScrollComponent from "../_shared/motion/reveal-on-scroll.component";
import { getVisibleDishCategories } from "../../_assets/utils/site-display.utils";

function getCategoryHeading(title) {
  const normalizedTitle = String(title || "").trim();

  if (!normalizedTitle) {
    return "Suggestions";
  }

  if (/^nos\s/i.test(normalizedTitle)) {
    return normalizedTitle;
  }

  return normalizedTitle;
}

function MenuEntry({ name, price, description }) {
  return (
    <div className="rounded-[20px] border border-[var(--site-line)] bg-white/70 px-5 py-4">
      <div className="flex items-start gap-4">
        <h4 className="min-w-0 text-[20px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--site-ink)] tablet:text-[22px]">
          {name}
        </h4>

        {price ? (
          <>
            <div className="mt-[15px] min-w-0 flex-1 border-b border-dotted border-[rgba(203,96,56,0.4)]" />
            <span className="shrink-0 pt-1 text-[16px] font-semibold leading-none text-[var(--site-orange-deep)] tablet:text-[18px]">
              {price}
            </span>
          </>
        ) : null}
      </div>

      {description ? (
        <p className="mt-3 text-[15px] leading-[1.75] text-[var(--site-ink-soft)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function ListMenusComponent({ restaurantData }) {
  const categories = getVisibleDishCategories(restaurantData);

  return (
    <section className="site-shell px-5 py-20 tablet:px-8 tablet:py-24 desktop:px-[90px] desktop:py-[110px]">
      <div className="mx-auto max-w-[1450px]">
        <SectionHeadingComponent
          eyebrow="Carte"
          title="Les plats visibles sur le site"
          description="Les catégories de plats sont présentées ici de manière simple. Les menus et formules sont regroupés plus bas dans une section séparée."
        />

        {categories.length ? (
          <div className="mt-14 grid gap-6 desktop:grid-cols-2">
            {categories.map((category, index) => (
              <RevealOnScrollComponent
                as="article"
                key={category.id}
                variant="up"
                delay={index * 80}
                className="site-card rounded-[32px] p-6 tablet:p-8"
              >
                <div className="border-b border-[var(--site-line)] pb-6">
                  <p className="nav-font text-[11px] uppercase text-[var(--site-orange-deep)]">
                    Catégorie
                  </p>
                  <h3 className="yeseva-one-regular mt-4 text-[40px] leading-[0.92] text-[var(--site-ink)]">
                    {getCategoryHeading(category.title)}
                  </h3>

                  {category.description ? (
                    <p className="mt-4 text-[15px] leading-[1.8] text-[var(--site-ink-soft)]">
                      {category.description}
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 space-y-4">
                  {category.items.map((item) => (
                    <MenuEntry
                      key={item.id}
                      name={item.name}
                      price={item.price}
                      description={item.description}
                    />
                  ))}
                </div>
              </RevealOnScrollComponent>
            ))}
          </div>
        ) : (
          <RevealOnScrollComponent className="site-card mx-auto mt-14 max-w-[760px] rounded-[30px] px-8 py-12 text-center">
            <p className="yeseva-one-regular text-[34px] leading-[0.92] text-[var(--site-ink)]">
              Carte en préparation
            </p>
            <p className="mt-4 text-[16px] leading-[1.85] text-[var(--site-ink-soft)]">
              Les plats visibles sur le site seront ajoutés ici dès leur mise
              en ligne.
            </p>
          </RevealOnScrollComponent>
        )}

        <OtherMenusComponent restaurantData={restaurantData} />

        <RevealOnScrollComponent
          delay={220}
          variant="soft"
          className="mt-14 flex justify-center"
        >
          <Link href="/reservations" className="site-button">
            Réserver une table
          </Link>
        </RevealOnScrollComponent>
      </div>
    </section>
  );
}
