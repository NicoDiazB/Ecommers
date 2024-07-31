import LoginUser from "@/components/LoginUser/LoginUser";

import React, { useState } from "react";

const Login: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginUser />
    </div>
  );
};

export default Login;
