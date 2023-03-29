import { Link } from "@remix-run/react";
import { tw } from "~/utils";
import type { Icon } from "./icons-map";
import iconsMap from "./icons-map";

import type { ButtonVariant, ButtonWidth } from "../layout/header/types";

export function Button({
  as = "button",
  className = "",
  variant = "primary",
  width = "auto",
  size = "md",
  icon,
  disabled = undefined,
  children,
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  variant?: ButtonVariant;
  width?: ButtonWidth;
  size?: "sm" | "md";
  icon?: Icon;
  disabled?: boolean;
  [key: string]: any;
}) {
  const Component = props?.to ? Link : as;

  const baseButtonClasses = `inline-flex items-center justify-center rounded-lg font-semibold text-center  gap-2  max-w-xl border text-sm box-shadow-xs`;

  const variants = {
    primary: tw(
      `border-primary-400 bg-primary-500 text-white focus:ring-2 hover:bg-primary-400`,
      disabled ? "border-primary-300 bg-primary-300" : ""
    ),
    secondary: tw(
      `border-gray-300 bg-white text-gray-700 hover:bg-gray-50`,
      disabled ? "border-gray-200 text-gray-300" : ""
    ),
    tertiary: tw(
      `border-b border-primary/10 pb-1 leading-none`,
      disabled ? "text-gray-300" : ""
    ),
    link: tw(
      `border-none p-0 text-text-sm font-semibold text-primary-700 hover:text-primary-800`
    ),
  };

  const sizes = {
    sm: tw("px-[14px] py-2"),
    md: tw("px-4 py-[10px]"),
  };

  const widths = {
    auto: "w-auto",
    full: "w-full",
  };

  const disabledStyles = disabled ? "pointer-events-none " : undefined;

  const finalStyles = tw(
    baseButtonClasses,
    variants[variant],
    widths[width],
    sizes[size],
    disabledStyles,
    className
  );
  return (
    <Component className={finalStyles} {...props}>
      {icon && iconsMap[icon]} <span>{children}</span>
    </Component>
  );
}
