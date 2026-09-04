import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { addDays, differenceInCalendarDays, format, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Loader2, X } from "lucide-react";
import { HorizontalChoiceScroller } from "@/components/reservations/form.reservations.component";
import {
  formatReservationDateForApi,
  getReservationTimeOptions,
  isReservationDateClosed,
  parseReservationDateValue,
} from "@/utils/reservations";

const peopleOptions = Array.from({ length: 12 }, (_, index) =>
  String(index + 1),
);

export default function EditReservationAvailability({
  apiBaseUrl,
  manageToken,
  restaurant,
  reservation,
  editData,
  setEditData,
}) {
  const today = useMemo(() => startOfToday(), []);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [reservationsList, setReservationsList] = useState([]);
  const [slotCoverUsage, setSlotCoverUsage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    async function loadAvailability() {
      if (!apiBaseUrl || !manageToken || !restaurant?._id || !reservation?._id) {
        if (isCurrent) {
          setReservationsList([]);
          setSlotCoverUsage([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setAvailabilityError("");

        const query = new URLSearchParams({
          excludeReservationId: String(reservation._id),
          token: manageToken,
          from: formatReservationDateForApi(editData.reservationDate),
          to: formatReservationDateForApi(editData.reservationDate),
        });
        const response = await fetch(
          `${apiBaseUrl}/public/restaurants/${restaurant._id}/reservations?${query.toString()}`,
        );
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data?.message || "Impossible de charger les créneaux disponibles.",
          );
        }

        if (isCurrent) {
          setReservationsList(
            Array.isArray(data?.reservations) ? data.reservations : [],
          );
          setSlotCoverUsage(
            Array.isArray(data?.slotCoverUsage) ? data.slotCoverUsage : [],
          );
        }
      } catch (error) {
        if (isCurrent) {
          setReservationsList([]);
          setSlotCoverUsage([]);
          setAvailabilityError(
            error?.message || "Impossible de charger les créneaux disponibles.",
          );
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadAvailability();

    return () => {
      isCurrent = false;
    };
  }, [apiBaseUrl, editData.reservationDate, manageToken, restaurant?._id, reservation?._id]);

  const timeOptions = useMemo(
    () =>
      getReservationTimeOptions({
        reservationDate: editData.reservationDate,
        numberOfGuests: editData.numberOfGuests,
        restaurant,
        reservationsList,
        slotCoverUsage,
        excludeReservationId: reservation?._id,
      }).filter((option) => option.type === "available"),
    [
      editData.reservationDate,
      editData.numberOfGuests,
      restaurant,
      reservationsList,
      slotCoverUsage,
      reservation?._id,
    ],
  );
  const guestOptions = useMemo(() => {
    const currentGuests = String(editData.numberOfGuests || "").trim();
    if (!currentGuests || peopleOptions.includes(currentGuests)) {
      return peopleOptions;
    }

    return [...peopleOptions, currentGuests].sort(
      (a, b) => Number(a) - Number(b),
    );
  }, [editData.numberOfGuests]);

  const selectedDate =
    parseReservationDateValue(editData.reservationDate) || new Date();
  const quickDateOptions = useMemo(
    () => getQuickDateOptions(selectedDate, today),
    [selectedDate, today],
  );
  const selectedDateKey = formatReservationDateForApi(selectedDate);
  const isCustomDateSelection = !quickDateOptions.some(
    (date) => formatReservationDateForApi(date) === selectedDateKey,
  );

  function handleDateChange(value) {
    const nextDate = Array.isArray(value) ? value[0] : value;
    if (!(nextDate instanceof Date) || Number.isNaN(nextDate.getTime())) return;

    setEditData((current) => ({
      ...current,
      reservationDate: formatReservationDateForApi(nextDate),
      reservationTime: "",
    }));
  }

  function handleGuestsChange(event) {
    setEditData((current) => ({
      ...current,
      numberOfGuests: event.target.value,
      reservationTime: "",
    }));
  }

  function handleGuestsSelect(value) {
    setEditData((current) => ({
      ...current,
      numberOfGuests: value,
      reservationTime: "",
    }));
  }

  function handleTimeSelect(value) {
    setEditData((current) => ({ ...current, reservationTime: value }));
  }

  return (
    <div className="mt-5 text-[rgba(86,57,44,0.92)]">
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
                  handleDateChange(value);
                  setShowCalendarModal(false);
                }}
                value={selectedDate}
                minDate={startOfToday()}
                tileDisabled={({ date, view }) =>
                  view === "month" &&
                  isReservationDateClosed({ reservationDate: date, restaurant })
                }
                locale="fr-FR"
                className="reservation-calendar reservation-calendar--la"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="space-y-6">
        <div>
          <p className="la-reservation__step-title">A. Nombre de personnes</p>
          <HorizontalChoiceScroller
            arrowLabel="Voir plus de personnes"
            watchKey={guestOptions.join("|")}
          >
            <div className="la-reservation__choice-rail">
              {guestOptions.map((value) => {
                const isActive = editData.numberOfGuests === value;
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
        </div>

        <div>
          <p className="la-reservation__step-title">B. Date</p>
          <HorizontalChoiceScroller
            arrowLabel="Voir plus de dates"
            watchKey={`${quickDateOptions.map(formatReservationDateForApi).join("|")}|${selectedDateKey}|${isCustomDateSelection}`}
          >
            <div className="la-reservation__date-rail">
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
          </HorizontalChoiceScroller>
          {isCustomDateSelection ? (
            <p className="la-reservation__helper mt-2">
              Date choisie : {getDateSecondaryLabel(selectedDate)}
            </p>
          ) : null}
        </div>

        <div>
          <p className="la-reservation__step-title">C. Horaire</p>
          <HorizontalChoiceScroller
            arrowLabel="Voir plus d'horaires"
            showArrow={!isLoading && timeOptions.length > 0}
            watchKey={`${timeOptions.map((option) => option.time).join("|")}|${isLoading}`}
          >
            {isLoading ? (
              <div className="la-reservation__choice-loading">
                <Loader2 size={17} className="animate-spin" />
                Chargement des créneaux...
              </div>
            ) : (
              <div className="la-reservation__choice-rail">
                {timeOptions.map((option) => {
                  const isActive = editData.reservationTime === option.time;
                  return (
                    <button
                      key={option.time}
                      type="button"
                      onClick={() => handleTimeSelect(option.time)}
                      aria-pressed={isActive}
                      className={`la-reservation__choice-chip la-reservation__choice-chip--time ${isActive ? "is-active" : ""}`}
                    >
                      {formatTimeDisplay(option.time)}
                    </button>
                  );
                })}
              </div>
            )}
          </HorizontalChoiceScroller>
          {!isLoading && !availabilityError && !timeOptions.length ? (
            <p className="la-reservation__helper mt-2">
              Aucun créneau disponible pour cette date.
            </p>
          ) : null}
        </div>
      </div>

      {availabilityError ? (
        <p className="mt-5 text-[14px] leading-[1.7] text-red-700">
          {availabilityError}
        </p>
      ) : null}

    </div>
  );
}

function formatTimeDisplay(value) {
  const [hour, minute] = String(value || "").slice(0, 5).split(":");
  return `${hour}h${minute}`;
}

function getQuickDateChipLabel(value, today) {
  const parsedDate = parseReservationDateValue(value);
  if (!parsedDate) return "Date";

  const offset = differenceInCalendarDays(parsedDate, today);
  if (offset === 0) return "Aujourd’hui";
  if (offset === 1) return "Demain";

  return capitalizeFirstLetter(format(parsedDate, "EEE d", { locale: fr }));
}

function getDateSecondaryLabel(value) {
  const parsedDate = parseReservationDateValue(value);
  if (!parsedDate) return "";

  return capitalizeFirstLetter(
    format(parsedDate, "EEEE d MMMM", { locale: fr }),
  );
}

function getQuickDateOptions(selectedDate, today) {
  const parsedSelectedDate = parseReservationDateValue(selectedDate) || today;
  const safeSelectedDate =
    differenceInCalendarDays(parsedSelectedDate, today) < 0
      ? today
      : parsedSelectedDate;
  const selectedOffset = differenceInCalendarDays(safeSelectedDate, today);
  const startDate = selectedOffset <= 2 ? today : addDays(safeSelectedDate, -2);

  return Array.from({ length: 5 }, (_, index) => addDays(startDate, index));
}

function capitalizeFirstLetter(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}
