import React, { type HTMLInputTypeAttribute } from "react";
import { useForm } from "react-hook-form";

export const ValidatedInput = ({
  name,
  placeholder,
  type,
  label,
  error
}: {
  name: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  error?: string;
}) => {
  const { register, formState: { errors } } = useForm();


  return (
    <div className="text-gray-900 w-full grid">
      <label className="mx-2 pb-2" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder ?? ""}
        className="h-6 p-6 w-full border rounded-md"
      />
      {errors[name] && <p className="text-red-500 px-3">{JSON.stringify(errors[name]?.message)}</p>}
    </div>
  );
};
