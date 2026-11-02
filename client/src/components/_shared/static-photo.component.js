import Head from "next/head";

// Widths correspond to the prepared files, without upscaling the originals.
const originalWidths = {
  "/img/hero/1-768.webp": 1122,
  "/img/hero/2-768.webp": 1086,
  "/img/dishes/1-768.webp": 1254,
  "/img/dishes/2-768.webp": 1254,
  "/img/dishes/3-768.webp": 1254,
  "/img/dishes/4-768.webp": 1254,
  "/img/dishes/5-768.webp": 1254,
  "/img/photos/floor-0/1-768.webp": 1448,
  "/img/photos/floor-0/2-768.webp": 1448,
  "/img/photos/floor-0/3-768.webp": 1448,
  "/img/photos/floor-0/4-768.webp": 1254,
  "/img/photos/floor-1/2-768.webp": 1448,
  "/img/photos/floor-1/3-768.webp": 1448,
  "/img/photos/outside/2-768.webp": 1122,
  "/img/photos/outside/5-768.webp": 1448,
};

export default function StaticPhoto({ src, alt, sizes, priority = false, className }) {
  const widths = [480, 768, originalWidths[src]];
  const path = (width) => src.replace(/-768\.webp$/, `-${width}.webp`);
  const srcSet = widths.map((width) => `${path(width)} ${width}w`).join(", ");

  return (
    <>
      {priority && (
        <Head>
          <link rel="preload" as="image" imageSrcSet={srcSet} imageSizes={sizes} fetchPriority="high" />
        </Head>
      )}
      <img
        src={path(widths[widths.length - 1])}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={className}
        style={{ position: "absolute", height: "100%", width: "100%", inset: 0, color: "transparent" }}
      />
    </>
  );
}
