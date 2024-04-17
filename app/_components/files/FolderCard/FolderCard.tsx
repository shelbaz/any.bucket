interface Props {
  onClick?: () => void;
  label: string;
}

export const FolderCard = ({ onClick, label }: Props) => {
  return (
    <li
      className="group col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="rounded-lg duration-100 shadow-none hover:shadow-md h-full border border-gray-200">
        <div className="flex justify-center items-center aspect-square">
          <span className="text-7xl">📁</span>
        </div>
        <div className="flex items-center py-2 px-3 border-t border-gray-200 text-black">
          <span className="text-sm font-medium group-hover:opacity-75">
            {label}
          </span>
        </div>
      </div>
    </li>
  );
};
