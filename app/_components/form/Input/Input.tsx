import clsx from "clsx";

interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  type?: string;
  name?: string;
  readOnly?: boolean;
}

export const Input = ({
  value,
  onChange,
  id,
  placeholder,
  autoFocus,
  className,
  type,
  name,
  readOnly,
}: Props) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    autoFocus={autoFocus}
    className={clsx(
      "py-2 px-3 border border-zinc-900 text-black rounded w-full focus:outline-none focus:shadow sm:text-sm font-medium",
      readOnly && "text-opacity-60 bg-zinc-50",
      className
    )}
    type={type ?? "text"}
    name={name}
    readOnly={readOnly}
  />
);
