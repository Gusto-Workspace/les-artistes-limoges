import Link from "next/link";
import { ArrowRight, CalendarDays, Home, Newspaper, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NavComponent from "@/components/_shared/nav/nav.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import BannerComponent from "@/components/_shared/banner/banner.component";
import RevealOnScrollComponent from "@/components/_shared/motion/reveal-on-scroll.component";
import SectionHeadingComponent from "@/components/_shared/section-heading.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import { buildStaticPageProps } from "@/_assets/utils/page-props.utils";

const quickLinks = [
  {
    href: "/",
    label: "Retour à l’accueil",
    description: "Revenir à la page principale du site Les Artistes.",
    icon: Home,
  },
  {
    href: "/menus",
    label: "Voir les menus",
    description: "Accéder à la carte, aux plats et aux formules visibles.",
    icon: ArrowRight,
  },
  {
    href: "/news",
    label: "Ouvrir les actualités",
    description: "Consulter les annonces, nouveautés et prochains rendez-vous.",
    icon: Newspaper,
  },
  {
    href: "/reservations",
    label: "Réserver",
    description: "Reprendre directement le parcours de réservation en ligne.",
    icon: CalendarDays,
  },
  {
    href: "/contact",
    label: "Contacter la maison",
    description: "Retrouver les coordonnées, la carte et le formulaire.",
    icon: Phone,
  },
];

function QuickLinkCard({ item, index }) {
  const Icon = item.icon;

  return (
    <RevealOnScrollComponent
      as="article"
      delay={index * 80}
      variant="up"
      className="site-card flex h-full flex-col rounded-[30px] p-6 tablet:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--site-line)] bg-white/75 text-[var(--site-orange-deep)]">
          <Icon size={20} strokeWidth={1.7} />
        </div>
        <span className="nav-font text-[10px] uppercase text-[rgba(18,18,20,0.38)]">
          0{index + 1}
        </span>
      </div>

      <h3 className="yeseva-one-regular mt-8 text-[34px] leading-[0.92] text-[var(--site-ink)]">
        {item.label}
      </h3>

      <p className="mt-4 flex-1 text-[15px] leading-[1.8] text-[var(--site-ink-soft)]">
        {item.description}
      </p>

      <Link
        href={item.href}
        className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--site-orange-deep)] transition hover:opacity-72"
      >
        Ouvrir
        <ArrowRight size={16} strokeWidth={1.7} />
      </Link>
    </RevealOnScrollComponent>
  );
}

export default function NotFoundPage() {
  const heroRef = useRef(null);
  const [showScrolledNav, setShowScrolledNav] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrolledNav(entry.intersectionRatio <= 0.1);
      },
      {
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Page introuvable"
        description="La page demandée est introuvable. Revenez à l’accueil ou utilisez les accès principaux du site Les Artistes."
        path="/404"
        image="/img/brand/og-les-artistes.svg"
        noIndex
      />

      <div className="relative bg-[var(--site-cream)]">
        <NavComponent isVisible={!showScrolledNav} scrolled={false} />
        <NavComponent isVisible={showScrolledNav} scrolled />

        <main>
          <div ref={heroRef}>
            <BannerComponent
              eyebrow="Erreur 404"
              title="Cette page n’existe plus."
              description="L’adresse demandée est introuvable ou a changé. Les accès principaux du site restent disponibles juste en dessous."
            />
          </div>

          <section className="site-shell px-5 py-20 tablet:px-8 tablet:py-24 desktop:px-[90px] desktop:py-[110px]">
            <div className="mx-auto max-w-[1450px]">
              <SectionHeadingComponent
                eyebrow="Navigation"
                title="Retrouver le bon chemin"
                description="Les pages essentielles de Les Artistes restent accessibles ici pour reprendre votre visite sans détour."
              />

              <div className="mt-14 grid gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
                {quickLinks.map((item, index) => (
                  <QuickLinkCard key={item.href} item={item} index={index} />
                ))}
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
