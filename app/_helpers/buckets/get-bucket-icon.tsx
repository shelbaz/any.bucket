import Image from "next/image";

export const getBucketIcon = (provider: string) => {
  switch (provider) {
    case "aws":
      return (
        <Image
          src="/images/icons/providers/aws.svg"
          alt={provider}
          width={24}
          height={24}
          unoptimized
        />
      );
    case "cloudflare":
      return (
        <Image
          src="/images/icons/providers/cloudflare.svg"
          alt={provider}
          width={24}
          height={24}
          unoptimized
        />
      );
    case "minio":
      return (
        <Image
          src="/images/icons/providers/minio.svg"
          alt={provider}
          width={24}
          height={24}
          unoptimized
        />
      );
    case "wasabi":
      return (
        <Image
          src="/images/icons/providers/wasabi.svg"
          alt={provider}
          width={24}
          height={24}
          unoptimized
        />
      );
    case "backblaze":
      return (
        <Image
          src="/images/icons/providers/backblaze.svg"
          alt={provider}
          width={24}
          height={24}
          unoptimized
        />
      );
    default:
      return (
        <Image
          src="/images/icons/providers/other.svg"
          alt={provider}
          width={24}
          height={24}
          unoptimized
        />
      );
  }
};
