"use client";
import { PayButton } from "@/app/_components/PayButton";
import { Button } from "@/app/_components/buttons/Button";
import { MoreButton } from "@/app/_components/buttons/MoreButton";
import { Select } from "@/app/_components/form/Select";
import { Option } from "@/app/_components/form/Select/Select";
import {
  Breadcrumbs,
  BreadcrumbsTopbar,
} from "@/app/_components/layout/Breadcrumbs";
import { Loader } from "@/app/_components/loaders/Loader";
import { SessionContext } from "@/app/_context/SessionContext";
import { downloadBase64File } from "@/app/_helpers/files/download-file";
import { autoGrow } from "@/app/_helpers/ui";
import { useUploadFile } from "@/app/_hooks/files";
import { useGenerateImages } from "@/app/_hooks/image/use-generate-images";
import { useListKeys } from "@/app/_hooks/key/use-list-keys";
import { PlusIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageGenerateParams } from "openai/resources/index.mjs";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

type Model = "dall-e-2" | "dall-e-3";

const modelOptions: Option<Model>[] = [
  { label: "DALL-E 3", value: "dall-e-3" },
  { label: "DALL-E 2", value: "dall-e-2" },
];

const sizeOptions: Record<Model, Option<ImageGenerateParams["size"]>[]> = {
  "dall-e-2": [
    { label: "256x256", value: "256x256" },
    { label: "512x512", value: "512x512" },
    { label: "1024x1024", value: "1024x1024" },
  ],
  "dall-e-3": [
    { label: "1024x1024", value: "1024x1024" },
    { label: "1024x1792", value: "1024x1792" },
    { label: "1792x1024", value: "1792x1024" },
  ],
};

const qualityOptions: Option<ImageGenerateParams["quality"]>[] = [
  { value: "standard", label: "Standard" },
  { value: "hd", label: "HD" },
];

const countOptions: Option<ImageGenerateParams["n"]>[] = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const ImagePage = () => {
  const router = useRouter();
  const { generateImages, isLoading } = useGenerateImages();
  const { uploadB64Image } = useUploadFile();
  const { session } = useContext(SessionContext);
  const { data: integrationsData, isLoading: integrationsLoading } =
    useListKeys({
      workspaceId: session.workspaceId,
    });

  const [loading, setLoading] = useState<{
    count: number;
  } | null>(null);
  const [images, setImages] = useState<
    { b64_json: string; revised_prompt: string }[]
  >([]);
  const [imageDescription, setImageDescription] = useState("");
  const [model, setModel] = useState<Option<Model>>(modelOptions[0]);
  const [quality, setQuality] = useState<
    Option<ImageGenerateParams["quality"]>
  >(qualityOptions[0]);
  const [size, setSize] = useState<Option<ImageGenerateParams["size"]>>(
    sizeOptions[model.value][0]
  );
  const [count, setCount] = useState<Option<ImageGenerateParams["n"]>>(
    countOptions[0]
  );

  const handleGenerateImages = async (description: string) => {
    if (!description) {
      return toast.error("Please enter a description to generate images!");
    }

    try {
      setLoading({ count: count.value ?? 1 });
      const imageResponse = await generateImages({
        description,
        count: count.value,
        size: size.value,
        model: model.value,
        quality: quality.value,
      });

      setImages([...imageResponse, ...images]);
      toast.success("Images generated successfully!");
    } catch (e) {
      console.error("Failed to generate images", e);
      toast.error("Failed to generate images");
    }

    setLoading(null);
  };

  const changeModel = (model: Option<Model>) => {
    setModel(model);
    setSize(sizeOptions[model.value][0]);
    if (model.value === "dall-e-2") {
      setQuality({ value: undefined, label: "" });
    } else {
      setQuality(qualityOptions[0]);
      setCount(countOptions[0]);
    }
  };

  const getSubmitButton = () => {
    if (!session.plan || session.plan === "free") {
      return (
        <PayButton
          label="Purchase to Add Integrations - $19 (once)"
          buttonClassName="w-full"
        />
      );
    }

    if (
      integrationsData?.integrations?.filter(
        (integration) => integration.name === "openai"
      ).length === 0
    ) {
      return (
        <Button
          label="Add Integration"
          onClick={() => {
            router.push("/settings/integrations");
          }}
          Icon={<PlusIcon className="h-4 w-4" />}
          className="w-full"
        />
      );
    }

    if (integrationsLoading) {
      return <Button className="w-full" isLoading />;
    }

    return (
      <Button
        label="Generate"
        onClick={() => handleGenerateImages(imageDescription)}
        isLoading={isLoading}
        className="w-full"
      />
    );
  };

  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/create"
          crumbs={[
            { title: "Create", segment: "/" },
            { title: "Image", segment: "/image" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12">
        <div className="flex flex-col max-w-xl mx-auto">
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
          <div className="flex flex-col space-y-4 mt-6">
            <Select
              label="Model"
              value={model}
              onChange={changeModel}
              options={modelOptions}
              disabled={!!loading}
            />
            <Select
              label="Size"
              value={size}
              onChange={setSize}
              options={sizeOptions[model.value]}
              disabled={!!loading}
            />
            {model.value === "dall-e-3" && (
              <Select
                label="Quality"
                value={quality}
                onChange={setQuality}
                options={qualityOptions}
                disabled={!!loading}
              />
            )}
            {model.value === "dall-e-2" && (
              <Select
                label="Count"
                value={count}
                onChange={setCount}
                options={countOptions}
                disabled={!!loading}
              />
            )}
          </div>
          <div className="mt-12">{getSubmitButton()}</div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-12">
          {loading &&
            Array.from({ length: loading.count }).map((_, index) => (
              <div
                key={index}
                className="col-span-12 sm:col-span-6 xl:col-span-4 rounded-lg aspect-square bg-zinc-200 animate-pulse"
              >
                <div className="flex items-center justify-center h-full">
                  <Loader size={48} />
                </div>
              </div>
            ))}
          {images.map((image, index) => {
            const imageName =
              image.revised_prompt?.slice(0, 24) ?? `image - ${index}`;
            const imageBase64 = `data:image/png;base64, ${image.b64_json}`;
            const key = imageBase64.slice(0, 24);
            return (
              <div
                key={key}
                className="group relative col-span-12 sm:col-span-6 xl:col-span-4 rounded-lg aspect-square overflow-hidden"
              >
                <Image
                  src={imageBase64}
                  alt={`${image.revised_prompt} - ${index}`}
                  fill
                  unoptimized
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
                        action: () =>
                          uploadB64Image(
                            imageBase64,
                            `Creations/Images/${imageName}`
                          ),
                      },
                    ]}
                    className="bg-white shadow-sm border border-zinc-300"
                    position="bottom"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImagePage;
