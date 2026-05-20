import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addDays,
  differenceInCalendarDays,
  format,
  startOfToday,
} from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ChevronRight, Loader2, X } from "lucide-react";
import { buildContactInfos } from "@/_assets/utils/contact.utils";
import {
  formatReservationDateForApi,
  getAvailableReservationTimes,
  parseReservationDateValue,
} from "@/utils/reservations";

const RESERVATION_TIME_OPTIONS = [
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
];

const peopleOptions = Array.from({ length: 12 }, (_, index) =>
  String(index + 1),
);

const PENDING_BANK_HOLD_STORAGE_KEY = "gm_pending_bank_hold";

export default function FormReservationComponent({
  apiBaseUrl,
  restaurant,
  onBooked,
  dataLoading,
}) {
  const router = useRouter();
  const today = useMemo(() => startOfToday(), []);
  const initialDate = useMemo(() => today, [today]);
  const [reservationData, setReservationData] = useState({
    reservationDate: initialDate,
    reservationTime: "19:30",
    numberOfGuests: "2",
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerPhone: "",
    commentary: "",
    table: "",
  });
  const quickDateOptions = useMemo(
    () => getQuickDateOptions(reservationData.reservationDate, today),
    [reservationData.reservationDate, today],
  );
  const [availableTimes, setAvailableTimes] = useState([]);
  const [
    resolvedAvailabilitySelectionKey,
    setResolvedAvailabilitySelectionKey,
  ] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState({});
  const [reservationsList, setReservationsList] = useState([]);
  const [reservationsListLoading, setReservationsListLoading] = useState(false);
  const [hasAppliedQueryPrefill, setHasAppliedQueryPrefill] = useState(false);
  const [pendingPrefilledTime, setPendingPrefilledTime] = useState("");
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const parameters =
    restaurant?.reservationsSettings ||
    restaurant?.reservations?.parameters ||
    {};
  const manage = !!parameters.manage_disponibilities;
  const [idempotencyKey] = useState(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    return `resa_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  });
  const [pendingBankHoldReservation, setPendingBankHoldReservation] =
    useState(null);
  const [showPendingBankHoldModal, setShowPendingBankHoldModal] =
    useState(false);
  const [isCancelingPendingBankHold, setIsCancelingPendingBankHold] =
    useState(false);
  const contactInfos = buildContactInfos(restaurant);
  const contactByKey = Object.fromEntries(
    contactInfos.map((item) => [item.key, item]),
  );
  const address =
    contactByKey.address?.value && contactByKey.address.value !== "-"
      ? contactByKey.address.value
      : "4 rue Fitz-James, 87000 Limoges";
  const phone =
    contactByKey.phone?.value && contactByKey.phone.value !== "-"
      ? contactByKey.phone.value
      : "05 55 34 12 43";
  const phoneHref = contactByKey.phone?.href || "tel:0555341243";

  const fetchReservationsList = useCallback(async () => {
    if (!apiBaseUrl || !restaurant?._id) {
      setReservationsList([]);
      return [];
    }

    try {
      setReservationsListLoading(true);
      const res = await fetch(
        `${apiBaseUrl}/public/restaurants/${restaurant._id}/reservations`,
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || "Impossible de charger les réservations.",
        );
      }

      const nextReservations = Array.isArray(data?.reservations)
        ? data.reservations
        : [];
      setReservationsList(nextReservations);
      return nextReservations;
    } catch (fetchError) {
      console.error("[fetchReservationsList]", fetchError);
      setReservationsList([]);
      return [];
    } finally {
      setReservationsListLoading(false);
    }
  }, [apiBaseUrl, restaurant?._id]);

  useEffect(() => {
    setReservationData((prev) => ({ ...prev, table: manage ? "auto" : "" }));
  }, [manage]);

  useEffect(() => {
    fetchReservationsList();
  }, [fetchReservationsList]);

  useEffect(() => {
    if (!router.isReady || hasAppliedQueryPrefill) return;

    const nextDate = parseReservationDateValue(router.query.reservationDate);
    const nextTime = normalizeReservationTimeValue(
      router.query.reservationTime,
    );
    const nextGuests = normalizeGuestsValue(router.query.numberOfGuests);

    if (!nextDate && !nextTime && !nextGuests) {
      setHasAppliedQueryPrefill(true);
      return;
    }

    setReservationData((prev) => ({
      ...prev,
      reservationDate: nextDate || prev.reservationDate,
      reservationTime: nextTime || prev.reservationTime,
      numberOfGuests: nextGuests || prev.numberOfGuests,
    }));
    setPendingPrefilledTime(nextTime || "");
    setHasAppliedQueryPrefill(true);
  }, [
    hasAppliedQueryPrefill,
    router.isReady,
    router.query.numberOfGuests,
    router.query.reservationDate,
    router.query.reservationTime,
  ]);

  useEffect(() => {
    async function restorePendingBankHold() {
      try {
        const raw = localStorage.getItem(PENDING_BANK_HOLD_STORAGE_KEY);
        if (!raw) return;

        const parsed = JSON.parse(raw);
        if (!parsed?.reservationId || !parsed?.restaurantId) {
          localStorage.removeItem(PENDING_BANK_HOLD_STORAGE_KEY);
          return;
        }

        if (String(parsed.restaurantId) !== String(restaurant?._id)) {
          return;
        }

        const res = await fetch(
          `${apiBaseUrl}/reservations/${parsed.reservationId}`,
        );

        if (!res.ok) {
          localStorage.removeItem(PENDING_BANK_HOLD_STORAGE_KEY);
          return;
        }

        const data = await res.json();
        const reservation = data?.reservation;

        if (!reservation) {
          localStorage.removeItem(PENDING_BANK_HOLD_STORAGE_KEY);
          return;
        }

        const isAwaiting =
          String(reservation.status) === "AwaitingBankHold" &&
          Boolean(reservation?.bankHold?.enabled);
        const isExpired =
          reservation?.bankHold?.expiresAt &&
          new Date(reservation.bankHold.expiresAt).getTime() <= Date.now();

        if (!isAwaiting || isExpired) {
          localStorage.removeItem(PENDING_BANK_HOLD_STORAGE_KEY);
          return;
        }

        setPendingBankHoldReservation({
          reservationId: String(reservation._id),
          restaurantId: String(reservation.restaurant_id),
          customerFirstName: reservation.customerFirstName || "",
          reservationDate: reservation.reservationDate,
          reservationTime: reservation.reservationTime,
          numberOfGuests: reservation.numberOfGuests,
          expiresAt: reservation?.bankHold?.expiresAt || null,
        });
        setShowPendingBankHoldModal(true);
      } catch (restoreError) {
        console.error("[restorePendingBankHold]", restoreError);
        localStorage.removeItem(PENDING_BANK_HOLD_STORAGE_KEY);
      }
    }

    if (restaurant?._id && apiBaseUrl) {
      restorePendingBankHold();
    }
  }, [apiBaseUrl, restaurant?._id]);

  useEffect(() => {
    if (!restaurant?._id || !reservationData.reservationDate || dataLoading) {
      setAvailableTimes([]);
      setResolvedAvailabilitySelectionKey("");
      setIsLoading(Boolean(dataLoading));
      return;
    }

    if (reservationsListLoading) {
      setIsLoading(true);
      return;
    }

    const nextSelectionKey = getAvailabilitySelectionKey({
      reservationDate: reservationData.reservationDate,
      numberOfGuests: reservationData.numberOfGuests,
    });

    setIsLoading(true);
    setAvailableTimes(
      getAvailableReservationTimes({
        reservationDate: reservationData.reservationDate,
        numberOfGuests: reservationData.numberOfGuests,
        restaurant,
        reservationsList,
        manualTimes: RESERVATION_TIME_OPTIONS,
      }),
    );
    setResolvedAvailabilitySelectionKey(nextSelectionKey);
    setIsLoading(false);
  }, [
    dataLoading,
    restaurant,
    reservationData.numberOfGuests,
    reservationData.reservationDate,
    reservationsList,
    reservationsListLoading,
  ]);

  useEffect(() => {
    if (
      !pendingPrefilledTime ||
      !restaurant?._id ||
      dataLoading ||
      reservationsListLoading ||
      isLoading ||
      resolvedAvailabilitySelectionKey !==
        getAvailabilitySelectionKey({
          reservationDate: reservationData.reservationDate,
          numberOfGuests: reservationData.numberOfGuests,
        })
    ) {
      return;
    }

    if (reservationData.reservationTime !== pendingPrefilledTime) {
      setPendingPrefilledTime("");
      return;
    }

    if (availableTimes.includes(pendingPrefilledTime)) {
      setInvalidFields((prev) => {
        if (!prev.reservationTime) return prev;

        const nextInvalidFields = { ...prev };
        delete nextInvalidFields.reservationTime;
        return nextInvalidFields;
      });
      setPendingPrefilledTime("");
      return;
    }

    setReservationData((prev) => ({
      ...prev,
      reservationTime: "",
    }));
    setInvalidFields((prev) => ({
      ...prev,
      reservationTime: true,
    }));
    setError(
      "Le créneau transmis n’est plus disponible. Merci d’en choisir un autre.",
    );
    setPendingPrefilledTime("");
  }, [
    availableTimes,
    dataLoading,
    isLoading,
    pendingPrefilledTime,
    reservationsListLoading,
    resolvedAvailabilitySelectionKey,
    restaurant?._id,
    reservationData.numberOfGuests,
    reservationData.reservationDate,
    reservationData.reservationTime,
  ]);

  useEffect(() => {
    if (!showCalendarModal) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const computedPaddingRight =
      Number.parseFloat(window.getComputedStyle(document.body).paddingRight) ||
      0;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [showCalendarModal]);

  function handleInputChange(event) {
    const { name, type, value, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setError(null);
    setSuccessMessage("");
    setReservationData((prev) => ({
      ...prev,
      [name]: nextValue,
      ...(name === "numberOfGuests" ? { reservationTime: "" } : {}),
    }));
    setInvalidFields((prev) => {
      if (!prev[name] && !(name === "numberOfGuests" && prev.reservationTime)) {
        return prev;
      }

      const nextInvalidFields = { ...prev };
      delete nextInvalidFields[name];

      if (name === "numberOfGuests") {
        delete nextInvalidFields.reservationTime;
      }

      return nextInvalidFields;
    });
  }

  function handleGuestsSelect(value) {
    setError(null);
    setSuccessMessage("");
    setReservationData((prev) => ({
      ...prev,
      numberOfGuests: value,
      reservationTime: "",
    }));
    setInvalidFields((prev) => {
      const nextInvalidFields = { ...prev };
      delete nextInvalidFields.numberOfGuests;
      delete nextInvalidFields.reservationTime;
      return nextInvalidFields;
    });
  }

  function handleDateChange(nextDate) {
    setError(null);
    setSuccessMessage("");
    setReservationData((prev) => ({
      ...prev,
      reservationDate: nextDate,
      reservationTime: "",
    }));
    setInvalidFields((prev) => {
      const nextInvalidFields = { ...prev };
      delete nextInvalidFields.reservationTime;
      return nextInvalidFields;
    });
    setShowCalendarModal(false);
  }

  function handleTimeSelect(value) {
    setError(null);
    setSuccessMessage("");
    setReservationData((prev) => ({
      ...prev,
      reservationTime: value,
    }));
    setInvalidFields((prev) => {
      if (!prev.reservationTime) return prev;

      const nextInvalidFields = { ...prev };
      delete nextInvalidFields.reservationTime;
      return nextInvalidFields;
    });
  }

  function handleResumePendingBankHold() {
    if (!pendingBankHoldReservation?.reservationId) return;
    window.location.href = `/reservations/${pendingBankHoldReservation.reservationId}/bank-hold`;
  }

  async function handleCancelPendingBankHold() {
    if (!pendingBankHoldReservation?.reservationId) return;

    try {
      setIsCancelingPendingBankHold(true);
      const res = await fetch(
        `${apiBaseUrl}/reservations/${pendingBankHoldReservation.reservationId}/cancel-pending-bank-hold`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || "Impossible d’annuler la réservation en attente.",
        );
      }

      localStorage.removeItem(PENDING_BANK_HOLD_STORAGE_KEY);
      setPendingBankHoldReservation(null);
      setShowPendingBankHoldModal(false);
      await fetchReservationsList();
    } catch (cancelError) {
      setError(
        cancelError?.message ||
          "Impossible d’annuler la réservation en attente.",
      );
    } finally {
      setIsCancelingPendingBankHold(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSuccessMessage("");

    const nextInvalidFields =
      getMissingRequiredReservationFields(reservationData);

    if (Object.keys(nextInvalidFields).length > 0) {
      setInvalidFields((prev) => ({
        ...prev,
        ...nextInvalidFields,
      }));
      return;
    }

    if (!availableTimes.includes(reservationData.reservationTime)) {
      setInvalidFields((prev) => ({
        ...prev,
        reservationTime: true,
      }));
      setError("Veuillez sélectionner un horaire disponible.");
      return;
    }

    setInvalidFields({});
    setIsSubmitting(true);

    let tablePayload = null;
    if (manage) {
      if (reservationData.table && reservationData.table !== "auto") {
        tablePayload = reservationData.table;
      }
    } else {
      tablePayload = reservationData.table || null;
    }

    const payload = {
      reservationDate: formatReservationDateForApi(
        reservationData.reservationDate,
      ),
      reservationTime: reservationData.reservationTime,
      numberOfGuests: reservationData.numberOfGuests,
      customerFirstName: reservationData.customerFirstName.trim(),
      customerLastName: reservationData.customerLastName.trim(),
      customerEmail: reservationData.customerEmail.trim(),
      customerPhone: reservationData.customerPhone.trim(),
      commentary: reservationData.commentary,
      table: tablePayload || undefined,
      returnUrl: `${window.location.origin}/reservations`,
      idempotencyKey,
    };

    try {
      const res = await fetch(
        `${apiBaseUrl}/restaurants/${restaurant._id}/reservations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Erreur lors de la réservation");
      }

      const data = await res.json();
      if (data?.requiresAction && data?.redirectUrl && data?.reservationId) {
        localStorage.setItem(
          PENDING_BANK_HOLD_STORAGE_KEY,
          JSON.stringify({
            reservationId: String(data.reservationId),
            restaurantId: String(restaurant._id),
            customerFirstName: reservationData.customerFirstName.trim(),
            reservationDate: formatReservationDateForApi(
              reservationData.reservationDate,
            ),
            reservationTime: reservationData.reservationTime,
            numberOfGuests: reservationData.numberOfGuests,
          }),
        );
        window.location.href = data.redirectUrl;
        return;
      }

      await fetchReservationsList();
      onBooked?.(data.restaurant || restaurant);
      setReservationData((prev) => ({
        ...prev,
        reservationTime: "",
        customerFirstName: "",
        customerLastName: "",
        customerEmail: "",
        customerPhone: "",
        commentary: "",
        table: manage ? "auto" : "",
      }));
      setInvalidFields({});
      setSuccessMessage(
        "Votre réservation a bien été enregistrée. Nous avons bien reçu votre demande.",
      );

      if (router.query.reservationDate || router.query.reservationTime) {
        await router.replace("/reservations", undefined, { shallow: true });
      }
    } catch (submitError) {
      setError(submitError.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  }

  const formattedDateSecondary = getDateSecondaryLabel(
    reservationData.reservationDate,
  );
  const summaryDate = getSummaryDateLabel(reservationData.reservationDate);
  const summaryGuests = formatGuestsLabel(reservationData.numberOfGuests);
  const summaryTime = reservationData.reservationTime
    ? formatTimeDisplay(reservationData.reservationTime)
    : "À sélectionner";
  const summaryLocation = "Salle principale";
  const selectedDateKey = reservationData.reservationDate
    ? formatReservationDateForApi(reservationData.reservationDate)
    : "";
  const isCustomDateSelection = !quickDateOptions.some(
    (date) => formatReservationDateForApi(date) === selectedDateKey,
  );
  const isReservationFormComplete = useMemo(
    () =>
      Boolean(reservationData.numberOfGuests) &&
      Boolean(reservationData.reservationTime) &&
      Boolean(reservationData.customerFirstName.trim()) &&
      Boolean(reservationData.customerLastName.trim()) &&
      Boolean(reservationData.customerEmail.trim()) &&
      Boolean(reservationData.customerPhone.trim()),
    [
      reservationData.customerEmail,
      reservationData.customerFirstName,
      reservationData.customerLastName,
      reservationData.customerPhone,
      reservationData.numberOfGuests,
      reservationData.reservationTime,
    ],
  );

  return (
    <>
      {showPendingBankHoldModal && pendingBankHoldReservation ? (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(39,20,12,0.55)] px-4">
          <div className="site-card w-full max-w-[620px] rounded-[30px] p-6 tablet:p-8">
            <p className="script-font text-[38px] leading-none text-[var(--site-orange-deep)]">
              Paiement
            </p>
            <h3 className="yeseva-one-regular -mt-1 text-[42px] leading-[0.9] text-[var(--site-ink)] tablet:text-[50px]">
              Réservation en attente
            </h3>
            <p className="mt-4 text-[15px] leading-[1.8] text-[var(--site-ink-soft)] tablet:text-[17px]">
              {pendingBankHoldReservation.customerFirstName
                ? `${pendingBankHoldReservation.customerFirstName}, `
                : ""}
              vous avez une réservation en attente de validation d’empreinte
              bancaire.
            </p>
            <div className="mt-6 rounded-[22px] border border-[var(--site-line)] bg-white/80 p-4 tablet:p-5">
              <div className="grid gap-4 text-[14px] text-[var(--site-ink-soft)] tablet:text-[15px] desktop:grid-cols-3">
                <p>
                  <span className="block text-[11px] uppercase tracking-[0.22em] text-[var(--site-orange-deep)] tablet:text-[12px] tablet:tracking-[0.28em]">
                    Date
                  </span>
                  {format(
                    new Date(pendingBankHoldReservation.reservationDate),
                    "dd/MM/yyyy",
                  )}
                </p>
                <p>
                  <span className="block text-[11px] uppercase tracking-[0.22em] text-[var(--site-orange-deep)] tablet:text-[12px] tablet:tracking-[0.28em]">
                    Heure
                  </span>
                  {pendingBankHoldReservation.reservationTime}
                </p>
                <p>
                  <span className="block text-[11px] uppercase tracking-[0.22em] text-[var(--site-orange-deep)] tablet:text-[12px] tablet:tracking-[0.28em]">
                    Personnes
                  </span>
                  {pendingBankHoldReservation.numberOfGuests}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 tablet:flex-row tablet:justify-end">
              <button
                type="button"
                onClick={handleCancelPendingBankHold}
                disabled={isCancelingPendingBankHold}
                className="flex h-[52px] items-center justify-center rounded-[14px] border border-[var(--site-line)] px-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--site-ink)] transition hover:opacity-80 disabled:opacity-50 tablet:px-6 tablet:text-[13px] tablet:tracking-[0.22em]"
              >
                {isCancelingPendingBankHold
                  ? "Annulation..."
                  : "Annuler la réservation"}
              </button>
              <button
                type="button"
                onClick={handleResumePendingBankHold}
                className="site-button tablet:text-[13px] tablet:tracking-[0.22em]"
              >
                Finaliser
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showCalendarModal ? (
        <div className="la-reservation__calendar-overlay">
          <div className="la-reservation__calendar-shell">
            <button
              type="button"
              onClick={() => setShowCalendarModal(false)}
              className="la-reservation__calendar-close"
              aria-label="Fermer le calendrier"
            >
              <X size={18} strokeWidth={1.9} />
            </button>

            <p className="la-home__eyebrow">Choisir une date</p>
            <h3 className="la-reservation__calendar-title">
              Sélectionnez votre jour de venue
            </h3>

            <div className="mt-6">
              <Calendar
                onChange={(value) => {
                  if (value instanceof Date) {
                    handleDateChange(value);
                  }
                }}
                value={reservationData.reservationDate}
                minDate={startOfToday()}
                locale="fr-FR"
                className="reservation-calendar reservation-calendar--la"
              />
            </div>
          </div>
        </div>
      ) : null}

      <section
        id="reservation-form"
        className="la-shell pb-10 pt-1 tablet:pb-12 desktop:pb-14"
      >
        <div className="la-reservation__panel relative overflow-hidden px-5 py-6 tablet:px-7 tablet:py-8 desktop:px-8 desktop:py-9">
          {!dataLoading ? (
            <form
              onSubmit={handleSubmit}
              className="grid gap-10 desktop:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] desktop:gap-0"
            >
              <div className="desktop:pr-10">
                <h2 className="la-reservation__panel-title">
                  Votre réservation
                </h2>

                <div className="mt-8 space-y-6">
                  <FieldGroup
                    label="A. Nombre de personnes"
                    invalid={invalidFields.numberOfGuests}
                  >
                    <HorizontalChoiceScroller
                      invalid={invalidFields.numberOfGuests}
                      arrowLabel="Voir plus de personnes"
                      watchKey={peopleOptions.join("|")}
                    >
                      <div className="la-reservation__choice-rail">
                        {peopleOptions.map((value) => {
                          const isActive =
                            reservationData.numberOfGuests === value;

                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleGuestsSelect(value)}
                              aria-pressed={isActive}
                              className={`la-reservation__choice-chip ${isActive ? "is-active" : ""}`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </HorizontalChoiceScroller>
                  </FieldGroup>

                  <FieldGroup label="B. Date" invalid={false}>
                    <div className="la-reservation__date-rail custom-scrollbar">
                      {quickDateOptions.map((date) => {
                        const optionKey = formatReservationDateForApi(date);
                        const isActive = optionKey === selectedDateKey;

                        return (
                          <button
                            key={optionKey}
                            type="button"
                            onClick={() => handleDateChange(date)}
                            aria-pressed={isActive}
                            className={`la-reservation__choice-chip la-reservation__choice-chip--date ${isActive ? "is-active" : ""}`}
                          >
                            {getQuickDateChipLabel(date, today)}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => setShowCalendarModal(true)}
                        className={`la-reservation__calendar-trigger ${isCustomDateSelection ? "is-active" : ""}`}
                        aria-label="Choisir une autre date"
                      >
                        <Image
                          src="/img/pictos/17.png"
                          alt=""
                          aria-hidden="true"
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] shrink-0"
                        />
                      </button>
                    </div>
                    {isCustomDateSelection ? (
                      <p className="la-reservation__helper">
                        Date choisie : {formattedDateSecondary}
                      </p>
                    ) : null}
                  </FieldGroup>

                  <FieldGroup
                    label="C. Horaire"
                    invalid={invalidFields.reservationTime}
                  >
                    <HorizontalChoiceScroller
                      invalid={invalidFields.reservationTime}
                      arrowLabel="Voir plus d'horaires"
                      watchKey={`${availableTimes.join("|")}|${isLoading}|${reservationsListLoading}`}
                    >
                      {isLoading || reservationsListLoading ? (
                        <div className="la-reservation__choice-loading">
                          <Loader2 size={17} className="animate-spin" />
                          Chargement des créneaux...
                        </div>
                      ) : (
                        <div className="la-reservation__choice-rail">
                          {availableTimes.map((time) => {
                            const isActive =
                              reservationData.reservationTime === time;

                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                aria-pressed={isActive}
                                className={`la-reservation__choice-chip la-reservation__choice-chip--time ${isActive ? "is-active" : ""}`}
                              >
                                {formatTimeDisplay(time)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </HorizontalChoiceScroller>
                    {!isLoading &&
                    !reservationsListLoading &&
                    !availableTimes.length ? (
                      <p className="la-reservation__helper">
                        Aucun créneau disponible pour cette date.
                      </p>
                    ) : null}
                  </FieldGroup>

                  <div>
                    <p className="la-reservation__step-title">
                      D. Vos informations
                    </p>
                    <div className="mt-4 grid gap-4 tablet:grid-cols-2">
                      <TextField
                        fieldId="reservation-customer-first-name"
                        name="customerFirstName"
                        value={reservationData.customerFirstName}
                        onChange={handleInputChange}
                        placeholder="Prénom"
                        invalid={invalidFields.customerFirstName}
                      />
                      <TextField
                        fieldId="reservation-customer-last-name"
                        name="customerLastName"
                        value={reservationData.customerLastName}
                        onChange={handleInputChange}
                        placeholder="Nom"
                        invalid={invalidFields.customerLastName}
                      />
                      <TextField
                        fieldId="reservation-customer-email"
                        name="customerEmail"
                        type="email"
                        value={reservationData.customerEmail}
                        onChange={handleInputChange}
                        placeholder="E-mail"
                        invalid={invalidFields.customerEmail}
                      />
                      <TextField
                        fieldId="reservation-customer-phone"
                        name="customerPhone"
                        type="tel"
                        value={reservationData.customerPhone}
                        onChange={handleInputChange}
                        placeholder="Téléphone"
                        invalid={invalidFields.customerPhone}
                      />
                      <div className="tablet:col-span-2">
                        <textarea
                          id="reservation-commentary"
                          name="commentary"
                          value={reservationData.commentary}
                          onChange={handleInputChange}
                          rows={4}
                          className="la-reservation__textarea"
                          placeholder="Demandes particulières (facultatif)"
                        />
                      </div>
                    </div>
                  </div>

                  {error ? (
                    <div className="la-reservation__alert la-reservation__alert--error">
                      {error}
                    </div>
                  ) : null}

                  {successMessage ? (
                    <div className="la-reservation__alert la-reservation__alert--success">
                      {successMessage}
                    </div>
                  ) : null}

                  <div className="la-reservation__submit-wrap pt-1">
                    <button
                      type="submit"
                      disabled={
                        !isReservationFormComplete ||
                        isLoading ||
                        reservationsListLoading ||
                        isSubmitting
                      }
                      className="la-button la-button--primary la-reservation__submit-button disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 size={18} className="animate-spin" />
                          Envoi...
                        </span>
                      ) : (
                        "Confirmer la réservation"
                      )}
                    </button>
                  </div>
                </div>
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
                    label="Adresse"
                    value={address}
                  />
                  <SummaryRow
                    iconSrc="/img/pictos/16.png"
                    label="Personnes"
                    value={summaryGuests}
                  />
                  <SummaryRow
                    iconSrc="/img/pictos/17.png"
                    label="Date"
                    value={summaryDate}
                  />
                  <SummaryRow
                    iconSrc="/img/pictos/26.png"
                    label="Horaire"
                    value={summaryTime}
                  />
                </div>

                <div className="la-reservation__advice-box mt-8">
                  <p>
                    Réservation conseillée,
                    <br />
                    notamment les soirs de spectacle.
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex min-h-[420px] items-center justify-center gap-3 text-[rgba(86,57,44,0.74)]">
              Chargement des disponibilités
              <Loader2 size={18} className="animate-spin" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FieldGroup({ label, invalid = false, children }) {
  return (
    <div>
      <p
        className={`la-reservation__step-title ${invalid ? "text-[#a14646]" : ""}`}
      >
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function HorizontalChoiceScroller({
  children,
  invalid = false,
  arrowLabel,
  watchKey = "",
}) {
  const viewportRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateOverflowState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setHasOverflow(viewport.scrollWidth > viewport.clientWidth + 4);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateOverflowState);
    return () => window.cancelAnimationFrame(frame);
  }, [updateOverflowState, watchKey]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const handleResize = () => updateOverflowState();
    const handleScroll = () => updateOverflowState();

    viewport.addEventListener("scroll", handleScroll, { passive: true });

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(viewport);

      if (viewport.firstElementChild) {
        resizeObserver.observe(viewport.firstElementChild);
      }
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [updateOverflowState]);

  function handleArrowClick() {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    const nextStep = Math.max(Math.round(viewport.clientWidth * 0.82), 180);

    if (viewport.scrollLeft >= maxScrollLeft - 8) {
      viewport.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    viewport.scrollBy({ left: nextStep, behavior: "smooth" });
  }

  return (
    <div className="la-reservation__choice-row">
      <div
        ref={viewportRef}
        className={`la-reservation__choice-viewport custom-scrollbar ${invalid ? "is-invalid" : ""}`}
      >
        {children}
      </div>
      {hasOverflow ? (
        <button
          type="button"
          onClick={handleArrowClick}
          className="la-reservation__scroll-arrow"
          aria-label={arrowLabel}
        >
          <ChevronRight size={18} strokeWidth={1.9} />
        </button>
      ) : null}
    </div>
  );
}

function TextField({
  fieldId,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  invalid = false,
}) {
  return (
    <input
      id={fieldId}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      aria-invalid={invalid}
      placeholder={placeholder}
      className={`la-reservation__input ${invalid ? "is-invalid" : ""}`}
    />
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

function getMissingRequiredReservationFields(reservationData) {
  const nextInvalidFields = {};

  if (!reservationData.numberOfGuests) {
    nextInvalidFields.numberOfGuests = true;
  }

  if (!reservationData.reservationTime) {
    nextInvalidFields.reservationTime = true;
  }

  if (!reservationData.customerFirstName.trim()) {
    nextInvalidFields.customerFirstName = true;
  }

  if (!reservationData.customerLastName.trim()) {
    nextInvalidFields.customerLastName = true;
  }

  if (!reservationData.customerEmail.trim()) {
    nextInvalidFields.customerEmail = true;
  }

  if (!reservationData.customerPhone.trim()) {
    nextInvalidFields.customerPhone = true;
  }

  return nextInvalidFields;
}

function getSingleQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeGuestsValue(value) {
  const normalizedValue = String(getSingleQueryValue(value) || "").trim();
  if (!/^\d+$/.test(normalizedValue)) return "";
  return Number(normalizedValue) > 0 ? normalizedValue : "";
}

function normalizeReservationTimeValue(value) {
  const normalizedValue = String(getSingleQueryValue(value) || "").trim();
  const match = normalizedValue.match(/^(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : "";
}

function getAvailabilitySelectionKey({ reservationDate, numberOfGuests }) {
  return `${formatReservationDateForApi(reservationDate)}|${String(numberOfGuests || "").trim()}`;
}

function formatTimeDisplay(time) {
  const [hour, minute] = String(time || "").split(":");
  return `${hour}h${minute}`;
}

function formatGuestsLabel(value) {
  const guests = Number(value || 0);
  if (!guests) {
    return "À sélectionner";
  }

  return `${guests} ${guests > 1 ? "personnes" : "personne"}`;
}

function capitalizeFirstLetter(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getDatePrimaryLabel(value) {
  const parsedDate = parseReservationDateValue(value);
  if (!parsedDate) return "Choisir une date";

  const offset = differenceInCalendarDays(parsedDate, startOfToday());
  if (offset === 0) return "Aujourd’hui";
  if (offset === 1) return "Demain";
  if (offset === 2) return "J+2";

  return capitalizeFirstLetter(format(parsedDate, "EEE d", { locale: fr }));
}

function getDateSecondaryLabel(value) {
  const parsedDate = parseReservationDateValue(value);
  if (!parsedDate) return "";

  return capitalizeFirstLetter(
    format(parsedDate, "EEEE d MMMM", { locale: fr }),
  );
}

function getSummaryDateLabel(value) {
  const parsedDate = parseReservationDateValue(value);
  if (!parsedDate) return "À sélectionner";

  return capitalizeFirstLetter(
    format(parsedDate, "EEE d MMM", { locale: fr }),
  );
}

function getQuickDateChipLabel(value, today) {
  const parsedDate = parseReservationDateValue(value);
  if (!parsedDate) return "Date";

  const offset = differenceInCalendarDays(parsedDate, today);
  if (offset === 0) return "Aujourd’hui";
  if (offset === 1) return "Demain";

  return capitalizeFirstLetter(format(parsedDate, "EEE d", { locale: fr }));
}

function getQuickDateOptions(selectedDate, today) {
  const parsedSelectedDate = parseReservationDateValue(selectedDate) || today;
  const safeSelectedDate =
    differenceInCalendarDays(parsedSelectedDate, today) < 0
      ? today
      : parsedSelectedDate;
  const selectedOffset = differenceInCalendarDays(safeSelectedDate, today);
  const startDate =
    selectedOffset <= 2 ? today : addDays(safeSelectedDate, -2);

  return Array.from({ length: 5 }, (_, index) => addDays(startDate, index));
}
