"use client";
import { IProduct } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { categoriesToPreLoad } from "@/helpers/category";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const ProductInfo: React.FC<IProduct> = ({
  name,
  stock,
  categoryId,
  description,
  image,
  price,
  id,
}: IProduct) => {
  const { isLoggedIn, setCartData, cartData } = useAuth();

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
      const prevCart = JSON.parse(localStorage.getItem("cart")! || "[]");

      const updatedCart = [
        ...prevCart!,
        {
          name,
          image,
          price,
          id,
        },
      ];
      setCartData(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Artículo agregado al carrito");
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex items-center">
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
        <IoIosArrowForward className="text-sm text-secundary" />
        <Link
          className="text-sm text-secundary hover:font-medium"
          href={`/products/${id - 1}`}
        >
          {categoriesToPreLoad[Number(id) - 1].name}
        </Link>
        <IoIosArrowForward className="text-sm text-secundary" />
        <Link
          className="text-sm text-secundary hover:font-medium"
          href={`/product/${id}`}
        >
          {name}
        </Link>
      </div>
      <div className="relative flex flex-col items-center justify-evenly gap-3 rounded-lg border-2 border-primary px-4 py-2 shadow-card-shadow md:max-h-[400px] md:max-w-[700px]">
        <div className="items-top flex justify-start gap-8">
          <div className="flex flex-col items-center justify-center">
            <img className="mb-4 max-w-32" src={image} alt="producto imagen" />
            <h1 className="font-bold text-primary">Precio: $ {price}</h1>
            <p className="text-sm text-primary"> Existencias: {stock}</p>
          </div>
          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-start">
              <h1 className="pr-2 text-[24px] font-bold text-primary">
                {name}
              </h1>
              <p className="text-balance border-l-2 border-soft-letter p-2 text-sm font-medium text-secundary">
                Categoria: {categoriesToPreLoad[categoryId - 1].name}
              </p>
            </div>
            <h2 className="text-lg font-bold text-primary">Descripción:</h2>
            <p className="font-light text-secundary">{description}</p>
          </div>
        </div>
        <div>
          <button
            onClick={addProduct}
            className="flex w-80 items-center justify-center rounded-lg bg-secundary px-4 py-2 text-soft-letter"
          >
            Agregar al carrito
            <img className="w-6" src="/cart.svg" alt="carrito" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
