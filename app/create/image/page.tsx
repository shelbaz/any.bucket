"use client";
import { Button } from "@/app/_components/buttons/Button";
import { MoreButton } from "@/app/_components/buttons/MoreButton";
import { downloadFile } from "@/app/_helpers/files";
import { downloadBase64File } from "@/app/_helpers/files/download-file";
import { autoGrow } from "@/app/_helpers/ui";
import { useUploadFile } from "@/app/_hooks/files";
import { useGenerateImages } from "@/app/_hooks/image/use-generate-images";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ImagePage = () => {
  const [images, setImages] = useState<
    { b64_json: string; revised_prompt: string }[]
  >([]);
  const [imageDescription, setImageDescription] = useState("");
  const { generateImages, isLoading } = useGenerateImages();
  const { uploadB64Image } = useUploadFile({ folder: "Creations" });

  const handleGenerateImages = async (description: string) => {
    try {
      const imageResponse = await generateImages({
        description,
        count: 1,
        size: "1024x1024",
      });

      if (imageResponse) {
        setImages([...imageResponse, ...images]);
        toast.success("Images generated successfully!");
      }
    } catch (e) {
      console.error("Failed to generate images", e);
      toast.error("Failed to generate images");
    }
  };

  return (
    <div className="p-4 lg:p-12">
      <div className="flex flex-col max-w-xl space-y-4 mx-auto">
        <h3 className="text-2xl font-semibold text-zinc-800 text-center mb-4">
          Generate Images
        </h3>
        <textarea
          ref={(node) => {
            if (!node) return;
            autoGrow(node, 300, 94);
          }}
          id="image-description"
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          placeholder="Enter a description to generate images..."
          className="py-2 px-3 border border-zinc-900 rounded w-full focus:outline-none focus:shadow resize-none"
        />
        <Button
          label="Generate Image"
          onClick={() => handleGenerateImages(imageDescription)}
          isLoading={isLoading}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 mt-12">
        {images.map((image, index) => {
          const imageName =
            image.revised_prompt?.slice(0, 24) ?? `image - ${index}`;
          const imageBase64 = `data:image/png;base64, ${image.b64_json}`;
          return (
            <div
              key={imageName}
              className="group relative cols-span-12 sm:col-span-6 xl:col-span-4 rounded-lg aspect-square overflow-hidden"
            >
              <Image
                src={imageBase64}
                alt={`${image.revised_prompt} - ${index}`}
                fill
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100">
                <MoreButton
                  options={[
                    {
                      label: "Download",
                      action: () =>
                        downloadBase64File(image.b64_json, imageName),
                    },
                    {
                      label: "Save",
                      action: () => uploadB64Image(imageBase64, imageName),
                    },
                  ]}
                  className="bg-white shadow-sm"
                  position="bottom"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePage;
