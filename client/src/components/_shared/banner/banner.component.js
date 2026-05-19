import RevealOnScrollComponent from "../motion/reveal-on-scroll.component";

export default function BannerComponent({
  title,
  eyebrow = "Découvrez",
  description = "",
  imgUrl: _imgUrl = "hero/header.webp",
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#121214] px-5 pb-20 pt-36 text-[var(--site-cream)] tablet:px-8 tablet:pb-24 tablet:pt-40 desktop:px-[90px] desktop:pb-28 desktop:pt-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(203,96,56,0.32),transparent_26%),radial-gradient(circle_at_78%_24%,rgba(255,255,255,0.14),transparent_18%),linear-gradient(135deg,#17171a_0%,#121214_55%,#1b1b1f_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(245,239,231,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(245,239,231,0.22)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute left-[72%] top-[120px] hidden h-[320px] w-[320px] rounded-full border border-[rgba(245,239,231,0.08)] desktop:block" />
      <div className="absolute left-[78%] top-[160px] hidden h-[220px] w-[220px] rounded-full bg-[rgba(203,96,56,0.22)] blur-3xl desktop:block" />

      <div className="relative mx-auto grid w-full max-w-[1500px] gap-10 desktop:grid-cols-[1.05fr_0.95fr] desktop:items-end">
        <div className="max-w-[840px]">
          <RevealOnScrollComponent
            as="p"
            variant="up"
            className="nav-font text-[11px] uppercase tracking-[0.32em] text-[rgba(245,239,231,0.62)]"
          >
            {eyebrow}
          </RevealOnScrollComponent>

          <RevealOnScrollComponent
            as="h1"
            delay={90}
            variant="up"
            className="yeseva-one-regular mt-5 max-w-[860px] text-balance text-[52px] leading-[0.9] text-[var(--site-cream)] tablet:text-[74px] desktop:text-[98px]"
          >
            {title}
          </RevealOnScrollComponent>

          {description ? (
            <RevealOnScrollComponent
              as="p"
              delay={180}
              variant="soft"
              className="mt-7 max-w-[640px] text-[17px] leading-[1.9] text-[var(--site-cream-soft)] tablet:text-[19px]"
            >
              {description}
            </RevealOnScrollComponent>
          ) : null}

          <RevealOnScrollComponent
            delay={260}
            variant="soft"
            className="mt-8 flex flex-wrap gap-3"
          >
            <span className="rounded-full border border-[rgba(245,239,231,0.16)] bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(245,239,231,0.82)]">
              Design remis à plat
            </span>
            <span className="rounded-full border border-[rgba(245,239,231,0.16)] bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(245,239,231,0.82)]">
              Base fonctionnelle conservée
            </span>
          </RevealOnScrollComponent>
        </div>

        <RevealOnScrollComponent
          delay={180}
          variant="zoom"
          className="hidden desktop:flex desktop:justify-end"
        >
          <div className="site-soft-card max-w-[420px] rounded-[34px] border border-[rgba(245,239,231,0.14)] px-7 py-7">
            <p className="nav-font text-[10px] uppercase text-[rgba(245,239,231,0.58)]">
              Les Artistes
            </p>
            <p className="yeseva-one-regular mt-4 text-[44px] leading-[0.94] text-[var(--site-cream)]">
              Une base propre pour repartir.
            </p>
            <p className="mt-5 text-[15px] leading-[1.8] text-[rgba(245,239,231,0.74)]">
              Navigation simplifiée, pages clarifiées et univers visuel plus
              éditorial pour accueillir les prochains contenus du site.
            </p>
          </div>
        </RevealOnScrollComponent>
      </div>
    </section>
  );
}
