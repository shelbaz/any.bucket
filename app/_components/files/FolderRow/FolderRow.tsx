import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

interface Props {
  onClick?: () => void;
  label: string;
  Icon?: React.FC;
}

export const FolderRow = ({ onClick, label, Icon }: Props) => {
  return (
    <li
      className="group first:rounded-t-lg last:rounded-b-lg col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer bg-white hover:bg-zinc-50"
      onClick={onClick}
    >
      <div className="relative px-3 py-2">
        <div>
          <span className="flex items-center">
            <span className="text-2xl h-8 w-8 text-center mr-3">
              {Icon ? <Icon /> : "📁"}
            </span>
            <span className="text-zinc-900 flex text-sm font-medium group-hover:text-black">
              {label || <span className="opacity-50">(untitled folder)</span>}
            </span>
          </span>
        </div>
      </div>
    </li>
  );
};
