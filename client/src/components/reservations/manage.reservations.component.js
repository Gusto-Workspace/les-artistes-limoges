import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";
import { buildSiteContactSummary } from "@/_assets/utils/contact.utils";
import ActionLinkComponent from "@/components/_shared/action-link.component";
import FooterComponent from "@/components/_shared/footer/footer.component";
import HeroOrnamentComponent from "@/components/_shared/hero-ornament.component";
import NavComponent from "@/components/_shared/nav/nav.component";
import {
  getReservationStatusLabel,
  parseReservationDateValue,
} from "@/utils/reservations";

const navigationItems = [
  { label: "Accueil", href: "/" },
  { label: "Carte & Menus", href: "/menus" },
  { label: "Contact", href: "/contact" },
];

export default function ManageReservationsComponent({
  reservationId,
  apiBaseUrl,
}) {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurant = restaurantContext?.restaurantData;
  const restaurantLoading = restaurantContext?.dataLoading;
  const { phone, phoneHref } = buildSiteContactSummary(restaurant);

  const [reservation, setReservation] = useState(null);
  const [management, setManagement] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const reservationRestaurantId = useMemo(
    () =>
      String(
        reservation?.restaurant_id?._id || reservation?.restaurant_id || "",
      ),
    [reservation],
  );

  const restaurantMismatch = useMemo(() => {
    if (!reservationRestaurantId || !restaurant?._id || restaurantLoading) {
      return false;
    }

    return String(restaurant._id) !== reservationRestaurantId;
  }, [reservationRestaurantId, restaurant?._id, restaurantLoading]);

  const reservationStatusLabel = getReservationStatusLabel(reservation?.status);
  const isAwaitingBankHold =
    String(reservation?.status || "") === "AwaitingBankHold" &&
    management?.reasonCode !== "BANK_HOLD_EXPIRED";
  const isCanceled = String(reservation?.status || "") === "Canceled";
  const canCancel = management?.canCancel === true && !restaurantMismatch;

  const fetchReservation = useCallback(async () => {
    if (!apiBaseUrl || !reservationId) return;

    try {
      setIsLoading(true);
      setLoadError("");

      const response = await fetch(
        `${apiBaseUrl}/reservations/${reservationId}`,
      );
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          getReservationApiErrorMessage({
            payload: data,
            status: response.status,
            fallbackMessage: "Impossible de retrouver cette réservation.",
          }),
        );
      }

      if (!data?.reservation) {
        throw new Error("Impossible de retrouver cette réservation.");
      }

      setReservation(data.reservation);
      setManagement(data.management || null);
      setShowCancelConfirm(false);
    } catch (fetchError) {
      setLoadError(
        fetchError?.message || "Impossible de retrouver cette réservation.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, reservationId]);

  useEffect(() => {
    fetchReservation();
  }, [fetchReservation]);

  async function handleCancelReservation() {
    if (!reservation?._id) return;

    try {
      setIsCanceling(true);
      setError("");
      setSuccessMessage("");

      const response = await fetch(
        `${apiBaseUrl}/reservations/${reservation._id}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          getReservationApiErrorMessage({
            payload: data,
            status: response.status,
            fallbackMessage: "Impossible d’annuler la réservation.",
          }),
        );
      }

      setReservation(data.reservation || null);
      setManagement(data.management || null);
      setShowCancelConfirm(false);
      setSuccessMessage(
        data?.message || "Votre réservation a bien été annulée.",
      );
    } catch (cancelError) {
      setError(cancelError?.message || "Impossible d’annuler la réservation.");
    } finally {
      setIsCanceling(false);
    }
  }

  if (isLoading || (reservation && restaurantLoading)) {
    return (
      <ManagementShell>
        <StateCard
          eyebrow="Réservation"
          title="Chargement en cours"
          description="Nous retrouvons votre réservation."
          loading
        />
      </ManagementShell>
    );
  }

  if (loadError) {
    return (
      <ManagementShell>
        <StateCard
          eyebrow="Lien invalide"
          title="Réservation introuvable"
          description={loadError}
          actions={[
            { href: "/reservations", label: "Réserver une table" },
            {
              href: phoneHref,
              label: "Contacter le restaurant",
              secondary: true,
            },
          ]}
        />
      </ManagementShell>
    );
  }

  if (restaurantMismatch) {
    return (
      <ManagementShell>
        <StateCard
          eyebrow="Lien invalide"
          title="Ce lien ne correspond pas à ce restaurant"
          description="La réservation associée à ce lien n’est pas rattachée au site Les Artistes."
          actions={[
            { href: "/reservations", label: "Retour aux réservations" },
            {
              href: phoneHref,
              label: "Contacter le restaurant",
              secondary: true,
            },
          ]}
        />
      </ManagementShell>
    );
  }

  if (!restaurant) {
    return (
      <ManagementShell>
        <StateCard
          eyebrow="Indisponible"
          title="Le restaurant n’a pas pu être chargé"
          description="Nous n’avons pas réussi à charger les informations du restaurant pour vérifier ce lien."
          actions={[
            { href: phoneHref, label: "Contacter le restaurant" },
            {
              href: "/reservations",
              label: "Retour aux réservations",
              secondary: true,
            },
          ]}
        />
      </ManagementShell>
    );
  }

  return (
    <ManagementShell>
      <section className="la-shell border-b border-[rgba(197,155,85,0.22)] pb-9 tablet:pb-10 desktop:pb-12">
        <div className="grid gap-12 min-[1100px]:grid-cols-[0.82fr_1.18fr] min-[1100px]:items-center">
          <div className="desktop:py-24">
            

            <h1 className="la-home__display mt-4 text-[56px] leading-[0.88] tracking-[-0.035em] text-[var(--la-burgundy)] tablet:text-[72px] desktop:text-[100px]">
              Consulter
              <br />
              <span className="la-home__script text-[0.8em] text-[var(--la-gold)]">
                votre réservation
              </span>
            </h1>

            <p className="mt-7 text-[18px] leading-[1.48] text-[rgba(86,57,44,0.88)] desktop:text-[19px]">
              Retrouvez ici le récapitulatif de votre venue aux Artistes et, si
              nécessaire, annulez votre réservation en ligne.
            </p>

            <p className="mt-5 text-[17px] leading-[1.6] text-[rgba(86,57,44,0.82)]">
              Pour toute modification concernant votre réservation, merci de
              contacter directement le restaurant.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <StatusBadge status={reservation?.status} />
            </div>

            <div className="mt-9 flex flex-col gap-4 min-[560px]:flex-row">
              <ActionLinkComponent
                href={phoneHref}
                className="min-[560px]:min-w-[220px]"
              >
                Nous appeler
              </ActionLinkComponent>
              <ActionLinkComponent
                href="/reservations"
                secondary
                className="min-[560px]:min-w-[220px]"
              >
                Nouvelle réservation
              </ActionLinkComponent>
            </div>
          </div>

          <div className="relative min-[1100px]:pl-10">
            <div className="absolute right-0 top-0 hidden h-[170px] w-[160px] desktop:block">
              <HeroOrnamentComponent />
            </div>

            <div className="site-card relative overflow-hidden rounded-[30px] p-6 tablet:p-8 desktop:p-10">
              <div className="absolute right-[-18px] top-[-18px] h-[98px] w-[98px] rounded-full border border-[rgba(197,155,85,0.28)] bg-[rgba(197,155,85,0.08)]" />
              <p className="script-font text-[34px] leading-none text-[var(--site-orange-deep)]">
                Les Artistes
              </p>
              <h2 className="yeseva-one-regular mt-2 text-[40px] leading-[0.92] text-[var(--site-ink)] tablet:text-[48px]">
                Votre table vous attend
              </h2>
              <p className="mt-4 text-[16px] leading-[1.7] text-[var(--site-ink-soft)] tablet:text-[17px]">
                Consultez le détail de votre réservation et utilisez cette page
                uniquement si vous devez l’annuler.
              </p>

              <div className="mt-8 grid gap-4 min-[620px]:grid-cols-2">
                <InfoBadge
                  label="Date"
                  value={getSummaryDateLabel(reservation?.reservationDate)}
                />
                <InfoBadge
                  label="Horaire"
                  value={formatTimeDisplay(reservation?.reservationTime)}
                />
                <InfoBadge
                  label="Convives"
                  value={formatGuestsLabel(reservation?.numberOfGuests)}
                />
                <InfoBadge label="Statut" value={reservationStatusLabel} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="reservation-manage-form"
        className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
      >
        <div className="la-reservation__panel relative overflow-hidden px-5 py-6 tablet:px-7 tablet:py-8 desktop:px-8 desktop:py-9">
          <div className="grid gap-10 desktop:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] desktop:gap-0">
            <div className="desktop:pr-10">
              {renderPrimaryContent({
                reservation,
                management,
                isAwaitingBankHold,
                isCanceled,
                canCancel,
                error,
                successMessage,
                isCanceling,
                showCancelConfirm,
                setShowCancelConfirm,
                handleCancelReservation,
                phoneHref,
                reservationId,
              })}
            </div>

            <div className="desktop:border-l desktop:border-[rgba(197,155,85,0.22)] desktop:pl-10">
              <h2 className="la-reservation__panel-title">Récapitulatif</h2>

              <div className="mt-8 space-y-6">
                <SummaryRow
                  iconSrc="/img/pictos/14.png"
                  label="Restaurant"
                  value="Les Artistes"
                />
                <SummaryRow
                  iconSrc="/img/pictos/15.png"
                  label="Nom"
                  value={getCustomerFullName(reservation)}
                />
                <SummaryRow
                  iconSrc="/img/pictos/17.png"
                  label="Date"
                  value={getSummaryDateLabel(reservation?.reservationDate)}
                />
                <SummaryRow
                  iconSrc="/img/pictos/26.png"
                  label="Horaire"
                  value={formatTimeDisplay(reservation?.reservationTime)}
                />
                <SummaryRow
                  iconSrc="/img/pictos/16.png"
                  label="Personnes"
                  value={formatGuestsLabel(reservation?.numberOfGuests)}
                />
                <SummaryRow
                  iconSrc="/img/pictos/1.png"
                  label="Téléphone"
                  value={reservation?.customerPhone || "Non renseigné"}
                />
                <SummaryRow
                  iconSrc="/img/pictos/20.png"
                  label="E-mail"
                  value={reservation?.customerEmail || "Non renseigné"}
                />
                <SummaryRow
                  iconSrc="/img/pictos/4.png"
                  label="Statut"
                  value={reservationStatusLabel}
                />
                {reservation?.commentary ? (
                  <SummaryRow
                    iconSrc="/img/pictos/10.png"
                    label="Commentaire"
                    value={reservation.commentary}
                  />
                ) : null}
              </div>

              <div className="la-reservation__advice-box mt-8">
                <p>
                  Un changement d’horaire ou de nombre de couverts ?
                  <br />
                  Merci d’appeler directement le restaurant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ManagementShell>
  );
}

function ManagementShell({ children }) {
  return (
    <div className="la-home la-reservations">
      <NavComponent items={navigationItems} />
      <main>{children}</main>
      <FooterComponent />
    </div>
  );
}

function StateCard({
  eyebrow,
  title,
  description,
  actions = [],
  loading = false,
}) {
  return (
    <section className="la-shell py-12 tablet:py-14 desktop:py-16">
      <div className="site-card mx-auto max-w-[760px] rounded-[30px] p-7 text-center tablet:p-10">
        <p className="script-font text-[34px] leading-none text-[var(--site-orange-deep)]">
          {eyebrow}
        </p>
        <h1 className="yeseva-one-regular mt-3 text-balance text-[42px] leading-[0.92] text-[var(--site-ink)] tablet:text-[56px]">
          {title}
        </h1>
        <p className="mt-5 text-[16px] leading-[1.75] text-[var(--site-ink-soft)] tablet:text-[17px]">
          {description}
        </p>
        {loading ? (
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/70 px-5 py-3 text-[15px] text-[var(--site-ink-soft)]">
            <Loader2 size={18} className="animate-spin" />
            Chargement…
          </div>
        ) : null}
        {actions.length > 0 ? (
          <div className="mt-9 flex flex-col items-center justify-center gap-4 min-[560px]:flex-row">
            {actions.map((action) => (
              <ActionLinkComponent
                key={`${action.href}-${action.label}`}
                href={action.href}
                secondary={action.secondary}
                className="min-[560px]:min-w-[220px]"
              >
                {action.label}
              </ActionLinkComponent>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function renderPrimaryContent({
  reservation,
  management,
  isAwaitingBankHold,
  isCanceled,
  canCancel,
  error,
  successMessage,
  isCanceling,
  showCancelConfirm,
  setShowCancelConfirm,
  handleCancelReservation,
  phoneHref,
  reservationId,
}) {
  if (isAwaitingBankHold) {
    return (
      <div>
        <h2 className="la-reservation__panel-title">
          Validation encore requise
        </h2>
        <p className="mt-6 text-[17px] leading-[1.75] text-[rgba(86,57,44,0.88)]">
          Cette réservation attend encore la validation de votre empreinte
          bancaire. Finalisez cette étape pour confirmer votre venue.
        </p>

        <div className="mt-8 rounded-[24px] border border-[rgba(197,155,85,0.26)] bg-white/50 p-5">
          <p className="la-home__eyebrow text-[var(--la-burgundy)]">
            Réservation en attente
          </p>
          <p className="mt-3 text-[16px] leading-[1.7] text-[rgba(86,57,44,0.84)]">
            Pour toute modification, merci de contacter directement le
            restaurant.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 min-[560px]:flex-row">
          <ActionLinkComponent
            href={`/reservations/${reservationId}/bank-hold`}
            className="min-[560px]:min-w-[240px]"
          >
            Finaliser la validation
          </ActionLinkComponent>
          <ActionLinkComponent
            href={phoneHref}
            secondary
            className="min-[560px]:min-w-[220px]"
          >
            Joindre le restaurant
          </ActionLinkComponent>
        </div>
      </div>
    );
  }

  if (isCanceled) {
    return (
      <div>
        <h2 className="la-reservation__panel-title">Réservation annulée</h2>
        <p className="mt-6 text-[17px] leading-[1.75] text-[rgba(86,57,44,0.88)]">
          Cette réservation a bien été annulée. Si vous souhaitez revenir aux
          Artistes, vous pouvez réserver un nouveau créneau à tout moment.
        </p>

        {successMessage ? (
          <div className="la-reservation__alert la-reservation__alert--success mt-6">
            {successMessage}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 min-[560px]:flex-row">
          <ActionLinkComponent
            href="/reservations"
            className="min-[560px]:min-w-[220px]"
          >
            Réserver à nouveau
          </ActionLinkComponent>
          <ActionLinkComponent
            href={phoneHref}
            secondary
            className="min-[560px]:min-w-[220px]"
          >
            Appeler le restaurant
          </ActionLinkComponent>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="la-reservation__panel-title">Annuler ma réservation</h2>
      <p className="mt-6 text-[17px] leading-[1.75] text-[rgba(86,57,44,0.88)]">
        Cette page permet uniquement d’annuler votre réservation.
      </p>
      <p className="mt-3 text-[17px] leading-[1.75] text-[rgba(86,57,44,0.88)]">
        Pour toute modification concernant votre réservation, merci de contacter
        directement le restaurant.
      </p>

      {error ? (
        <div className="la-reservation__alert la-reservation__alert--error mt-8">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="la-reservation__alert la-reservation__alert--success mt-8">
          {successMessage}
        </div>
      ) : null}

      {canCancel ? (
        <>
          <div className="mt-8 rounded-[22px] border border-[rgba(197,155,85,0.26)] bg-white/55 p-5 text-[16px] leading-[1.7] text-[rgba(86,57,44,0.84)]">
            En confirmant l’annulation, votre réservation sera immédiatement
            annulée et ce créneau pourra redevenir disponible.
          </div>

          <div className="mt-8 flex flex-col gap-4 min-[560px]:flex-row">
            <button
              type="button"
              onClick={() => setShowCancelConfirm((prev) => !prev)}
              className="la-button la-button--primary min-[560px]:min-w-[240px]"
            >
              Annuler la réservation
            </button>
            <ActionLinkComponent
              href={phoneHref}
              secondary
              className="min-[560px]:min-w-[220px]"
            >
              Appeler le restaurant
            </ActionLinkComponent>
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-[22px] border border-[rgba(197,155,85,0.26)] bg-white/55 p-5 text-[16px] leading-[1.7] text-[rgba(86,57,44,0.84)]">
          {management?.reasonMessage ||
            "Cette réservation ne peut plus être annulée en ligne."}
        </div>
      )}

      {showCancelConfirm ? (
        <div className="mt-8 rounded-[22px] border border-[rgba(161,70,70,0.18)] bg-[rgba(255,241,239,0.9)] p-5 text-[15px] leading-[1.65] text-[#8f3939]">
          <p className="m-0">
            Confirmez-vous l’annulation de cette réservation ?
          </p>
          <div className="mt-4 flex flex-col gap-3 min-[560px]:flex-row">
            <button
              type="button"
              onClick={handleCancelReservation}
              disabled={isCanceling}
              className="la-button la-button--primary min-[560px]:min-w-[220px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCanceling ? "Annulation..." : "Oui, annuler"}
            </button>
            <button
              type="button"
              onClick={() => setShowCancelConfirm(false)}
              className="la-button la-button--outline min-[560px]:min-w-[220px]"
            >
              Garder ma réservation
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SummaryRow({ iconSrc, label, value }) {
  return (
    <div className="la-reservation__summary-row">
      <Image
        src={iconSrc}
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        className="la-reservation__summary-icon"
      />
      <div className="la-reservation__summary-copy">
        <p className="la-reservation__summary-label">{label}</p>
        <p className="la-reservation__summary-value">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalizedStatus = String(status || "").trim();
  const label = getReservationStatusLabel(normalizedStatus);
  const className =
    normalizedStatus === "Canceled"
      ? "bg-[rgba(161,70,70,0.12)] text-[#8f3939] border-[rgba(161,70,70,0.18)]"
      : normalizedStatus === "Confirmed"
        ? "bg-[rgba(125,156,106,0.14)] text-[#355a2b] border-[rgba(125,156,106,0.18)]"
        : "bg-[rgba(111,32,42,0.08)] text-[var(--la-burgundy)] border-[rgba(111,32,42,0.14)]";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-[13px] uppercase tracking-[0.18em] ${className}`}
    >
      {label}
    </span>
  );
}

function InfoBadge({ label, value }) {
  return (
    <div className="rounded-[20px] border border-[var(--site-line)] bg-white/70 p-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--site-orange-deep)]">
        {label}
      </p>
      <p className="mt-2 text-[17px] leading-[1.45] text-[var(--site-ink)]">
        {value}
      </p>
    </div>
  );
}

function getCustomerFullName(reservation) {
  return (
    `${String(reservation?.customerFirstName || "").trim()} ${String(
      reservation?.customerLastName || "",
    ).trim()}`.trim() || "Nom non renseigné"
  );
}

function getSummaryDateLabel(date) {
  const parsedDate = parseReservationDateValue(date);
  if (!parsedDate) return "Date non renseignée";

  return capitalizeFirstLetter(
    format(parsedDate, "EEEE d MMMM yyyy", { locale: fr }),
  );
}

function formatTimeDisplay(time) {
  const normalized = String(time || "")
    .trim()
    .slice(0, 5);
  const match = normalized.match(/^(\d{2}):(\d{2})$/);

  if (!match) return "Horaire non renseigné";

  return `${match[1]}h${match[2]}`;
}

function formatGuestsLabel(value) {
  const guests = Number(value || 0);
  if (!guests) return "Non renseigné";
  return `${guests} ${guests > 1 ? "personnes" : "personne"}`;
}

function capitalizeFirstLetter(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getReservationApiErrorMessage({ payload, status, fallbackMessage }) {
  const code = String(payload?.code || "").trim();
  const message = String(payload?.message || "").trim();

  if (status === 404 || message.toLowerCase().includes("not found")) {
    return "Ce lien de gestion est invalide ou la réservation n’existe plus.";
  }

  if (code === "NOT_MODIFIABLE") {
    return message || "Cette réservation ne peut plus être annulée en ligne.";
  }

  if (
    message.toLowerCase().includes("expir") ||
    message.toLowerCase().includes("introuvable")
  ) {
    return message;
  }

  return message || fallbackMessage;
}
