"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  href,
  src,
  height,
  width,
}: {
  href?: string;
  src?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <Link
      href={href ?? "/files"}
      className="hover:opacity-75 flex items-center"
    >
      <Image
        src={src ?? "https://file.swell.so/file.rocks/filerocks-logomark.svg"}
        alt="Logo"
        width={width ?? 64}
        height={height ?? 64}
      />
    </Link>
  );
};
