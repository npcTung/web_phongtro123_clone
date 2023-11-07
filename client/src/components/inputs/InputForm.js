import React, { memo } from "react";

const InputForm = ({
  wf,
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  classDiv,
  classInput,
  defaultValue,
}) => {
  return (
    <div className={`${wf ? "w-full" : "w-fit"} flex flex-col ${classDiv}`}>
      {label && (
        <label
          htmlFor={id}
          className={`label label-text capitalize opacity-70`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`input input-bordered w-full ${
          classInput ? classInput : "bg-gray-100"
        } ${errors[id] && "input-error"} placeholder:text-sm`}
      />
      {errors[id] && (
        <small className="text-xs pl-2 pt-1 text-red-500">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
