import ProductInfo from "@/components/ProductInfo/ProductInfo";
import { getProdcutById } from "@/helpers/fetch";
import React from "react";

const ProductId = async ({ params }: { params: { productId: string } }) => {
  const id = params.productId;

  const product = await getProdcutById(Number(id));
  //* peticion de backen con el id y ya mostrar las cosas
  return (
    <>
      <main className="flex h-dvh flex-col items-center justify-center px-4 text-left">
        <ProductInfo {...product} />
      </main>
    </>
  );
};

export default ProductId;
