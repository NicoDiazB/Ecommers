"use client";
import LabelForm from "@/components/Labelform/LabelForm";
import { validateRegister } from "@/helpers/Validate";
import { postUser } from "@/helpers/fetch";
import { IRegister, IRegisterError, IRegisterProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const RegisterUser: React.FC = () => {
  const router = useRouter();
  const [userRegister, setUserRegister] = useState<IRegisterProps>({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    passwordCompare: "",
  });

  const [errorRegister, setErrorRegister] = useState<IRegisterError>({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    passwordCompare: "",
  });
  const [visibility, setVisibility] = useState<Boolean>(false);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const updateRegister: IRegisterProps = { ...userRegister, [name]: value };
    setUserRegister(updateRegister);
    setErrorRegister(validateRegister(updateRegister));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(errorRegister).length === 0) {
      const userData: IRegister = {
        email: userRegister.email,
        password: userRegister.password,
        name: userRegister.name,
        address: userRegister.address,
        phone: userRegister.phone,
      };
      postUser(userData)
        .then((res) => {
          console.log(res);
          if (res === 400 || res === 404) {
            toast.error(`hubo un error o el usuario ya esta registrado`);
          } else {
            toast("Registro exitoso");
            setUserRegister({
              email: "",
              password: "",
              name: "",
              address: "",
              phone: "",
              passwordCompare: "",
            });
            router.push("/login");
          }
        })
        .catch((error) => {
          toast.error("Error en el registro del usuario");
        });
    } else {
      let camposVacios = Object.keys(errorRegister);
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
        <h1 className="border- border-b-2 border-soft-letter text-[24px] text-primary">
          Registrate
        </h1>
        <div className="flex flex-col">
          <LabelForm
            labelData="Email"
            name="email"
            idInput="email"
            placeholder="Pepito@mail.com"
            type="text"
            value={userRegister.email}
            onChange={handleOnChange}
          />
          {errorRegister.email && (
            <span className="text-[12px] text-red-400">
              {errorRegister.email}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <LabelForm
            labelData="Nombre"
            name="name"
            idInput="name"
            placeholder="Pepito"
            type="text"
            value={userRegister.name}
            onChange={handleOnChange}
          />
          {errorRegister.name && (
            <span className="text-[12px] text-red-400">
              {errorRegister.name}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <LabelForm
            labelData="Dirección"
            name="address"
            idInput="address"
            placeholder="Calle 123# 54 -54"
            type="tex"
            value={userRegister.address}
            onChange={handleOnChange}
          />
          {errorRegister.address && (
            <span className="text-[12px] text-red-400">
              {errorRegister.address}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <LabelForm
            labelData="Celular"
            name="phone"
            idInput="phone"
            placeholder="3216546894"
            type="number"
            value={userRegister.phone}
            onChange={handleOnChange}
          />
          {errorRegister.phone && (
            <span className="text-[12px] text-red-400">
              {errorRegister.phone}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <LabelForm
            labelData="Contraseña"
            name="password"
            idInput="password"
            placeholder="**********"
            type={visibility ? "text" : "password"}
            value={userRegister.password}
            onChange={handleOnChange}
            icon={
              visibility ? (
                <FaEye color="#7D452B" onClick={handleVisibility} />
              ) : (
                <FaEyeSlash color="#7D452B" onClick={handleVisibility} />
              )
            }
          />
          {errorRegister.password && (
            <span className="text-[12px] text-red-400">
              {errorRegister.password}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <LabelForm
            labelData="Rectificar contraseña"
            name="passwordCompare"
            idInput="passwordCompare"
            placeholder="**********"
            type="password"
            value={userRegister.passwordCompare}
            onChange={handleOnChange}
          />
          {errorRegister.passwordCompare && (
            <span className="text-[12px] text-red-400">
              {errorRegister.passwordCompare}
            </span>
          )}
        </div>

        <button className="w-fit rounded-md bg-secundary px-4 py-2 text-soft-letter">
          Enviar
        </button>
      </form>
    </>
  );
};

export default RegisterUser;
