import Link from "next/link";
import { MoreButton } from "../../buttons/MoreButton";
import { MoreButtonOption } from "../../buttons/MoreButton/MoreButton";
import clsx from "clsx";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export const OptionCard = ({
  title,
  path,
  onClick,
  icon,
  description,
  options,
  className,
  selected,
}: {
  title: string;
  path?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  description: string;
  options?: MoreButtonOption[];
  className?: string;
  selected?: boolean;
}) => (
  <Link
    key={title}
    href={path ?? "#"}
    className="w-full h-full"
    onClick={onClick}
  >
    <div
      className={clsx(
        "group flex bg-white p-6 border border-zinc-200 rounded-xl duration-100 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer items-start justify-between",
        className
      )}
    >
      <div className="flex items-start">
        <div className="mr-6 text-7xl">{icon}</div>
        <div className="flex flex-col">
          <h3 className="flex items-center text-2xl font-semibold text-zinc-800">
            {title}{" "}
            {selected && (
              <CheckCircleIcon className="text-green-500 h-5 w-5 ml-2" />
            )}{" "}
          </h3>
          <p className="mt-1 text-xl text-zinc-700">{description}</p>
        </div>
      </div>
      {options?.length ? (
        <div className="relative -top-2 -right-1 opacity-0 group-hover:opacity-100">
          <MoreButton options={options} />
        </div>
      ) : null}
    </div>
  </Link>
);
