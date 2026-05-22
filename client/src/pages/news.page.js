import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/global.context";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import ListNewsComponent from "@/components/news/list.news.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact" },
];

export default function NewsPage({ seoRestaurantData = null }) {
  const { restaurantContext } = useContext(GlobalContext);

  return (
    <>
      <SeoHeadComponent
        title="Actualités | Les Artistes Limoges"
        description="Retrouvez les actualités des Artistes à Limoges : annonces de service, nouveautés de la carte, événements et prochains rendez-vous."
        path="/news"
        image="/img/brand/og-les-artistes.jpg"
        pageSchemaType="CollectionPage"
        keywords={[
          "actualités Les Artistes Limoges",
          "événements restaurant Limoges",
          "nouveautés brasserie Limoges",
        ]}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Actualités", path: "/news" },
        ]}
        restaurantData={seoRestaurantData}
      />

      <div className="la-home">
        <NavComponent items={navigationItems} />

        <main>
          <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10 desktop:pb-12">
            <div className="grid gap-12 min-[1100px]:grid-cols-[0.78fr_1.22fr] min-[1100px]:items-center">
              <div>
                <h1 className="la-home__display mt-4 text-[58px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[102px]">
                  Actualités
                  <br />
                  <span className="la-home__script text-[0.8em] text-[var(--la-gold)]">
                    des Artistes
                  </span>
                </h1>

                <p className="mt-7 max-w-[620px] text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
                  Événements, annonces de service, nouveautés de la carte et
                  moments à ne pas manquer : retrouvez ici ce qui anime la
                  brasserie à deux pas de l’Opéra.
                </p>

                <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
                  <ActionLinkComponent
                    href="#actualites"
                    className="min-[560px]:min-w-[220px]"
                  >
                    Voir les actualités
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

                <div className="la-hero-media relative mx-auto max-w-[860px] min-[1100px]:mr-0">
                  <div className="la-hero-media__main relative overflow-hidden border border-[rgba(197,155,85,0.16)] bg-white/70 shadow-[0_20px_40px_rgba(82,49,33,0.12)] min-[1100px]:ml-[85px]">
                    <div
                      className="relative"
                      style={{ aspectRatio: "0.94 / 1" }}
                    >
                      <Image
                        src="/img/photos/floor-1/2.png"
                        alt="L'étage cosy des Artistes"
                        fill
                        sizes="(max-width: 1099px) 100vw, 720px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  <div className="la-hero-media__thumbs mt-5 grid gap-5 min-[720px]:grid-cols-2 min-[1100px]:mt-0">
                    <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:bottom-[70px] min-[1100px]:left-[-24px] min-[1100px]:w-[230px]">
                      <div
                        className="relative"
                        style={{ aspectRatio: "0.82 / 1" }}
                      >
                        <Image
                          src="/img/photos/outside/5.png"
                          alt="La terrasse des Artistes"
                          fill
                          sizes="(max-width: 719px) 100vw, 230px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="la-home__overlay-photo relative overflow-hidden bg-white min-[1100px]:absolute min-[1100px]:right-[-30px] min-[1100px]:top-[255px] min-[1100px]:w-[238px]">
                      <div
                        className="relative"
                        style={{ aspectRatio: "0.84 / 1" }}
                      >
                        <Image
                          src="/img/photos/floor-0/4.png"
                          alt="La salle des Artistes"
                          fill
                          sizes="(max-width: 719px) 100vw, 238px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="actualites">
            <ListNewsComponent
              restaurantData={restaurantContext?.restaurantData}
              dataLoading={restaurantContext?.dataLoading}
            />
          </div>
        </main>

        <FooterComponent />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return buildStaticPageProps(locale, ["common"]);
}
