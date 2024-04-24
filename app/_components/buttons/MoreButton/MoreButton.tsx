import { Menu, Transition } from "@headlessui/react";
import React, {
  FunctionComponent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import Tippy from "@tippyjs/react";
import { clsx } from "clsx";
import { createPortal } from "react-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

export type IconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface MoreButtonOption {
  component?: FunctionComponent<{ label: string }>;
  itemComponent?: ReactElement;
  action?: (e: MouseEvent) => void;
  label: string;
  Icon?: IconType;
  disabled?: boolean;
  hide?: boolean;
  footer?: boolean;
  className?: string;
  dataTestId?: string;
}

export const MoreButtonMenuItem = ({
  option,
  setShowChildren,
}: {
  option: MoreButtonOption;
  setShowChildren?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Menu.Item
      key={option.label}
      disabled={!!option.disabled}
      data-testid={option.dataTestId}
    >
      {({ active }) => (
        <div
          className={clsx(
            option.className,
            active ? "bg-grey-100 text-grey-900" : "text-grey-900",
            "flex flex-1 cursor-pointer items-center px-3 py-2 text-xs font-medium",
            option.footer && "border-t border-purple-100 bg-grey-100"
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowChildren?.(true);
            setTimeout(() => setShowChildren?.(false), 800);
            option.action?.(e);
          }}
        >
          {option.Icon && (
            <div>
              <option.Icon className="mr-2 h-3.5 w-3.5 text-sm text-zinc-900" />
            </div>
          )}
          {option.component ? (
            <option.component label={option.label} />
          ) : (
            <span className="whitespace-nowrap">{option.label}</span>
          )}
          {option.itemComponent && option.itemComponent}
        </div>
      )}
    </Menu.Item>
  );
};

interface MoreButtonProps {
  options: MoreButtonOption[];
  className?: string;
  iconClassName?: string;
  Icon?: IconType;
  position?: "top" | "bottom";
  children?: ReactElement;
  buttonComponent?: ReactElement;
  menuWidth?: "wide" | "narrow";
  isDisabled?: boolean;
  tooltip?: string;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
  portal?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  dataTestId?: string;
}

export const MoreButtonBase = ({
  options,
  Icon = EllipsisHorizontalIcon,
  className = "",
  iconClassName = "h-5 w-5",
  position = "top",
  children,
  buttonComponent,
  menuWidth = "narrow",
  isDisabled = false,
  portal = false,
  onOpen = () => undefined,
  onClose = () => undefined,
  dataTestId = "more-button",
}: MoreButtonProps) => {
  const positionClassName =
    position === "top" ? "right-2 bottom-2" : "right-2 top-5";
  const [showChildren, setShowChildren] = useState(false);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const renderMethod = portal ? createPortal : (node: ReactNode) => node;

  const handleButtonClick = (e: MouseEvent<HTMLDivElement>) => {
    if (options.length === 0) return;
    if (portal) {
      setXPos(e.clientX);
      setYPos(e.clientY);
    }
  };

  return (
    <Menu
      as="div"
      className={clsx(
        "relative flex",
        options.length === 0 && "pointer-events-none"
      )}
      aria-disabled={isDisabled}
    >
      {({ open }) => {
        open ? onOpen() : onClose();

        return (
          <>
            {!buttonComponent ? (
              <div onMouseDown={handleButtonClick}>
                <Menu.Button
                  className={clsx(
                    "flex cursor-pointer items-center justify-center p-2 hover:bg-zinc-100 text-zinc-500 hover:text-black rounded-md",
                    className,
                    isDisabled &&
                      "pointer-events-none bg-grey-200 border-gray-300 text-gray-400"
                  )}
                >
                  <span className="sr-only" data-testid={dataTestId}>
                    Open options
                  </span>
                  <Icon className={iconClassName} />
                </Menu.Button>
              </div>
            ) : (
              <div onMouseDown={handleButtonClick}>
                <Menu.Button>{buttonComponent}</Menu.Button>
              </div>
            )}

            {renderMethod(
              <Transition
                show={open}
                as="div"
                enter="transition ease-out duration-100 delay-0"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in delay-0 duration-300"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className={clsx(
                    "focus:outline-none z-50 overflow-hidden rounded-md border border-purple-100 bg-white shadow-overlay mt-2 origin-top-right",
                    portal ? "fixed" : `absolute ${positionClassName}`
                  )}
                  style={{
                    top: portal ? yPos - 12 : undefined,
                    left: portal ? xPos : undefined,
                    transform: portal ? "translate(-100%, -100%)" : undefined,
                    maxWidth: menuWidth === "wide" ? "13rem" : "10rem",
                  }}
                >
                  <div>
                    {options &&
                      options.map((option) => {
                        if (option.hide || !option.action) return null;

                        return (
                          <MoreButtonMenuItem
                            key={option.label}
                            option={option}
                            setShowChildren={setShowChildren}
                          />
                        );
                      })}
                  </div>
                </Menu.Items>
                {showChildren && children ? children : <></>}
              </Transition>,
              document.body
            )}
          </>
        );
      }}
    </Menu>
  );
};

export const MoreButton = (props: MoreButtonProps) => {
  const { tooltip, tooltipPlacement = "bottom" } = props;
  if (tooltip) {
    return (
      <Tippy
        content={<div className="rounded p-2 text-xs">{tooltip}</div>}
        placement={tooltipPlacement}
        delay={[200, 0]}
        arrow={true}
        theme="dark"
      >
        <span>
          <MoreButtonBase {...props} />
        </span>
      </Tippy>
    );
  }

  return <MoreButtonBase {...props} />;
};
