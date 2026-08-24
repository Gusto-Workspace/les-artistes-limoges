import ManageReservationsComponent from "@/components/reservations/manage.reservations.component";
import SeoHeadComponent from "@/components/_shared/seo/seo-head.component";

export default function ReservationManagePage({ reservationId, manageToken }) {
  return (
    <>
      <SeoHeadComponent
        title="Les Artistes | Gérer ma réservation"
        description="Consultez et modifiez votre réservation Les Artistes, ou annulez-la en ligne si nécessaire."
        path={
          reservationId
            ? `/reservations/${reservationId}/manage`
            : "/reservations"
        }
        image="/img/brand/og-les-artistes.jpg"
        noIndex={true}
      />

      <ManageReservationsComponent
        reservationId={reservationId}
        manageToken={manageToken}
        apiBaseUrl={process.env.NEXT_PUBLIC_API_URL}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { reservationId } = context.params;
  const manageToken = String(context.query?.token || "").trim();

  return {
    props: {
      reservationId: reservationId || null,
      manageToken,
    },
  };
}
