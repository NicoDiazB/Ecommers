import { ReactNode } from "react";

export interface CategoryProps {
  categoryId: number;
  categoryName: string;
}

export interface ICategory {
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export interface IProductCarts {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface IParams {
  productId: string;
}

//! props de inputform
export interface IInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  labelData: ReactNode;
  idInput: string;
  name: string;
  type: string;
  icon?: ReactNode;
}

//! interfaces de login
export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginError {
  email?: string;
  password?: string;
}

//! interfaces de register
export interface IRegister {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export interface IRegisterProps extends IRegister {
  passwordCompare: string;
}

export interface IRegisterError {
  email?: string;
  password?: string;
  name?: string;
  address?: string;
  phone?: string;
  passwordCompare?: string;
}

//! contexto global

export interface AuthContextType {
  isLoggedIn: boolean;
  login: (dataUser: IUser) => void;
  logout: () => void;
  userData: IUser | null;
  setUserData: (data: IUser) => void;
  pushProduct: (product: IProductCarts) => void;
  cartData: IProductCarts[];
  setCartData: (cartData: IProductCarts[]) => void;
}

//! user

interface ICredential {
  id: number;
  password: string;
}

export interface IOrder {
  id?: number;
  status: string;
  date: Date;
  userId: number;
  products: IProduct[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credential: ICredential;
  orders: IOrder[];
}
