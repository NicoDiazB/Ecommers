"use client";
import { CategoryProps } from "@/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Category: React.FC<CategoryProps> = ({ categoryId, categoryName }) => {
  const pathName = usePathname();
  return (
    <div className=" ">
      <Link
        className={
          pathName === `/products/${categoryId}`
            ? "border-b-2 border-secundary text-secundary"
            : "link-navbar"
        }
        href={`/products/${categoryId}`}
      >
        {categoryName}
      </Link>
    </div>
  );
};

export default Category;
