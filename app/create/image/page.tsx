"use client";
import { autoGrow } from "@/app/_helpers/ui";
import Image from "next/image";
import { useState } from "react";

const ImagePage = () => {
  const [images, setImages] = useState([]);
  const [imageDescription, setImageDescription] = useState("");
  return (
    <div className="p-4 lg:p-12">
      <textarea
        ref={(node) => {
          if (!node) return;
          autoGrow(node, 300, 47);
        }}
        id="image-description"
        value={imageDescription}
        onChange={(e) => setImageDescription(e.target.value)}
        placeholder="A closeup of a scrappy tabby cat on a picnic blanket, in the sun."
        className="py-2 px-3 border border-zinc-900 rounded w-full focus:outline-none focus:shadow max-w-xl resize-none"
      />
      {/* <Button label="Generate Image" onClick={() => generateImage(imageDescription)} /> */}
      <div className="grid grid-cols-12 gap-4">
        {images.map((image, index) => (
          <div
            key={image}
            className="relative cols-span-12 sm:col-span-6 xl:col-span-4 rounded-lg aspect-square"
          >
            <Image src={image} alt={`${imageDescription} - ${index}`} fill />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePage;
