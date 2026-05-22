import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { formatNewsDate, getVisibleNews } from "../../_assets/utils/news.utils";

const richTextClass =
  "[&_p]:mt-4 [&_p:first-child]:mt-0 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-2 [&_li>p]:mt-0 [&_strong]:font-semibold [&_em]:italic [&_a]:text-[var(--la-burgundy)] [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mt-7 [&_h1]:font-semibold [&_h2]:mt-7 [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:font-semibold";

function NewsImage({ item, className = "" }) {
  if (item?.image) {
    return (
      <img
        src={item.image}
        alt={item?.title || "Actualité Les Artistes"}
        className={`h-full w-full object-cover ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`flex h-full min-h-[250px] w-full items-center justify-center bg-[#fbf4ea] text-center ${className}`.trim()}
    >
      <div className="flex flex-col items-center px-8">
        <Image
          src="/img/logo.png"
          alt="Les Artistes"
          width={230}
          height={104}
          className="h-auto w-[180px]"
        />
        <p className="la-home__eyebrow mt-6">Actualités</p>
      </div>
    </div>
  );
}

function LoadingSection() {
  return (
    <div className="mt-10 grid gap-6 min-[900px]:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <article
          key={`news-skeleton-${index}`}
          className="border border-[rgba(197,155,85,0.22)] bg-[#fbf4ea] p-5 shadow-[0_18px_36px_rgba(74,45,31,0.08)]"
        >
          <div className="h-[250px] animate-pulse bg-[rgba(197,155,85,0.16)]" />
          <div className="mt-6 h-3 w-28 animate-pulse rounded bg-[rgba(111,32,42,0.18)]" />
          <div className="mt-5 h-16 w-[82%] animate-pulse rounded bg-[rgba(86,57,44,0.12)]" />
          <div className="mt-5 space-y-3">
            <div className="h-3 w-full animate-pulse rounded bg-[rgba(86,57,44,0.1)]" />
            <div className="h-3 w-[86%] animate-pulse rounded bg-[rgba(86,57,44,0.1)]" />
            <div className="h-3 w-[62%] animate-pulse rounded bg-[rgba(86,57,44,0.1)]" />
          </div>
        </article>
      ))}
    </div>
  );
}

function EmptySection() {
  return (
    <div className="mx-auto mt-10 max-w-[760px] border border-[rgba(197,155,85,0.28)] bg-[#fbf4ea] px-8 py-12 text-center shadow-[0_18px_36px_rgba(74,45,31,0.08)]">
      <p className="la-home__eyebrow">Bientôt</p>
      <p className="la-home__display mt-4 text-[48px] leading-[0.92] text-[var(--la-burgundy)] tablet:text-[64px]">
        Les prochaines nouvelles arrivent.
      </p>
      <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-[1.5] text-[rgba(86,57,44,0.86)]">
        Aucune actualité n’est publiée pour le moment. Le site reste prêt à
        accueillir les prochains temps forts du restaurant.
      </p>
    </div>
  );
}

function NewsCard({ item, onOpen }) {
  const dateLabel = formatNewsDate(item?.published_at) || "Actualité";

  return (
    <article className="group flex h-full flex-col border border-[rgba(197,155,85,0.22)] bg-[#fbf4ea] p-5 shadow-[0_18px_36px_rgba(74,45,31,0.08)]">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="block overflow-hidden border border-[rgba(197,155,85,0.18)] bg-white/70 text-left shadow-[0_18px_36px_rgba(74,45,31,0.12)]"
        aria-label={`Lire l’actualité ${item?.title || ""}`.trim()}
      >
        <div className="relative h-[280px] overflow-hidden">
          <NewsImage
            item={item}
            className="transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      </button>

      <div className="flex flex-1 flex-col pt-6">
        <p className="la-home__eyebrow">{dateLabel}</p>

        <h3 className="la-home__display mt-4 text-[38px] leading-[0.94] text-[var(--la-burgundy)] tablet:text-[46px]">
          {item?.title}
        </h3>

        {item?.description ? (
          <div
            className={`mt-5 max-h-[170px] overflow-hidden text-[17px] leading-[1.5] text-[rgba(86,57,44,0.86)] [mask-image:linear-gradient(180deg,#000_70%,transparent_100%)] ${richTextClass}`}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        ) : null}

        <button
          type="button"
          onClick={() => onOpen(item)}
          className="la-home__eyebrow mt-7 w-fit text-[var(--la-burgundy)] transition-opacity hover:opacity-70"
        >
          Lire l’actualité
        </button>
      </div>
    </article>
  );
}

function NewsModal({ item, onClose }) {
  const dateLabel = formatNewsDate(item?.published_at) || "Actualité";

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(41,18,24,0.58)] px-4 py-8"
      onClick={onClose}
    >
      <article
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden border border-[rgba(197,155,85,0.3)] bg-[var(--la-paper)] shadow-[0_28px_90px_rgba(41,18,24,0.28)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-[rgba(197,155,85,0.22)] px-6 py-5 tablet:px-8">
          <div>
            <p className="la-home__eyebrow">{dateLabel}</p>
            <h2 className="la-home__display mt-3 max-w-[780px] text-[46px] leading-[0.92] text-[var(--la-burgundy)] tablet:text-[64px]">
              {item?.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(197,155,85,0.34)] bg-[#fbf4ea] text-[var(--la-burgundy)] transition hover:opacity-70"
            aria-label="Fermer l’actualité"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-6 tablet:px-8">
          <div className="overflow-hidden border border-[rgba(197,155,85,0.2)]">
            <NewsImage item={item} className="max-h-[460px]" />
          </div>

          {item?.description ? (
            <div
              className={`mt-8 text-[18px] leading-[1.62] text-[rgba(86,57,44,0.9)] ${richTextClass} [&_h1]:text-[44px] [&_h1]:leading-[0.95] [&_h1]:text-[var(--la-burgundy)] [&_h2]:text-[38px] [&_h2]:leading-[0.96] [&_h2]:text-[var(--la-burgundy)] [&_h3]:text-[32px] [&_h3]:leading-[0.98] [&_h3]:text-[var(--la-burgundy)]`}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          ) : null}
        </div>
      </article>
    </div>
  );
}

export default function ListNewsComponent({
  restaurantData,
  dataLoading = false,
}) {
  const [selectedNews, setSelectedNews] = useState(null);
  const visibleNews = getVisibleNews(restaurantData);

  useEffect(() => {
    if (!selectedNews) {
      document.body.style.overflow = "";
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedNews]);

  return (
    <>
      <section className="la-shell py-10 tablet:py-12 desktop:py-14">
        <div className="la-home__framed-section la-home__framed-section--title-absolute la-home__framed-section--experience">
          <div className="la-home__framed-heading la-home__framed-heading--absolute la-home__framed-heading--with-description text-center">
            <p className="la-home__eyebrow">Actualités</p>
            <div className="la-home__framed-title-row la-home__framed-title-row--with-lines">
              <h2 className="la-home__section-title">Nouveautés du moment</h2>
            </div>
            <p className="mt-4 max-w-[620px] text-[18px] leading-[1.42] text-[rgba(86,57,44,0.82)]">
              Les temps forts du restaurant, les annonces de service et les
              prochains rendez-vous aux Artistes.
            </p>
          </div>

          <div className="la-home__framed-content px-4 pb-4 pt-4 tablet:px-6 desktop:px-8">
            {dataLoading && !restaurantData ? (
              <LoadingSection />
            ) : !visibleNews.length ? (
              <EmptySection />
            ) : (
              <div className="mt-10 grid gap-6 min-[900px]:grid-cols-3">
                {visibleNews.map((item, index) => (
                  <NewsCard
                    key={item?._id || `${item?.title || "news"}-${index}`}
                    item={item}
                    onOpen={setSelectedNews}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedNews ? (
        <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
      ) : null}
    </>
  );
}
