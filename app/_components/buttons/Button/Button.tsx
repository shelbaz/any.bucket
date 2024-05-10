"use client";
import clsx from "clsx";
import { Loader } from "../../loaders/Loader";
import { useFormStatus } from "react-dom";
import { title } from "process";

interface Props {
  label?: string;
  Icon?: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  title?: string;
}

export const Button = ({
  label,
  Icon,
  type = "button",
  onClick,
  isLoading,
  isDisabled,
  variant = "primary",
  className,
  title,
}: Props) => {
  const formStatus = useFormStatus();
  const loading = isLoading || formStatus.pending;
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "rounded px-3 py-2 flex items-center justify-center text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variant === "primary"
          ? "bg-black hover:bg-zinc-800 text-white"
          : "bg-transparent text-black border border-black hover:bg-zinc-100 hover:border-zinc-800",
        loading && "pointer-events-none opacity-75",
        isDisabled && "pointer-events-none opacity-50",
        className
      )}
      title={title}
      disabled={isDisabled || loading}
    >
      <div
        className={clsx(
          "duration-200 transition-all",
          isLoading || Icon || formStatus.pending
            ? "w-4 opacity-100"
            : "w-0 opacity-0 mr-0",
          label && (!!Icon || loading) && "mr-2"
        )}
      >
        {!loading ? Icon : <Loader size={14} />}
      </div>
      {label && <span>{label}</span>}
    </button>
  );
};
