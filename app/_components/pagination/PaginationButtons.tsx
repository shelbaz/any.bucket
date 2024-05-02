import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import { Button } from "../buttons/Button";
import clsx from "clsx";

export const PaginationButtons = ({
  pageTotal,
  page,
  setPage,
  withLabels = false,
}: {
  pageTotal: number;
  page: number;
  setPage: (_: string) => void;
  withLabels?: boolean;
}) => {
  const buttonClasses =
    "rounded-none h-full bg-white text-zinc-800 hover:text-zinc-900 hover:!bg-zinc-50";

  const buttonContainerClasses = "overflow-hidden border border-zinc-300";

  return (
    <div className="flex h-10">
      <div
        className={clsx(
          "rounded-l-lg",
          buttonContainerClasses,
          page === 1 && "opacity-60"
        )}
      >
        <Button
          onClick={() => setPage(String(1))}
          className={buttonClasses}
          isDisabled={page === 1}
          Icon={<ChevronDoubleLeftIcon className="h-4 w-4" />}
        />
      </div>
      <div
        className={clsx(
          "border-t border-b !border-r-0 !border-l-0",
          buttonContainerClasses,
          page === 1 && "opacity-60"
        )}
      >
        <Button
          onClick={() => setPage(String(page - 1))}
          isDisabled={page === 1}
          className={clsx(buttonClasses, withLabels && "!px-3 !pl-2")}
          label={withLabels ? "Prev" : undefined}
          Icon={<ChevronLeftIcon className="h-4 w-4" />}
        />
      </div>
      <div
        className={clsx(
          "border-t border-b !border-r-0",
          buttonContainerClasses
        )}
      >
        <Button
          onClick={() => setPage(String(page + 1))}
          isDisabled={page >= pageTotal}
          className={clsx(buttonClasses, withLabels && "!px-3 !pr-2")}
          label={withLabels ? "Next" : undefined}
          Icon={<ChevronRightIcon className="h-4 w-4" />}
        />
      </div>
      <div className={clsx("rounded-r-lg", buttonContainerClasses)}>
        <Button
          onClick={() => setPage(String(pageTotal))}
          isDisabled={page >= pageTotal}
          className={buttonClasses}
          Icon={<ChevronDoubleRightIcon className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};
