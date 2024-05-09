"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = ({ href }: { href?: string }) => {
  const logo = process.env.NEXT_PUBLIC_LOGO || "🪨";
  const isImage = logo.startsWith("http");

  return (
    <Link
      href={href ?? "/files"}
      className="hover:opacity-75 w-24 flex items-center"
    >
      {isImage ? (
        <Image src={logo} alt="Logo" width={96} height={96} />
      ) : (
        <span className="text-5xl">{logo}</span>
      )}
    </Link>
  );
};
