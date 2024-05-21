import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { MoreButton } from "../../buttons/MoreButton";
import { MoreButtonOption } from "../../buttons/MoreButton/MoreButton";
import { confirm } from "../../modals/ConfirmModal/ConfirmModal";
import { useDeleteFolder } from "@/app/_hooks/files";

interface Props {
  onClick?: () => void;
  label: string;
  Icon?: React.FC;
  prefix?: string;
}

export const FolderRow = ({ onClick, label, prefix, Icon }: Props) => {
  const { deleteFolder } = useDeleteFolder({ folderPrefix: prefix });
  const options: MoreButtonOption[] = prefix
    ? [
        {
          label: "Delete",
          action: async () => {
            const shouldDelete = await confirm(
              "Are you sure you want to delete this folder and all the files in it?",
              {
                confirmText: "Delete folder and files",
                cancelText: "Cancel",
                title: "Delete folder and all files?",
              }
            );

            if (shouldDelete) {
              deleteFolder();
            }
          },
        },
      ]
    : [];
  return (
    <li
      className="group first:rounded-t-lg last:rounded-b-lg col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer bg-white hover:bg-zinc-50"
      onClick={onClick}
    >
      <div className="relative px-3 py-2">
        <div className="flex justify-between items-center">
          <span className="flex items-center">
            <span className="text-2xl h-8 w-8 text-center mr-3">
              {Icon ? <Icon /> : "📁"}
            </span>
            <span className="text-zinc-900 flex text-sm font-medium group-hover:text-black">
              {label || <span className="opacity-50">(untitled folder)</span>}
            </span>
          </span>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MoreButton options={options} position="left" />
          </div>
        </div>
      </div>
    </li>
  );
};
