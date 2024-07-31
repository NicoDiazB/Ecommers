import CardProduct from "@/components/CardProduct/CardProduct";
import Category from "@/components/Category/Category";
import { categoriesToPreLoad } from "@/helpers/category";
import { getProdcutByCategory } from "@/helpers/fetch";
import { ICategory } from "@/interfaces";
import Link from "next/link";
import React from "react";
import { BiLeftArrow } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const ProductsId = async ({ params }: { params: { CategoryId: string } }) => {
  const id = Number(params.CategoryId);

  const productsCategory = await getProdcutByCategory(id + 1);

  return (
    <div className="ml-40 flex h-dvh justify-center">
      <div className="fixed left-6 top-[138px] flex flex-col gap-4 rounded-lg border-r-2 border-soft-letter pr-2">
        <p className="text-xl font-bold text-primary">Categorias</p>
        {categoriesToPreLoad.map((cate: ICategory, index: number) => (
          <Category key={index} categoryId={index} categoryName={cate.name} />
        ))}
      </div>
      <div className="flex flex-col items-start p-8">
        <div className="mb-4 flex flex-col">
          {categoriesToPreLoad.length > id ? (
            <>
              <p className="text-[32px] font-bold text-primary">
                Categoria:{" "}
                <span className="text-[24px] text-secundary">
                  {categoriesToPreLoad[id].name}
                </span>
              </p>
              <div className="flex items-center">
                <Link
                  className="text-sm text-secundary hover:font-medium"
                  href={"/"}
                >
                  Home
                </Link>
                <IoIosArrowForward className="text-sm text-secundary" />
                <Link
                  className="text-sm text-secundary hover:font-medium"
                  href={"/products"}
                >
                  Productos
                </Link>
                <IoIosArrowForward className="text-sm text-secundary" />
                <Link
                  className="text-sm text-secundary hover:font-medium"
                  href={"/productos/0"}
                >
                  {categoriesToPreLoad[id].name}
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <Link
                className="flex items-center justify-start font-light text-secundary hover:font-bold"
                href={"/products"}
              >
                <BiLeftArrow />
                Volver a productos
              </Link>
              <p className="text-[32px] font-bold text-primary">
                Esta categoria no existe.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-start gap-6 rounded-lg border-t border-soft-letter p-4">
          {productsCategory!.length > 0 ? (
            productsCategory?.map((prod) => (
              <CardProduct key={prod.id} {...prod} />
            ))
          ) : (
            <>
              <p className="text-[32px] font-bold text-primary">
                No hay productos con esta categoria
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsId;
