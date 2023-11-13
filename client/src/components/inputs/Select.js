import React, { memo } from "react";

const Select = ({
  label,
  id,
  options = [],
  register,
  errors,
  validate,
  defaultValue,
  wf,
  classSelect,
  classDiv,
  disabled,
}) => {
  return (
    <div className={`${wf ? "w-full" : "w-fit"} flex flex-col ${classDiv}`}>
      {label && (
        <label htmlFor={id} className="label label-text opacity-70">
          {label}
        </label>
      )}
      <select
        id={id}
        defaultValue={defaultValue}
        {...register(id, validate)}
        className={`select select-bordered ${classSelect} ${
          errors[id] && "select-error"
        } w-full`}
        disabled={disabled}
      >
        <option value={""}>Choses option</option>
        {options?.map((el) => (
          <option key={el.code} value={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs pl-2 pt-1 text-red-500">
          {errors[id]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(Select);
