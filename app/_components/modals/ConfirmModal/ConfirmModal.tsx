import { confirmable, createConfirmation } from "react-confirm";
import { Modal } from "../Modal";

interface OptionsProps {
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

interface Props {
  show?: boolean;
  proceed?: (should: boolean) => void;
  confirmation: string;
  options: OptionsProps;
}

export const ConfirmModal = confirmable(
  ({ show, proceed, confirmation, options }: Props) => {
    return (
      <Modal
        isOpen={show ?? false}
        handleClose={() => proceed?.(false)}
        title={options.title ?? "Are you sure?"}
        body={
          <div className="py-2">
            <p className="text-zinc-800 text-md">{confirmation}</p>
          </div>
        }
        confirmButton={{
          label: options.confirmText ?? "Confirm",
          onClick: () => {
            proceed?.(true);
          },
        }}
        cancelButton={{
          label: options.cancelText ?? "Cancel",
          onClick: () => proceed?.(false),
        }}
      />
    );
  }
);

const confirmComponent = createConfirmation(ConfirmModal);

export const confirm = (confirmation: string, options: OptionsProps = {}) => {
  return confirmComponent({ confirmation, options });
};
