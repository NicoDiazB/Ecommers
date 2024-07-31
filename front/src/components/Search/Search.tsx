"use client";
import { getAllProduct } from "@/helpers/fetch";
import { IProduct } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    getAllProduct()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        throw new Error("productos en las search", err);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
  };

  const productFilter = products.filter((prod) => {
    return prod.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <input
        value={search}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-[auto] rounded-lg bg-input-bg px-6 py-2 text-base font-normal text-primary placeholder-soft-letter focus:border-transparent focus:outline-none focus:ring-0 focus:ring-secundary"
        placeholder="Buscador..."
      ></input>
      <CiSearch className="absolute top-[39px] text-primary" />
      {isFocused && search !== "" && (
        <ul className="relative -top-2 z-30 flex flex-col gap-2 rounded-b-lg bg-input-bg p-2 shadow-lg">
          {productFilter.length > 0 ? (
            productFilter.map((prod) => (
              <Link
                key={prod.id}
                className="text-[12px] text-soft-letter hover:text-secundary"
                href={`/product/${prod.id}`}
                onMouseDown={(e) => e.preventDefault()}
              >
                <li key={prod.id}>{prod.name}</li>
              </Link>
            ))
          ) : (
            <li className="text-[12px] text-soft-letter">
              No Se encontro este Producto
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Search;
