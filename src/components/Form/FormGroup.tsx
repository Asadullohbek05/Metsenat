import React from "react";

interface FormGroupProps {
  id: string;
  label: string;
  customClass?: string;
  parentClass?: string;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({
  id,
  label,
  customClass = "",
  parentClass = "",
  children,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${parentClass}`}>
      <label
        htmlFor={id}
        id={id}
        className={`text-xs text-blackThird font-medium tracking-[1.13px] uppercase ${customClass}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
