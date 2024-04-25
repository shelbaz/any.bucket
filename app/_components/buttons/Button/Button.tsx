import clsx from "clsx";

interface Props {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button = ({
  label,
  onClick,
  isLoading,
  variant = "primary",
  className,
}: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
      variant === "primary"
        ? "bg-black hover:bg-zinc-800 text-white"
        : "bg-transparent text-black border border-black hover:bg-zinc-100 hover:border-zinc-800",
      isLoading && "pointer-events-none opacity-50",
      className
    )}
  >
    {label}
  </button>
);
