"use client";
import { Breadcrumbs } from "@/app/_components/layout/Breadcrumbs";
import { useListObjects } from "../../_helpers/s3/objects";
import { useRouter, useParams } from "next/navigation";
import { FolderCard } from "@/app/_components/files/FolderCard";

const FilePage = () => {
  const router = useRouter();
  const params = useParams();
  const folder =
    typeof params.folder === "object" ? params.folder.join("/") : params.folder;
  const crumbs =
    folder
      ?.split("/")
      .map((folder) => ({ title: decodeURI(folder), segment: folder })) ?? [];
  console.log("CRUMBS:", crumbs);

  const { objects, folders } = useListObjects({ folder });

  return (
    <div>
      <div className="flex items-center py-2 px-3 border-t border-b border-gray-200">
        <Breadcrumbs
          basePath="/files"
          crumbs={[{ segment: "/", title: "Files" }, ...crumbs]}
        />
      </div>
      <div className="p-6">
        {/* FOLDERS */}
        <ul className="grid grid-cols-12 gap-4">
          {folders?.map((folder) => (
            <FolderCard
              key={folder.prefix}
              label={folder.label}
              onClick={() => router.push(`/files/${folder.prefix}`)}
            />
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
    </div>
  );
};

export default FilePage;
