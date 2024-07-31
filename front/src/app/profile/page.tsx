"use client";

import { useAuth } from "@/components/AuthProvider/AuthProvider";
import CartProducts from "@/components/CartProducts/CartProducts";
import { getOrders } from "@/helpers/fetch";
import { IOrder } from "@/interfaces";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const { userData } = useAuth();
  const [ordersUser, setOrders] = useState<IOrder[]>([]);
  const [visibility, setVisibility] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenLocal = localStorage.getItem("tokenUser");
      if (tokenLocal) {
        getOrders(tokenLocal)
          .then((res) => {
            const orders = res;
            setOrders(orders);
          })
          .catch((error) => {
            console.error("No se encontraron órdenes", error);
          });
      } else {
        toast("para ingresar a esta seccion tienes que iniciar sesión");
        router.push("/login");
      }
    }
  }, []);

  const hiden = (id: string | undefined) => {
    if (!id) {
      return;
    } else {
      setVisibility((prev) => (prev === id ? null : id));
    }
  };

  return (
    <>
      {userData ? (
        <section className="mt-16 flex flex-col items-center justify-start">
          <div className="flex w-96 flex-col items-center gap-4 rounded-lg border-l-4 border-primary p-4 shadow-card-shadow">
            <h1 className="text-[24px] font-bold text-primary">Perfil</h1>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-soft-letter text-[40px] font-medium text-secundary shadow-lg">
              {userData.name[0].toUpperCase()}
            </div>

            <p className="text-lg text-primary">
              Nombre: <span className="text-secundary">{userData.name}</span>
            </p>
            <p className="text-lg text-primary">
              Email: <span className="text-secundary">{userData.email}</span>
            </p>
            <p className="text-lg text-primary">
              Dirección:{" "}
              <span className="text-secundary">{userData.address}</span>
            </p>
            <p className="text-lg text-primary">
              Celular: <span className="text-secundary">{userData.phone}</span>
            </p>
          </div>

          <section className="mt-16 p-8">
            <p className="text-[24px] text-primary">Órdenes de compra</p>
            {ordersUser.length > 0 ? (
              <div className="flex flex-col gap-4 rounded-lg border-l-4 border-primary p-4 shadow-card-shadow">
                {ordersUser?.map((order) => (
                  <div
                    className="border-t-2 border-soft-letter p-2"
                    key={order.id}
                  >
                    <p className="text-lg text-primary">
                      # de Orden: <strong>{order.id}</strong>
                    </p>
                    <p className="text-lg text-primary">
                      Estado: <strong>{order.status}</strong>
                    </p>
                    <p className="text-lg text-primary">
                      Fecha de la orden:
                      <strong>
                        {new Date(order.date).toLocaleDateString()}
                      </strong>
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      Productos:
                    </p>
                    <button
                      onClick={() => hiden(`${order.id}`)}
                      className="p-1 text-soft-letter hover:bg-transparent hover:text-primary"
                    >
                      {visibility !== `${order.id}`
                        ? "Detalles..."
                        : "Cerrar detalles..."}
                    </button>
                    <div
                      className={`transform transition-all duration-500 ease-in-out ${
                        visibility === `${order.id}`
                          ? "flex max-h-fit flex-wrap justify-center gap-10 opacity-100"
                          : "flex max-h-0 flex-wrap justify-center gap-1 overflow-hidden opacity-0"
                      }`}
                    >
                      {order.products.map((product) => (
                        <CartProducts key={product.id} {...product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex w-96 flex-col gap-4 rounded-lg border-l-4 border-primary p-4 shadow-card-shadow">
                <p className="font-light text-primary">
                  No tienes órdenes de compra
                </p>
              </div>
            )}
          </section>
        </section>
      ) : (
        <div className="flex h-dvh items-center justify-center">
          <p className="text-xl text-primary">Cargando...</p>
        </div>
      )}
    </>
  );
};

export default Profile;
