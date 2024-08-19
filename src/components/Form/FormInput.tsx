import React from "react";

interface FormInputProps {
  id: string;
  type: "text" | "password" | "number";
  placeholder: string;
  parentClass?: string;
  inputClass?: string;
  error?: boolean;
  value: string;
  before: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  placeholder = "",
  parentClass = "",
  inputClass = "",
  error,
  value,
  before,
  onChange,
}) => {
  return (
    <div className={`flex ${parentClass}`}>
      <span className="absolute top-[10px] left-4 text-[15px] font-normal text-[#2E384D]">
        {before ? before : null}
      </span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className={`border transition-[1s] text-[15px] font-normal bg-[#E0E7FF33] px-4 focus:border-[#2E5BFF] ${
          error ? "border-red-500" : "border-[#E0E7FF]"
        } h-[42px] outline-none text-[#2E384D] placeholder:text-blue ${inputClass} rounded-md`}
      />
    </div>
  );
};

export default FormInput;
