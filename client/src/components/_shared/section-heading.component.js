export default function SectionHeadingComponent({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}) {
  const alignmentClass =
    align === "left" ? "items-start text-left" : "items-center text-center";
  const titleColorClass = light
    ? "text-[var(--site-cream)]"
    : "text-[var(--site-ink)]";
  const descriptionColorClass = light
    ? "text-[var(--site-cream-soft)]"
    : "text-[var(--site-ink-soft)]";

  return (
    <div
      className={`mx-auto flex max-w-[760px] flex-col ${alignmentClass} ${className}`.trim()}
    >
      {eyebrow ? (
        <p className="nav-font text-[11px] uppercase tracking-[0.28em] text-[var(--site-orange-deep)]">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`yeseva-one-regular mt-5 text-balance text-[42px] leading-[0.92] ${titleColorClass} tablet:text-[58px] ${titleClassName}`.trim()}
      >
        {title}
      </h2>

      <div className="mt-5">
        <span
          className={`block h-[3px] w-20 rounded-full ${
            light ? "bg-[var(--site-cream)]" : "bg-[var(--site-orange)]"
          }`}
        />
      </div>

      {description ? (
        <p
          className={`mt-6 max-w-[680px] text-[17px] leading-[1.9] ${descriptionColorClass} ${descriptionClassName}`.trim()}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
