import clsx from "clsx";
import { Loader } from "../../loaders/Loader";

interface Props {
  label: string;
  type?: "button" | "submit";
  onClick?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button = ({
  label,
  type = "button",
  onClick,
  isLoading,
  variant = "primary",
  className,
}: Props) => (
  <button
    type={type}
    onClick={onClick}
    className={clsx(
      "rounded-md px-3 py-2 flex items-center justify-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
      variant === "primary"
        ? "bg-black hover:bg-zinc-800 text-white"
        : "bg-transparent text-black border border-black hover:bg-zinc-100 hover:border-zinc-800",
      isLoading && "pointer-events-none opacity-75",
      className
    )}
  >
    <div
      className={clsx(
        "duration-200 transition-all",
        isLoading ? "w-4 opacity-100 mr-2" : "w-0 opacity-0 mr-0"
      )}
    >
      <Loader size={14} />
    </div>
    <span>{label}</span>
  </button>
);
