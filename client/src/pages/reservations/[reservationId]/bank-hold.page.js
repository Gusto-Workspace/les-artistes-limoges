import BankHoldReservationsComponent from "@/components/reservations/bank-hold.reservations.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";

export default function ReservationBankHoldPage({ reservationId }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Validation carte"
        description="Validez l’empreinte bancaire liée à votre réservation Les Artistes."
        path={
          reservationId
            ? `/reservations/${reservationId}/bank-hold`
            : "/reservations"
        }
        image="/img/brand/og-les-artistes.svg"
        noIndex={true}
      />

      <BankHoldReservationsComponent
        reservationId={reservationId}
        apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
        stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { reservationId } = context.params;

  return {
    props: {
      reservationId: reservationId || null,
    },
  };
}
