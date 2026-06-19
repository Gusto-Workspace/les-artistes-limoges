import Image from "next/image";

export default function VenueShowcaseComponent({
  sectionId,
  title,
  description = "",
  items,
  sectionClassName = "la-shell pb-10 pt-3 tablet:pb-12 desktop:pb-14",
  framedSectionClassName = "la-home__framed-section la-home__framed-section--title-absolute la-home__framed-section--experience la-home__framed-section--full-frame",
  headingClassName = "",
  contentClassName = "la-home__framed-content px-5 pb-6 tablet:px-7 desktop:px-8",
}) {
  return (
    <section id={sectionId} className={`la-venue-showcase ${sectionClassName}`}>
      <div className={`la-venue-showcase__frame ${framedSectionClassName}`}>
        <div
          className={`la-venue-showcase__heading la-home__framed-heading la-home__framed-heading--absolute bg-[#f8f2e9] text-center ${
            description ? "la-home__framed-heading--with-description" : ""
          } ${headingClassName}`.trim()}
        >
          <div className="la-home__framed-title-row la-home__framed-title-row--with-lines">
            <h2 className="la-home__section-title la-venue__title text-nowrap">{title}</h2>
          </div>
          {description ? (
            <p className="mt-2 text-[18px] leading-[1.45] text-[rgba(86,57,44,0.88)] text-balance">
              {description}
            </p>
          ) : null}
        </div>

        <div className={`la-venue-showcase__content ${contentClassName}`}>
          <div className="grid gap-6 desktop:grid-cols-3">
            {items.map((item) => (
              <article key={item.title} className="text-center">
                <div
                  className="relative overflow-hidden bg-white"
                  style={{ aspectRatio: "1.18 / 1" }}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1279px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <h3 className="la-venue__item-title mt-5 la-home__feature-title text-[30px] text-[var(--la-burgundy)]">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[320px] text-[17px] leading-[1.45] text-[rgba(86,57,44,0.88)] text-balance">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
