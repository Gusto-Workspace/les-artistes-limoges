import Link from "next/link";

export default function HomeActionLink({
  href,
  children,
  secondary = false,
  className = "",
}) {
  const classes = [
    "la-button",
    secondary ? "la-button--outline" : "la-button--primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
