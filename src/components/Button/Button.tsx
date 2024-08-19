import React from "react";

interface ButtonProps {
  variant?: "primary" | "outline" | "secondary";
  iconLeft?: boolean;
  iconRight?: boolean;
  text?: string;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  customClass?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const variants = {
  primary: "bg-[#2E5BFF] text-white hover:bg-[#2e5bffd0]",
  secondary: "bg-[#EDF1FD] text-[#3365FC] hover:bg-[#d2d7e6af]",
  outline: "bg-transparent",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  iconLeft = false,
  iconRight = false,
  text = "button",
  loading,
  icon,
  disabled = false,
  customClass = "",
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-sm font-medium rounded-md active:scale-95 cursor-pointer transition-[1s] disabled:cursor-not-allowed disabled:opacity-[0.5] ${
        variants[variant]
      } ${customClass}  ${iconLeft ? "flex-row-reverse" : ""}`}
      type={type}
      disabled={disabled}
    >
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          {iconRight && icon && <i className={icon}></i>}
          {text && <span>{text}</span>}
          {iconLeft && icon && <i className={icon}></i>}
        </>
      )}
    </button>
  );
};

export default Button;
