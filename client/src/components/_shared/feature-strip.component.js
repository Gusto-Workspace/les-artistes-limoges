import Image from "next/image";

export default function FeatureStripComponent({
  items,
  sectionClassName = "la-shell py-10 tablet:py-12 desktop:py-14",
}) {
  return (
    <section className={sectionClassName}>
      <div className="grid border-y border-[rgba(197,155,85,0.2)] min-[900px]:grid-cols-4">
        {items.map((item, index) => (
          <article
            key={item.title}
            className={`flex flex-col items-center px-6 py-8 text-center ${
              index > 0
                ? "border-t border-[rgba(197,155,85,0.18)] min-[900px]:border-l min-[900px]:border-t-0"
                : ""
            }`}
          >
            {item.iconSrc ? (
              <Image
                src={item.iconSrc}
                alt={item.iconAlt}
                width={80}
                height={80}
                className="mb-5 h-auto w-[62px]"
              />
            ) : null}

            <h2 className="la-home__feature-title">{item.title}</h2>
            <p className="mt-3 max-w-[210px] text-[16px] leading-[1.38] text-[rgba(86,57,44,0.86)] text-balance">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
