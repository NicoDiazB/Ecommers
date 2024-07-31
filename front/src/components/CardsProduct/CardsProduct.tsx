import { IProduct } from "@/interfaces";
import React from "react";
import CardProduct from "../CardProduct/CardProduct";
import { getAllProduct } from "@/helpers/fetch";

const CardsProduct: React.FC = async () => {
  const arr: IProduct[] = await getAllProduct();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-center text-xl font-bold text-primary">
        Productos
      </h1>

      <div className="flex max-w-fit flex-wrap justify-start gap-6 rounded-lg border-t-2 border-soft-letter p-4">
        {arr ? (
          arr.map((product, index) => {
            return <CardProduct key={index} {...product} />;
          })
        ) : (
          <p>no hay nada</p>
        )}
      </div>
    </div>
  );
};

export default CardsProduct;
