import CardsProduct from "@/components/CardsProduct/CardsProduct";
import Category from "@/components/Category/Category";
import React from "react";
import { categoriesToPreLoad } from "@/helpers/category";
import { ICategory } from "@/interfaces";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const ProductsView: React.FC = () => {
  return (
    <div className="mt-2 flex p-4">
      <div className="fixed top-[138px] z-10 flex flex-col gap-4 rounded-lg border-r-2 border-soft-letter pr-2">
        <p className="text-xl font-bold text-primary">Categorias</p>
        {categoriesToPreLoad.map((cate: ICategory, index: number) => (
          <Category key={index} categoryId={index} categoryName={cate.name} />
        ))}
      </div>
      <div className="relative flex flex-col items-center gap-6 pl-32">
        <div className="absolute left-40 top-10 flex items-center">
          <Link className="text-sm text-secundary hover:font-medium" href={"/"}>
            Home
          </Link>
          <IoIosArrowForward className="text-sm text-secundary" />
          <Link
            className="text-sm text-secundary hover:font-medium"
            href={"/products"}
          >
            Productos
          </Link>
        </div>
        <CardsProduct />
      </div>
    </div>
  );
};

export default ProductsView;
