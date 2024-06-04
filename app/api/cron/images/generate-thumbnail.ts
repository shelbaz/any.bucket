import sharp from "sharp";

export const generateThumbnailFromImage = async (image: ArrayBuffer) => {
  const thumbnail = await sharp(image, { failOnError: false })
    .resize(75)
    .toBuffer();
  return thumbnail;
};
