import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import { Button } from "../../buttons/Button";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  title?: string | ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "fullscreen";
  titleStyle?: string;
  children?: ReactNode;
  body?: ReactNode;
  confirmButton?: {
    label?: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
  cancelButton?: {
    label?: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
  testId?: string;
  noPadding?: boolean;
  showCloseButton?: boolean;
  modalClass?: string;
  explicitClose?: boolean;
  zIndex?: string;
}

export const Modal = ({
  isOpen,
  handleClose,
  title,
  size = "sm",
  titleStyle = "",
  testId,
  children,
  body,
  confirmButton,
  cancelButton,
  modalClass,
  showCloseButton = true,
  explicitClose = false,
  zIndex = "z-50",
}: Props) => {
  const modalWidth = {
    xs: "sm:max-w-sm",
    sm: "sm:max-w-md",
    md: "sm:max-w-3xl",
    lg: "sm:max-w-5xl",
    xl: "sm:max-w-7xl",
    fullscreen: "w-screen h-screen",
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className={`fixed inset-0 overflow-y-auto ${zIndex}`}
        open={isOpen}
        onClose={() => {
          if (explicitClose) return;
          handleClose();
        }}
        data-testid={testId}
      >
        <div className="flex min-h-screen items-center justify-center text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={clsx(
                "inline-block rounded-3xl bg-white align-bottom shadow-xl transform text-left transition-all sm:my-8 sm:align-middle w-11/12",
                modalWidth[size],
                size === "fullscreen" && "overflow-scroll",
                modalClass
              )}
            >
              {showCloseButton && (
                <button
                  data-testid="close-modal"
                  className="outline-none absolute text-zinc-600 top-0 right-0 z-10 px-6 py-5 ring-0 hover:opacity-70"
                  onClick={handleClose}
                  tabIndex={0}
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5 text-zinc-800" />
                </button>
              )}
              <div className="text-left py-3.5 px-6 border-b border-zinc-200">
                {title && (
                  <Dialog.Title
                    as="h3"
                    className={clsx(
                      "text-lg font-semibold text-zinc-900",
                      titleStyle
                    )}
                  >
                    {title}
                  </Dialog.Title>
                )}
              </div>
              <div className="p-6">{body || children}</div>
              {(confirmButton || cancelButton) && (
                <div className="py-3 px-6 flex space-x-2 border-t border-zinc-200">
                  {confirmButton && (
                    <Button
                      label={confirmButton.label ?? "Confirm"}
                      onClick={confirmButton.onClick}
                      isLoading={confirmButton.loading}
                      variant="primary"
                    />
                  )}
                  {cancelButton && (
                    <Button
                      label={cancelButton.label ?? "Cancel"}
                      onClick={cancelButton.onClick}
                      isLoading={cancelButton.loading}
                      variant="secondary"
                    />
                  )}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
