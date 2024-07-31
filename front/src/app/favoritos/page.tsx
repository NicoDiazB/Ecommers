"use client";

import { useAuth } from "@/components/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Favoritos = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      toast("Tienes que iniciar sesión para ver tus porductos favoritos");
      router.push("/login");
    }
  }, []);

  return (
    <div className="h-dvh">
      <h1>aqui van a estar tus prodcutos favortios</h1>
    </div>
  );
};

export default Favoritos;
