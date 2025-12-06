import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Variant = "solid" | "ghost";

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export const PrimaryButton = ({
  children,
  to,
  onClick,
  variant = "solid",
  type = "button",
  disabled,
  className,
}: PropsWithChildren<ButtonProps>) => {
  const baseClass = variant === "solid"
    ? "btn btn--solid"
    : variant === "ghost"
      ? "btn btn--ghost"
      : "btn";
  
  const combinedClass = className ? `${baseClass} ${className}` : baseClass;

  if (to) {
    return (
      <Link to={to} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
