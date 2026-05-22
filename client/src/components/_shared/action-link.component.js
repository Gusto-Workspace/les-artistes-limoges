import Link from "next/link";

export default function ActionLinkComponent({
  href,
  children,
  secondary = false,
  className = "",
  ...props
}) {
  const classes = [
    "la-button",
    secondary ? "la-button--outline" : "la-button--primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
