import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-8">
      <h1 className="text-7xl text-primary">404</h1>
      <h1 className="text-7xl text-primary"> Por aquí no crack 🥸☝️</h1>
      <div className="flex flex-row text-5xl text-primary">
        👉 Dale click al Tuki
        <Link href={"/"}>
          <Image src={"/logotuki1.png"} alt="LOGO" width={72} height={72} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
