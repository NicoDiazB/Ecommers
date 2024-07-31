"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { CiMenuBurger } from "react-icons/ci";
import Search from "../Search/Search";
import CartNumber from "../CartNumber/CartNumber";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("tokenUser");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    logout();
    router.push("/");
    toast("Sesión cerrada con exito");
  };

  return (
    <nav className="flex h-24 w-[100%] items-center justify-center gap-2.5 bg-primary">
      <div className="min-h-16 min-w-16">
        <Link className="w-8" href={"/"}>
          <Image src={"/logotuki1.png"} alt="LOGO" width={64} height={64} />
        </Link>
      </div>
      <div className="mt-14 flex h-full flex-col">
        <Search />
      </div>

      <button
        onBlur={() => setIsFocused(false)}
        className="flex flex-col gap-[3px] rounded-lg bg-secundary px-2 py-2 text-soft-letter lg:hidden"
        onClick={() => setIsFocused(!isFocused)}
      >
        <CiMenuBurger color="#E3CAA5" />
      </button>

      <ul
        onMouseDown={(e) => e.preventDefault()}
        className={`${
          isFocused ? "block w-[100%]" : "hidden"
        } duration-400 absolute top-20 z-10 flex flex-wrap justify-center gap-3 rounded-md bg-primary p-4 transition-all ease-in lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-evenly lg:gap-3 lg:bg-transparent lg:p-0 lg:shadow-none`}
      >
        <li className="md:items-center md:justify-center">
          <Link
            className={
              pathName === "/products"
                ? "border-b-2 border-secundary text-secundary"
                : "link-navbar"
            }
            href="/products"
          >
            Productos
          </Link>
        </li>
        <li className="md:items-center md:justify-center">
          <Link
            className={
              pathName === "/about"
                ? "border-b-2 border-secundary text-secundary"
                : "link-navbar"
            }
            href="/about"
          >
            Sobre nosotros
          </Link>
        </li>
        <li className="md:items-center md:justify-center">
          <Link className="link-navbar" href="#contact">
            Contactanos
          </Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li className="md:items-center md:justify-center">
              <Link
                className={
                  pathName === "/register"
                    ? "border-b-2 border-secundary text-secundary"
                    : "link-navbar"
                }
                href="/register"
              >
                Registrate
              </Link>
            </li>
            <button className="flex items-center justify-center gap-2.5 rounded-xl bg-secundary px-2 lg:px-2 lg:py-1">
              <Link
                className={
                  pathName === "/login"
                    ? "border-b-[2px] border-soft-letter text-sm text-soft-letter"
                    : "text-sm font-normal text-soft-letter"
                }
                href="/login"
              >
                Iniciar sesión
              </Link>
            </button>
          </>
        ) : (
          <>
            <li>
              <Link
                className={
                  pathName === "/profile"
                    ? "border-b-2 border-secundary text-secundary"
                    : "link-navbar"
                }
                href="/profile"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathName === "/profile"
                    ? "border-b-2 border-secundary text-secundary"
                    : "link-navbar"
                }
                href="/favoritos"
              >
                Favoritos
              </Link>
            </li>

            <div className="flex gap-4">
              <button
                className="rounded-xl bg-secundary px-2 text-sm font-normal text-soft-letter lg:px-2 lg:py-1"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </ul>
      <div className="min-h-8 min-w-8">
        <Link href={"/cart"}>
          <Image
            className="duration-200 hover:-rotate-12"
            src={"/cart.svg"}
            alt="Cart"
            width={32}
            height={32}
          />
        </Link>
      </div>
      <CartNumber />
    </nav>
  );
};

export default Navbar;
