import { IProductCarts } from "@/interfaces";
import Link from "next/link";
import React from "react";

const CartProducts: React.FC<IProductCarts> = ({
  id,
  price,
  name,
  image,
}: IProductCarts) => {
  return (
    <div className="flex min-h-64 min-w-[240px] flex-col items-center justify-center rounded-lg border-l-4 border-primary p-4 shadow-card-shadow">
      <Link href={`/product/${id}`}>
        <div className="flex h-32 justify-center">
          <img className="h-auto" src={image} alt="Producto" />
        </div>
        <div className="flex min-w-40 flex-col">
          <h2 className="text-lg text-primary">{name}</h2>
          <p className="">Precio: $ {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default CartProducts;
