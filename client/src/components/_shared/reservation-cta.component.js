import Image from "next/image";
import ActionLinkComponent from "./action-link.component";

export default function ReservationCtaComponent({
  sectionId = "reservation",
  sectionClassName = "la-shell pb-9 pt-3 tablet:pb-11 desktop:pb-12",
  title = "Réservez votre table",
  highlight = "et laissez-vous inspirer",
  buttonLabel = "Réserver en ligne",
  buttonHref = "/reservations",
  phone,
  phoneHref,
  note = "Réservation conseillée, notamment les soirs de spectacle.",
  illustrationSrc = "/img/pictos/25.png",
  illustrationAlt = "Illustration de l'Opéra de Limoges",
}) {
  return (
    <section id={sectionId} className={sectionClassName}>
      <div className="la-home__reservation-panel la-reservation-cta relative overflow-hidden px-5 py-8 tablet:px-8 desktop:px-10 desktop:py-10">
        <span
          className="la-home__reservation-frame la-home__reservation-frame--wide"
          aria-hidden="true"
        />
        <span
          className="la-home__reservation-frame la-home__reservation-frame--tall"
          aria-hidden="true"
        />
        <span
          className="la-home__corner la-home__corner--tl"
          aria-hidden="true"
        />
        <span
          className="la-home__corner la-home__corner--tr"
          aria-hidden="true"
        />
        <span
          className="la-home__corner la-home__corner--bl"
          aria-hidden="true"
        />
        <span
          className="la-home__corner la-home__corner--br"
          aria-hidden="true"
        />

        <div className="la-reservation-cta__grid flex flex-col gap-8 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-10">
          <div className="la-reservation-cta__visual w-full min-[900px]:flex-1">
            <div className="mx-auto w-full max-w-[430px] opacity-[0.94]">
              <Image
                src={illustrationSrc}
                alt={illustrationAlt}
                width={577}
                height={433}
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="la-reservation-cta__content flex w-full flex-col gap-6 min-[900px]:flex-1 min-[900px]:items-start">
            <h2 className="la-home__section-title la-reservation-cta__title text-left leading-[0.92]">
              {title}
              <br />
              <span className="la-home__script text-[0.92em] text-[var(--la-gold)]">
                {highlight}
              </span>
            </h2>

            <ActionLinkComponent
              href={buttonHref}
              className="la-reservation-cta__button min-w-[250px]"
            >
              {buttonLabel}
            </ActionLinkComponent>

            <div className="la-reservation-cta__phone flex items-center gap-4 text-[36px] leading-none text-[var(--la-burgundy)]">
              <Image
                src="/img/pictos/23.png"
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="h-7 w-7 shrink-0"
              />
              <a
                href={phoneHref}
                className="transition-opacity hover:opacity-74"
              >
                {phone}
              </a>
            </div>

            <p className="la-reservation-cta__note mt-2 text-[18px] leading-[1.42] text-[rgba(86,57,44,0.9)]">
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
