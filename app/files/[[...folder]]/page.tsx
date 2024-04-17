"use client";
import { useListObjects } from "../../_helpers/s3/objects";
import { useRouter, useParams } from "next/navigation";

const FilePage = () => {
  const router = useRouter();
  const params = useParams();
  const folder =
    typeof params.folder === "object" ? params.folder.join("/") : params.folder;
  const { objects, folders } = useListObjects({ folder });

  return (
    <div>
      {/* FOLDERS */}
      <ul className="grid grid-cols-12 gap-4">
        {folders?.map((folder) => (
          <li
            className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 2xl:col-span-2 cursor-pointer"
            key={folder.prefix}
            onClick={() => router.push(`/files/${folder.prefix}`)}
          >
            <div className="rounded-lg duration-100 shadow-none hover:shadow-md h-full border border-gray-200">
              <div className="flex justify-center items-center aspect-square">
                <span className="text-8xl">📁</span>
              </div>
              <div className="flex items-center p-2 border-t border-gray-200">
                {folder.label}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* OBJECTS */}
      <ul>
        {objects?.map((object) => (
          <li key={object.Key}>
            {object.Key} - {(object.Size ?? 1) / 1000} kb
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilePage;