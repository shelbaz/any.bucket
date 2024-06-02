import sharp from "sharp";

export const generateThumbnailFromImage = async (image: ArrayBuffer) => {
  const thumbnail = await sharp(image).resize(75).toBuffer();
  return thumbnail;
};
