import sharp from "sharp";

export const generateThumbnailFromImage = async (image: ArrayBuffer) => {
  const thumbnail = await sharp(image).resize(40).toBuffer();
  return thumbnail;
};
