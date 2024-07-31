"use client";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import CartProducts from "@/components/CartProducts/CartProducts";
import { postOrder } from "@/helpers/fetch";
import { IProduct, IProductCarts } from "@/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { toast } from "sonner";

const Cart: React.FC = () => {
  const [tokenUser, setTokenUser] = useState<string | null>("");
  const { isLoggedIn, setCartData, cartData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("tokenUser");
      const cartInfo = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartData(cartInfo);
      setTokenUser(token);
    }
  }, []);

  const totalPrice = cartData.reduce(
    (acum: number, prod: IProductCarts) => acum + prod.price,
    0,
  );

  const arrProduct: number[] = cartData.map((prod: IProductCarts) => prod.id);

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!cartData || cartData.length < 1) {
      toast("Agrega productos al carrito", {
        action: {
          label: "Ir a productos",
          onClick: () => {
            router.push("/products");
          },
        },
      });
    } else {
      const response = postOrder(arrProduct, tokenUser!)
        .then((data) => {
          toast.success("Compra exitosa");
          localStorage.setItem("cart", "[]");
          setCartData([]);
        })
        .catch((error) => {
          throw new Error("algo salio mal en la compra", error);
        });
    }
  };

  const handleDeleteProduct = (id: number) => {
    const filteredCart = cartData.filter((prod: IProductCarts) => {
      return prod.id !== id;
    });
    setCartData(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  const handleClearCart = () => {
    localStorage.setItem("cart", "[]");
    router.refresh;
    setCartData([]);
  };

  return (
    <section className="my-40 flex flex-col items-center justify-center p-8">
      <h1 className="text-[32px] font-bold text-primary">Carrito de compra</h1>
      <div className="flex min-h-64 flex-col-reverse items-center justify-evenly gap-4 rounded-lg bg-transparent p-8 shadow-card-shadow">
        <div
          className={
            isLoggedIn
              ? "flex min-w-fit items-center gap-4 border-t-2 border-soft-letter p-4"
              : "hidden"
          }
        >
          <button
            onClick={handleClearCart}
            className="flex items-center rounded-lg border-2 border-primary px-2 py-1 text-soft-letter hover:bg-secundary"
          >
            Limpiar
            <img className="w-5" src="/cart.svg" alt="Cart" />
          </button>
          <p className="text-[16px] font-semibold text-primary">
            Valor Total: ${totalPrice | 0}
          </p>
          <button
            onClick={handleBuy}
            className="rounded-lg border-2 border-primary px-2 py-1 text-soft-letter hover:bg-secundary"
          >
            Comprar
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {cartData.length > 0 ? (
            cartData.map((prod: IProductCarts, index: number) => (
              <div key={index}>
                <button
                  onClick={() => handleDeleteProduct(prod.id)}
                  id={`${prod.id}`}
                  className="relative left-52 top-7 flex h-6 w-6 items-center justify-center hover:bg-transparent"
                >
                  <BiX color="red"></BiX>
                </button>
                <CartProducts {...prod} />
              </div>
            ))
          ) : (
            <>
              <p className="text-center text-[24px] font-semibold text-primary">
                No tienes artículos agregados al carrito
              </p>
              {isLoggedIn ? (
                <></>
              ) : (
                <div className="flex flex-col justify-center text-center">
                  <p className="text-balance text-primary">
                    Para agregar productos al carrito{" "}
                    <Link className="link-navbar" href={"/login"}>
                      Inicia sesión
                    </Link>{" "}
                    o{" "}
                    <Link className="link-navbar" href={"/register"}>
                      Resgistrate
                    </Link>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
