import Image from "next/image";
import Link from "next/link";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact" },
];

const recoveryLinks = [
  {
    href: "/menus",
    title: "Carte & Menus",
    description:
      "Retrouver les plats de brasserie, les formules et les envies gourmandes.",
    iconSrc: "/img/pictos/10.png",
    iconAlt: "Pictogramme menu",
  },
  {
    href: "/reservations",
    title: "Réserver",
    description:
      "Reprendre directement le parcours pour réserver une table aux Artistes.",
    iconSrc: "/img/pictos/20.png",
    iconAlt: "Pictogramme réservation",
  },
  {
    href: "/contact",
    title: "Contact",
    description:
      "Accéder à l’adresse, au téléphone et aux informations pratiques.",
    iconSrc: "/img/pictos/1.png",
    iconAlt: "Pictogramme contact",
  },
];

function RecoveryCard({ item, index }) {
  return (
    <Link
      href={item.href}
      className={`group flex flex-col items-center px-6 py-8 text-center transition-opacity hover:opacity-75 ${
        index > 0
          ? "border-t border-[rgba(197,155,85,0.18)] min-[900px]:border-l min-[900px]:border-t-0"
          : ""
      }`}
    >
      <Image
        src={item.iconSrc}
        alt={item.iconAlt}
        width={80}
        height={80}
        className="mb-5 h-auto w-[58px] transition-transform duration-300 group-hover:-translate-y-1"
      />
      <h2 className="la-home__feature-title">{item.title}</h2>
      <p className="mt-3 max-w-[250px] text-[16px] leading-[1.42] text-[rgba(86,57,44,0.86)] text-balance">
        {item.description}
      </p>
    </Link>
  );
}

export default function NotFoundPage() {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Page introuvable"
        description="La page demandée est introuvable. Revenez à l’accueil ou utilisez les accès principaux du site Les Artistes."
        path="/404"
        image="/img/brand/og-les-artistes.svg"
        noIndex
      />

      <div className="la-home min-h-screen">
        <NavComponent items={navigationItems} />

        <main>
          <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-10 tablet:pb-12 desktop:pb-14">
            <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
              <div>
                <p className="la-home__eyebrow">Erreur 404</p>

                <h1 className="la-home__display mt-4 text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[102px]">
                  Page perdue
                  <br />
                  <span className="la-home__script text-[0.8em] text-[var(--la-gold)]">
                    en coulisses
                  </span>
                </h1>

                <p className="mt-7 max-w-[620px] text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                  Cette adresse n’existe plus ou a changé de place. Le rideau
                  n’est pas tombé : vous pouvez revenir à l’accueil, consulter
                  la carte ou réserver votre table à deux pas de l’Opéra.
                </p>

                <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
                  <ActionLinkComponent
                    href="/"
                    className="min-[560px]:min-w-[220px]"
                  >
                    Retour à l’accueil
                  </ActionLinkComponent>
                  <ActionLinkComponent
                    href="/menus"
                    secondary
                    className="min-[560px]:min-w-[220px]"
                  >
                    Découvrir la carte
                  </ActionLinkComponent>
                </div>

                <div className="mt-10 border-l border-[rgba(197,155,85,0.42)] pl-5">
                  <p className="la-home__eyebrow text-[var(--la-burgundy)]">
                    Les Artistes
                  </p>
                  <p className="mt-3 text-[17px] leading-[1.48] text-[rgba(86,57,44,0.86)]">
                    Brasserie, bar et glacier
                    <br />4 rue Fitz-James, 87000 Limoges
                  </p>
                </div>
              </div>

              <div className="relative min-[1100px]:pl-10">
                <div className="absolute right-0 top-0 hidden h-[170px] w-[160px] desktop:block">
                  <HeroOrnamentComponent />
                </div>

                <div className="relative mx-auto max-w-[860px] min-[1100px]:mr-0">
                  <div className="relative overflow-hidden border border-[rgba(197,155,85,0.16)] bg-white/70 shadow-[0_20px_40px_rgba(82,49,33,0.12)] min-[1100px]:ml-[85px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.94 / 1" }}
                    >
                      <Image
                        src="/img/photos/floor-0/3.png"
                        alt="La salle principale des Artistes"
                        fill
                        sizes="(max-width: 1099px) 100vw, 720px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 min-[720px]:grid-cols-2 min-[1100px]:mt-0">
                    <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:left-0 min-[1100px]:top-[300px] min-[1100px]:w-[220px]">
                      <div
                        className="relative"
                        style={{ aspectRatio: "0.82 / 1" }}
                      >
                        <Image
                          src="/img/photos/outside/5.png"
                          alt="La terrasse des Artistes"
                          fill
                          sizes="(max-width: 719px) 100vw, 220px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="relative overflow-hidden border border-[rgba(197,155,85,0.22)] bg-[var(--la-burgundy)] px-7 py-8 text-[#fbf4ea] shadow-[0_18px_36px_rgba(74,45,31,0.16)] min-[1100px]:absolute min-[1100px]:bottom-[22px] min-[1100px]:right-[-18px] min-[1100px]:w-[252px]">
                      <p className="la-home__eyebrow text-[rgba(251,244,234,0.72)]">
                        Introuvable
                      </p>
                      <p className="la-home__display mt-3 text-[82px] leading-[0.78] text-[#fbf4ea]">
                        404
                      </p>
                      <p className="mt-5 text-[16px] leading-[1.42] text-[rgba(251,244,234,0.82)]">
                        On vous remet sur la bonne scène.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="la-shell py-10 tablet:py-12 desktop:py-14">
            <div className="la-home__framed-section la-home__framed-section--title-absolute la-home__framed-section--experience">
              <div className="la-home__framed-heading la-home__framed-heading--absolute text-center">
                <p className="la-home__eyebrow">Reprendre votre visite</p>
                <div className="la-home__framed-title-row la-home__framed-title-row--with-lines">
                  <h2 className="la-home__section-title">Les accès utiles</h2>
                </div>
              </div>

              <div className="la-home__framed-content px-4 pb-4 pt-4 tablet:px-6 desktop:px-8">
                <div className="grid border-y border-[rgba(197,155,85,0.2)] min-[900px]:grid-cols-3">
                  {recoveryLinks.map((item, index) => (
                    <RecoveryCard key={item.href} item={item} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
