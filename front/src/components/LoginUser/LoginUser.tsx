"use client";
import LabelForm from "@/components/Labelform/LabelForm";
import { validateLogin } from "@/helpers/Validate";
import { loginUser } from "@/helpers/fetch";
import { ILogin, ILoginError } from "@/interfaces";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";

const LoginUser: React.FC = () => {
  const [userLogin, setUserLogin] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [errorLogin, setErrorLogin] = useState<ILoginError>({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    const updateLogin: ILogin = { ...userLogin, [name]: value };
    setUserLogin(updateLogin);
    setErrorLogin(validateLogin(updateLogin));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errorLogin).length === 0) {
      loginUser(userLogin)
        .then((res) => {
          if (res === 400 || res === 404) {
            toast.error(`Tuvimos un error ${res} Datos incorrectos`);
          } else {
            localStorage.setItem("tokenUser", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("cart", "[]");
            login(res.user);
            toast.message("Se a inicado sesion", {
              description: `bienvenido ${res.user.name}`,
            });
            setUserLogin({
              email: "",
              password: "",
            });
            router.push("/");
          }
        })
        .catch((error) => {
          console.log(`Error de login ${error} `);

          toast.error("Email o contraseña erronea");
        });
    } else {
      let camposVacios = Object.keys(errorLogin);
      toast.message(`Faltan llenar campos o tienes errores en:`, {
        description: `${camposVacios.join(" ")}`,
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-80 flex-col items-center gap-6 rounded-lg border-2 border-primary p-6 shadow-card-shadow"
      >
        <h1 className="border-b-2 border-soft-letter text-[24px] text-primary">
          {" "}
          Iniciar Sesión
        </h1>
        <div className="flex flex-col">
          <LabelForm
            labelData="Email"
            name="email"
            idInput="email"
            placeholder="Pepito@mail.com"
            type="text"
            value={userLogin.email}
            onChange={handleOnChange}
          />
          {errorLogin.email && (
            <span className="text-[12px] text-red-400">{errorLogin.email}</span>
          )}
        </div>
        <div className="flex flex-col">
          <LabelForm
            labelData="Contraseña"
            name="password"
            idInput="password"
            placeholder="**********"
            type="password"
            value={userLogin.password}
            onChange={handleOnChange}
          />
          {errorLogin.password && (
            <span className="text-[12px] text-red-400">
              {errorLogin.password}
            </span>
          )}
        </div>

        <button className="w-fit rounded-md bg-secundary px-4 py-2 text-soft-letter">
          Iniciar sesión
        </button>
        <div className="flex items-center">
          <p className="text-sm text-secundary">¿No tienes cuenta?-</p>
          <Link
            className="text-sm font-semibold text-soft-letter hover:text-primary"
            href="/register"
          >
            Registrate
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginUser;
