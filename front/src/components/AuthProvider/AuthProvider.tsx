"use client";
import {
  AuthContextType,
  IOrder,
  IProduct,
  IProductCarts,
  IUser,
} from "@/interfaces";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [cartData, setCartData] = useState<IProductCarts[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    const user = localStorage.getItem("user");
    const cart = localStorage.getItem("cart");

    if (token && user && cart) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
      setCartData(JSON.parse(cart));
    }
  }, []);

  const pushProduct = (product: IProductCarts) => {
    if (product) {
      const updateData = [...cartData, product];
      setCartData(updateData);
    }
  };

  const login = (dataUser: IUser) => {
    if (dataUser) {
      setIsLoggedIn(true);
      setUserData(dataUser);
      setCartData([]);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        setUserData,
        pushProduct,
        cartData,
        setCartData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("algo salio mal en el contexto");
  }
  return context;
};
