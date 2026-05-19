import {
  buildMenuBlocks,
  getMenuPriceLabel,
  getMenuTitle,
  getVisibleMenus,
  isMenuBlankLine,
  isMenuSeparatorLabel,
} from "../../_assets/utils/menu-display.utils";
import { getVisibleMenuCategories } from "../../_assets/utils/site-display.utils";
import SectionHeadingComponent from "../_shared/section-heading.component";
import RevealOnScrollComponent from "../_shared/motion/reveal-on-scroll.component";

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function RestaurantMenuBlock({ block }) {
  const lines = Array.isArray(block?.lines) ? block.lines : [];

  return (
    <div className="rounded-[22px] border border-[var(--site-line)] bg-white/78 px-5 py-5 text-center">
      <div className="flex flex-col items-center">
        <h4 className="max-w-[90%] text-[20px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--site-ink)]">
          {block.title}
        </h4>

        {block.price ? (
          <span className="mt-3 inline-flex rounded-full border border-[rgba(203,96,56,0.18)] bg-[rgba(203,96,56,0.08)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--site-orange-deep)]">
            {block.price}
          </span>
        ) : null}
      </div>

      {lines.length ? (
        <div className="mt-5 space-y-2.5">
          {lines.map((line, index) => {
            if (isMenuBlankLine(line)) {
              return (
                <div
                  key={`${block.id}-blank-${index}`}
                  className="h-2"
                  aria-hidden="true"
                />
              );
            }

            if (isMenuSeparatorLabel(line)) {
              return (
                <p
                  key={`${block.id}-separator-${index}`}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--site-orange-deep)]"
                >
                  {line}
                </p>
              );
            }

            return (
              <p
                key={`${block.id}-${index}`}
                className="text-[15px] leading-[1.7] text-[var(--site-ink-soft)]"
              >
                {line}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function RestaurantMenuCard({ menu, index = 0 }) {
  const menuBlocks = buildMenuBlocks(menu);
  const priceLabel = getMenuPriceLabel(menu);

  if (!menuBlocks.length) {
    return null;
  }

  return (
    <article className="site-card rounded-[32px] p-6 tablet:p-8">
      <div className="border-b border-[var(--site-line)] pb-6 text-center">
        <p className="nav-font text-[11px] uppercase text-[var(--site-orange-deep)]">
          Menu
        </p>
        <h3 className="yeseva-one-regular mt-4 text-[38px] leading-[0.92] text-[var(--site-ink)] tablet:text-[42px]">
          {getMenuTitle(menu, index + 1)}
        </h3>

        {menu?.description ? (
          <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-[1.8] text-[var(--site-ink-soft)]">
            {menu.description}
          </p>
        ) : null}

        {priceLabel ? (
          <span className="mt-5 inline-flex rounded-full border border-[rgba(203,96,56,0.18)] bg-[rgba(203,96,56,0.08)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--site-orange-deep)]">
            {priceLabel}
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4">
        {menuBlocks.map((block) => (
          <RestaurantMenuBlock key={block.id} block={block} />
        ))}
      </div>
    </article>
  );
}

function CategoryMenuItem({ item }) {
  return (
    <div className="rounded-[22px] border border-[var(--site-line)] bg-white/78 px-5 py-5 text-center">
      <div className="flex flex-col items-center">
        <h4 className="max-w-[92%] text-[19px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--site-ink)]">
          {item.name}
        </h4>

        {item.price ? (
          <span className="mt-3 inline-flex rounded-full border border-[rgba(203,96,56,0.18)] bg-[rgba(203,96,56,0.08)] px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--site-orange-deep)]">
            {item.price}
          </span>
        ) : null}
      </div>

      {item.description ? (
        <p className="mt-4 text-[15px] leading-[1.7] text-[var(--site-ink-soft)]">
          {item.description}
        </p>
      ) : null}
    </div>
  );
}

function CategoryMenuCard({ category }) {
  return (
    <article className="site-card rounded-[32px] p-6 tablet:p-8">
      <div className="border-b border-[var(--site-line)] pb-6 text-center">
        <p className="nav-font text-[11px] uppercase text-[var(--site-orange-deep)]">
          Formule
        </p>
        <h3 className="yeseva-one-regular mt-4 text-[38px] leading-[0.92] text-[var(--site-ink)] tablet:text-[42px]">
          {category.title}
        </h3>

        {category.description ? (
          <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-[1.8] text-[var(--site-ink-soft)]">
            {category.description}
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4">
        {category.items.map((item) => (
          <CategoryMenuItem key={item.id} item={item} />
        ))}
      </div>
    </article>
  );
}

export default function OtherMenusComponent({ restaurantData }) {
  const menus = getVisibleMenus(restaurantData);
  const menuCategories = getVisibleMenuCategories(restaurantData).filter(
    (category) =>
      !menus.some(
        (menu) =>
          normalizeKey(getMenuTitle(menu)) === normalizeKey(category.title),
      ),
  );
  const totalMenuCards = menuCategories.length + menus.length;

  if (!menus.length && !menuCategories.length) {
    return null;
  }

  return (
    <section className="mt-24">
      <SectionHeadingComponent
        eyebrow="Formules"
        title="Menus & propositions complémentaires"
        description="Les menus, formules et propositions structurées à part de la carte sont regroupés ici dans une lecture plus directe."
      />

      <div
        className={`mt-12 grid gap-6 ${
          totalMenuCards > 1 ? "desktop:grid-cols-2" : "mx-auto max-w-[760px]"
        }`}
      >
        {menuCategories.map((category, index) => (
          <RevealOnScrollComponent
            key={category.id}
            variant="up"
            delay={index * 80}
          >
            <CategoryMenuCard category={category} />
          </RevealOnScrollComponent>
        ))}

        {menus.map((menu, index) => (
          <RevealOnScrollComponent
            key={menu?._id || `menu-${index}`}
            delay={menuCategories.length * 80 + index * 90}
            variant="up"
          >
            <RestaurantMenuCard menu={menu} index={index} />
          </RevealOnScrollComponent>
        ))}
      </div>
    </section>
  );
}
