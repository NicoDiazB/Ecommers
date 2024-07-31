"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";

const CartNumber = () => {
  const { cartData } = useAuth();
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    if (cartData.length > 0) {
      setNum(cartData.length);
    } else {
      setNum(0);
    }
  }, [cartData.length]);

  return (
    <div className="relative">
      {num > 0 ? (
        <div className="absolute bottom-2 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-light text-white">
          <p className="text-sm">{cartData.length} </p>
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </div>
  );
};

export default CartNumber;
