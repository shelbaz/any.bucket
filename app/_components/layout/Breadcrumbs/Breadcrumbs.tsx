import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

interface Props {
  crumbs?: Array<{ title: string; segment?: string }>;
  basePath?: string;
}

const ChevronRight = () => (
  <ChevronRightIcon className="h-2.5 w-auto text-grey-300 mx-2.5" />
);

export const Breadcrumbs = ({ crumbs, basePath }: Props) => {
  const pathname = usePathname();
  const pathSegments =
    crumbs ??
    pathname
      .split("/")
      .map((segment) => ({ title: segment.replace(/-/g, " "), segment: "" }));

  return (
    <div className="flex items-center">
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        if (segment.segment === undefined) {
          return (
            <div key={segment.title} className="flex items-center">
              <span className="text-gray-700 text-sm font-medium tracking-tight">
                {segment.title}
              </span>
              {isLast && <ChevronRight />}
            </div>
          );
        }

        return (
          <div
            key={segment.title}
            className={clsx(
              "flex items-center justify-center",
              isLast && "pointer-events-none"
            )}
          >
            <Link
              legacyBehavior
              href={{
                pathname: `${basePath}/${pathSegments
                  .slice(0, index + 1)
                  .map(({ segment }) => segment)
                  .join("/")}`,
              }}
            >
              <a>
                <span
                  className={clsx(
                    "text-sm font-semibold tracking-normal",
                    isLast
                      ? "text-gray-600"
                      : "text-gray-900 hover:text-gray-800"
                  )}
                >
                  {segment.title}
                </span>
              </a>
            </Link>
            {!isLast && <ChevronRightIcon className="h-5 text-gray-400" />}
          </div>
        );
      })}
    </div>
  );
};
