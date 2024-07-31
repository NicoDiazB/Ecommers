import { ILogin, IOrder, IProduct, IRegister } from "@/interfaces";
import dotenv from "dotenv";
dotenv.config();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProduct = async (): Promise<IProduct[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);

    const data: IProduct[] = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProdcutById = async (id: number): Promise<IProduct> => {
  try {
    const response = await fetch(`${API_URL}/products`);

    const data: IProduct[] = await response.json();

    return data[id - 1];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProdcutByCategory = async (
  id: number,
): Promise<IProduct[] | undefined> => {
  try {
    const response = await fetch(`${API_URL}/products`, { cache: "no-cache" });

    const data: IProduct[] = await response.json();

    const arrProductsCategory: IProduct[] = data.filter((prod) => {
      return prod.categoryId === id;
    });
    if (!arrProductsCategory) {
      return [];
    } else {
      return arrProductsCategory;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postUser = async (userData: IRegister) => {
  try {
    let bodyContent = JSON.stringify(userData);

    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyContent,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return response.status;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (login: ILogin) => {
  try {
    let bodyContent = JSON.stringify(login);
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyContent,
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const token = await response.json();
      return token;
    } else {
      return response.status;
    }
  } catch (error: any) {
    throw new Error("Error en las credenciales", error);
  }
};

export const getOrders = async (token: string) => {
  try {
    let headersList = {
      Authorization: token,
    };

    let response = await fetch(`${API_URL}/users/orders`, {
      cache: "no-cache",
      headers: headersList,
    });
    if (response.ok) {
      let data: IOrder[] = await response.json();

      return data;
    } else {
      response.status;
      return [];
    }
  } catch (error: any) {
    throw new Error("error en optener ordenes", error);
  }
};

export const postOrder = async (products: number[], token: string) => {
  try {
    let headersList = token;

    let bodyContent = JSON.stringify({ products });

    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        authorization: headersList,
        "Content-Type": "application/json",
      },
      body: bodyContent,
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error("algo salio mal en la compra", error);
  }
};
