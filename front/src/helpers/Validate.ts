import {
  ILogin,
  ILoginError,
  IRegisterError,
  IRegisterProps,
} from "@/interfaces";

export const validateRegister = (dataUser: IRegisterProps): IRegisterError => {
  let error: IRegisterError = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!dataUser.email) {
    error.email = "El email es requerido";
  } else if (!emailRegex.test(dataUser.email)) {
    error.email = "El Email no es valido ";
  } else if (!dataUser.name) {
    error.name = "El nombre es requerido";
  } else if (!dataUser.address) {
    error.address = "La direccion es requerida";
  } else if (!dataUser.phone) {
    error.phone = "El numero es requerido";
  } else if (dataUser.phone.length > 11) {
    error.phone = "El celular no puede ser mayor a 10 digitos";
  } else if (!dataUser.password) {
    error.password = "La contraseña es requerida";
  } else if (dataUser.password.length < 8) {
    error.password = "La contraseña tiene que tener mas de 8 digitos";
  } else if (dataUser.password !== dataUser.passwordCompare) {
    error.passwordCompare = "La contraseña no coincide";
  }
  return error;
};

export const validateLogin = ({ email, password }: ILogin): ILoginError => {
  let error: ILoginError = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    error.email = "El nombre de usuario es requerido";
  } else if (!emailRegex.test(email)) {
    error.email = "El Email no es valido ";
  } else if (!password) {
    error.password = "La contraseña es requerida";
  }
  return error;
};
