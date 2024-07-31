"use client";

import { IInputProps } from "@/interfaces";
import React, { useState } from "react";

const LabelForm: React.FC<IInputProps> = ({
  labelData,
  idInput,
  value,
  name,
  type,
  placeholder,
  onChange,
  icon,
}) => {
  return (
    <div className="relative flex flex-col">
      <label className="text-secundary" htmlFor={idInput}>
        {labelData}
      </label>
      <input
        className="input-style w-full"
        id={idInput}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {icon && (
        <div className="absolute bottom-3 right-2 cursor-pointer">{icon}</div>
      )}
    </div>
  );
};

export default LabelForm;
