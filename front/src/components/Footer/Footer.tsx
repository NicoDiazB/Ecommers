import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="h-23 inline-flex w-full justify-evenly bg-primary py-10">
      <div className="flex items-center">
        <Image src="/logotuki1.png" alt="LOGO" width={80} height={80} />
      </div>

      <div
        className="inline-flex flex-col items-center justify-center gap-2.5"
        id="contact"
      >
        <div className="text-2xl font-normal text-soft-letter">Contactanos</div>
        <div className="text-base font-bold text-soft-letter">
          <a href="" className="link-navbar">
            info@tuki.com
          </a>
        </div>
        <div className="text-base font-bold text-orange-200">
          +57 2538495123
        </div>
      </div>
      <div className="inline-flex w-40 flex-col items-center justify-center gap-6">
        <div className="text-2xl font-normal text-soft-letter">Social</div>
        <div className="flex w-fit items-center justify-center gap-4">
          <Link
            className="justify-centerw-[32px] flex"
            href="https://facebook.com"
          >
            <img src="/facebook.svg" alt="Facebook" />
          </Link>
          <Link className="w-[32px]" href="https://instagram.com">
            <img src={"/instagram.svg"} alt="Instagram" />
          </Link>
          <Link className="w-[32px]" href="https://twitter.com">
            <img src={"/twitter.svg"} alt="Twitter" />
          </Link>
          <Link className="w-[32px]" href="https://github.com/NicoDiazB">
            <img src={"/git.svg"} alt="Git" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
