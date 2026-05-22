import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/global.context";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import ReservationCtaComponent from "@/components/_shared/reservation-cta.component";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact" },
];

function LegalDocumentSection({ id, title, children, last = false }) {
  return (
    <section
      id={id}
      className={`la-legal__section ${last ? "" : "border-b border-[rgba(197,155,85,0.18)] pb-7 tablet:pb-8 desktop:pb-9"} ${
        last ? "" : "mb-7 tablet:mb-8 desktop:mb-9"
      }`}
    >
      <h2 className="la-legal__section-title">{title}</h2>
      <div className="la-legal__section-content">{children}</div>
    </section>
  );
}

function SummaryBlock({ title, children }) {
  return (
    <div className="la-legal__summary-card">
      <p className="la-legal__summary-title">{title}</p>
      <div className="la-legal__summary-body">{children}</div>
    </div>
  );
}

export default function LegalDocumentPageComponent({
  title,
  highlight,
  description,
  panelEyebrow,
  panelTitle,
  panelDescription,
  summaryItems = [],
  sections = [],
}) {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const restaurantName =
    String(restaurantData?.name || "").trim() || "Les Artistes";
  const { address, phone, phoneHref, email, emailHref } =
    buildSiteContactSummary(restaurantData);

  return (
    <div className="la-home la-legal">
      <NavComponent items={navigationItems} />

      <main>
        <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10 desktop:pb-12">
          <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
            <div>
              <h1 className="la-home__display text-[56px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[70px] desktop:text-[98px]">
                {title}
                <br />
                <span className="la-home__script text-[0.8em] text-[var(--la-gold)]">
                  {highlight}
                </span>
              </h1>

              <p className="mt-7 max-w-[560px] text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                {description}
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
                  href="/contact"
                  className="min-[560px]:min-w-[190px]"
                >
                  Nous contacter
                </ActionLinkComponent>
                <ActionLinkComponent
                  href="/reservations"
                  secondary
                  className="min-[560px]:min-w-[220px]"
                >
                  Réserver une table
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
                      src="/img/photos/floor-0/3.png"
                      alt="Le bar des Artistes"
                      fill
                      sizes="(max-width: 1099px) 100vw, 720px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-5 min-[720px]:grid-cols-2 min-[1100px]:mt-0">
                  <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:right-[-18px] min-[1100px]:top-[260px] min-[1100px]:w-[220px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.82 / 1" }}
                    >
                      <Image
                        src="/img/photos/outside/2.png"
                        alt="La façade des Artistes"
                        fill
                        sizes="(max-width: 719px) 100vw, 220px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:bottom-[32px] min-[1100px]:left-[-28px] min-[1100px]:w-[250px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.84 / 1" }}
                    >
                      <Image
                        src="/img/photos/floor-1/2.png"
                        alt="La salle principale des Artistes"
                        fill
                        sizes="(max-width: 719px) 100vw, 250px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="la-shell pb-10 pt-8 tablet:pb-12 desktop:pb-14">
          <div className="la-legal__panel relative overflow-hidden px-5 py-6 tablet:px-7 tablet:py-8 desktop:px-8 desktop:py-9">
            <div className="grid gap-10 desktop:grid-cols-[0.34fr_0.66fr] desktop:gap-12">
              <aside className="desktop:pr-2">
                <p className="la-home__eyebrow">{panelEyebrow}</p>
                <h2 className="la-contact__panel-title mt-3">{panelTitle}</h2>
                <p className="mt-4 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.86)]">
                  {panelDescription}
                </p>

                <div className="mt-7 space-y-4">
                  <SummaryBlock title="Restaurant concerné">
                    <div className="space-y-4">
                      <div className="la-legal__summary-row">
                        <p className="la-legal__summary-label">Établissement</p>
                        <p className="la-legal__summary-value">
                          {restaurantName}
                        </p>
                      </div>
                      <div className="la-legal__summary-row">
                        <p className="la-legal__summary-label">Adresse</p>
                        <p className="la-legal__summary-value">{address}</p>
                      </div>
                      <div className="la-legal__summary-row">
                        <p className="la-legal__summary-label">Contact</p>
                        <div className="flex flex-col gap-1">
                          <a
                            href={emailHref}
                            className="la-legal__summary-value hover:opacity-72"
                          >
                            {email}
                          </a>
                          <a
                            href={phoneHref}
                            className="la-legal__summary-value hover:opacity-72"
                          >
                            {phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </SummaryBlock>

                  <SummaryBlock title="Points clés">
                    <div className="space-y-4">
                      {summaryItems.map((item) => (
                        <div key={item.label} className="la-legal__summary-row">
                          <p className="la-legal__summary-label">
                            {item.label}
                          </p>
                          <div className="la-legal__summary-value">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </SummaryBlock>

                  <SummaryBlock title="Accès rapide">
                    <nav
                      className="la-legal__anchor-list"
                      aria-label="Accès rapide"
                    >
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="la-legal__anchor-link"
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </SummaryBlock>
                </div>
              </aside>

              <div className="desktop:border-l desktop:border-[rgba(197,155,85,0.22)] desktop:pl-10">
                {sections.map((section, index) => (
                  <LegalDocumentSection
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    last={index === sections.length - 1}
                  >
                    {section.content}
                  </LegalDocumentSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ReservationCtaComponent phone={phone} phoneHref={phoneHref} />
      </main>

      <FooterComponent />
    </div>
  );
}
