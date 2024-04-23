import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";

interface Props {
  onInput: (file?: File) => void;
}

export const FileInput = ({ onInput }: Props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="bg-zinc-800 px-5 py-4 rounded-xl border border-dashed border-zinc-500 text-white cursor-pointer text-center ring-8 ring-zinc-900 h-20 flex items-center justify-center"
      style={
        isDragActive
          ? undefined
          : {
              backgroundColor: "rgb(39 39 42)",
              backgroundImage:
                "linear-gradient(rgb(40 40 40) 1px, transparent 1px), linear-gradient(to right, rgb(40 40 40) 1px, rgb(0 0 0) 1px)",
              backgroundSize: "24px 24px",
              backgroundPosition: "center center",
            }
      }
    >
      <input {...getInputProps()} />
      {!isDragActive ? (
        <p>Drag or click to upload</p>
      ) : (
        <ArrowUpTrayIcon className="h-8 w-8" />
      )}
    </div>
  );
};
