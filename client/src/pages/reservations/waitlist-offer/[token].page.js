import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";
import WaitlistOfferReservationsComponent from "@/components/reservations/waitlist-offer.reservations.component";

export default function ReservationWaitlistOfferPage({ token }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Proposition liste d’attente"
        description="Répondez à une proposition de place pour votre réservation Les Artistes."
        path={token ? `/reservations/waitlist-offer/${token}` : "/reservations"}
        image="/img/brand/og-les-artistes.jpg"
        noIndex={true}
      />

      <WaitlistOfferReservationsComponent
        token={token}
        apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.params;

  return {
    props: {
      token: token || null,
    },
  };
}
