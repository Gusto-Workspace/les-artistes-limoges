import ResumeReservationsComponent from "@/components/reservations/resume.reservations.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";

export default function ReservationResumePage({ reservationId }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Suivi de réservation"
        description="Consultez le suivi de votre réservation Les Artistes."
        path={reservationId ? `/reservations/${reservationId}` : "/reservations"}
        image="/img/brand/og-les-artistes.svg"
        noIndex={true}
      />

      <ResumeReservationsComponent
        reservationId={reservationId}
        apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
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
