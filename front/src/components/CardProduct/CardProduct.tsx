"use client";

import { IProductCarts } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CardProduct: React.FC<IProductCarts> = ({ id, name, price, image }) => {
  const { isLoggedIn, pushProduct, cartData, setCartData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }
  }, []);

  const addProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast("Tienes que estar logueado para hacer una compra", {
        action: {
          label: "Iniciar Sesion",
          onClick: () => {
            router.push("/login");
          },
        },
      });
      return;
    }

    const isNotOnlyne = cartData.some((pro) => pro.id === id);
    if (isNotOnlyne) {
      toast.warning("Solo puedes agregar un mismo producto 1 sola vez");
    } else {
      const prevCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const updatedCart: IProductCarts[] = [
        ...prevCart,
        {
          name,
          image,
          price,
          id,
        },
      ];

      setCartData(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      pushProduct({ name, image, price, id });

      toast.success("Artículo agregado al carrito");
    }
  };

  return (
    <div className="flex min-h-64 min-w-[240px] flex-col items-center justify-evenly gap-2 rounded-lg border-l-4 border-primary bg-transparent p-4 shadow-card-shadow">
      <Link className="duration-200 hover:scale-105" href={`/product/${id}`}>
        <div className="flex h-32 justify-center">
          <img className="h-auto" src={image} alt="Producto" />
        </div>
        <div className="flex min-w-40 flex-col">
          <h2 className="text-lg text-primary">{name}</h2>
          <p className="text-secundary">${price}</p>
        </div>
      </Link>
      <button
        onClick={addProduct}
        className="flex items-center rounded-lg bg-secundary px-4 py-2 text-sm text-soft-letter"
      >
        Añadir al carrito
        <img className="w-4" src="/cart.svg" alt="" />
      </button>
    </div>
  );
};

export default CardProduct;
