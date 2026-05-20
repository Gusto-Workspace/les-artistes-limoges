import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { GlobalContext } from "@/contexts/global.context";

export default function FormContactCompnent() {
  const { restaurantContext } = useContext(GlobalContext);
  const restaurantData = restaurantContext?.restaurantData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact-form-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.lastName || ""} ${data.firstName || ""}`.trim(),
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          restaurantName: restaurantData?.name || "",
          restaurantEmail: restaurantData?.email || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setSubmitError(
        "Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="la-contact__success">
        <div className="la-contact__success-icon">
          <Check size={28} strokeWidth={1.7} />
        </div>
        <h3 className="la-contact__panel-title mt-6">Message envoyé</h3>
        <p className="mt-4 text-[18px] leading-[1.52] text-[rgba(86,57,44,0.86)]">
          Nous reviendrons vers vous dès que possible.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="la-button la-button--primary mt-8 min-w-[260px]"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitError ? (
        <div className="la-contact__form-alert">{submitError}</div>
      ) : null}

      <div className="la-contact__form-grid">
        <Field error={errors.lastName?.message}>
          <input
            type="text"
            placeholder="Nom"
            className="la-contact__input"
            {...register("lastName", {
              required: "Veuillez renseigner votre nom.",
            })}
          />
        </Field>

        <Field error={errors.firstName?.message}>
          <input
            type="text"
            placeholder="Prénom"
            className="la-contact__input"
            {...register("firstName", {
              required: "Veuillez renseigner votre prénom.",
            })}
          />
        </Field>
      </div>

      <div className="la-contact__form-grid">
        <Field error={errors.email?.message}>
          <input
            type="email"
            placeholder="E-mail"
            className="la-contact__input"
            {...register("email", {
              required: "Veuillez renseigner votre email.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Veuillez saisir un email valide.",
              },
            })}
          />
        </Field>

        <Field error={errors.phone?.message}>
          <input
            type="text"
            placeholder="Téléphone"
            className="la-contact__input"
            {...register("phone")}
          />
        </Field>
      </div>

      <Field error={errors.subject?.message}>
        <input
          type="text"
          placeholder="Sujet"
          className="la-contact__input"
          {...register("subject", {
            required: "Veuillez renseigner un sujet.",
          })}
        />
      </Field>

      <Field error={errors.message?.message}>
        <textarea
          rows={7}
          placeholder="Message"
          className="la-contact__textarea"
          {...register("message", {
            required: "Veuillez écrire votre message.",
          })}
        />
      </Field>

      <label className="la-contact__checkbox">
        <input
          type="checkbox"
          className="la-contact__checkbox-input"
          {...register("consent", {
            required: "Veuillez accepter d’être recontacté.",
          })}
        />
        <span className="la-contact__checkbox-box" aria-hidden="true" />
        <span>J’accepte d’être recontacté au sujet de ma demande.</span>
      </label>
      {errors.consent?.message ? (
        <p className="la-contact__field-error">{errors.consent.message}</p>
      ) : null}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="la-button la-button--primary la-contact__submit-button disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Envoi...
            </>
          ) : (
            "Envoyer le message"
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ error, children }) {
  return (
    <div>
      {children}
      {error ? <p className="la-contact__field-error">{error}</p> : null}
    </div>
  );
}
