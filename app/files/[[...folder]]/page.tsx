"use client";
import { Breadcrumbs } from "@/app/_components/layout/Breadcrumbs";
import { useListObjects } from "../../_helpers/s3/objects";
import { useRouter, useParams } from "next/navigation";
import { FolderCard } from "@/app/_components/files/FolderCard";
import { FileCard } from "@/app/_components/files/FileCard";

const FilePage = () => {
  const router = useRouter();
  const params = useParams();
  const folder =
    typeof params.folder === "object" ? params.folder.join("/") : params.folder;
  const crumbs =
    folder
      ?.split("/")
      .map((folder) => ({ title: decodeURI(folder), segment: folder })) ?? [];

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
        <ul className="grid grid-cols-12 gap-4">
          {folders?.map((folder) => (
            <FolderCard
              key={folder.prefix}
              label={folder.label}
              onClick={() => router.push(`/files/${folder.prefix}`)}
            />
          ))}
          {objects?.map((object) => (
            <FileCard
              key={object.Key}
              objectKey={object.Key ?? ""}
              label={object.Key?.split("/").pop() ?? "File"}
              bytes={object.Size}
              extension={object.Key?.split(".").pop()?.toLowerCase() ?? "file"}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilePage;
