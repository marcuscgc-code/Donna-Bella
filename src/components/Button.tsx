import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type BaseProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
};

const styles = {
  primary: "bg-terracotta text-cream hover:bg-terracotta-dark",
  secondary: "bg-transparent border border-graphite/30 text-graphite hover:border-terracotta hover:text-terracotta",
};

const base = "inline-flex items-center justify-center px-8 py-3 text-sm tracking-wide transition-colors rounded-sm";

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
