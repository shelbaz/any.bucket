import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

interface Props {
  onInput: (file: File) => Promise<void>;
}

export const FileInput = ({ onInput }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop(acceptedFiles, fileRejections, event) {
      if (acceptedFiles.length) {
        onInput(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={clsx(
        "px-5 py-4 rounded border border-dashed border-zinc-500 text-black cursor-pointer text-center ring-8 ring-white h-28 flex items-center justify-center duration-200 hover:bg-zinc-200 shadow-2xl",
        isDragActive ? "bg-zinc-200" : "bg-zinc-100"
      )}
      style={
        isDragActive
          ? {}
          : {
              backgroundImage:
                "linear-gradient(rgb(230 230 230) 1px, transparent 1px), linear-gradient(to right, rgb(230 230 230) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "center center",
            }
      }
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <DocumentArrowUpIcon className="h-8 w-8" />

        <div
          className={clsx(
            "duration-200",
            isDragActive ? "h-0 opacity-0" : "opacity-100 h-9 mt-2"
          )}
        >
          <h3 className="text-sm font-semibold uppercase">Drop files here</h3>
          <p className="text-xs text-gray-700 font-medium">
            or click to upload
          </p>
        </div>
      </div>
    </div>
  );
};
