import Image, { ImageProps, StaticImageData } from "next/image";

interface IStyledImage extends ImageProps {
  className?: string;
  src: StaticImageData | string;
}

export const StyledImage = (props: IStyledImage) => {
  const { className, src, alt, ...imageProps } = props;
  if (!src) return null;
  return (
    <div className={className}>
      {src && <Image src={src} alt={alt} {...imageProps} />}
    </div>
  );
};
