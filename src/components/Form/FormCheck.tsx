import { FC } from "react";

import checkIcon from "../../assets/images/svg/checkIcon.svg";

interface CheckboxProps {
  text: string;
  id: string;
  isActive: boolean;
  onClick: () => void;
}

const Check: FC<CheckboxProps> = ({ text, id, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      id={id}
      type="button"
      className={`flex relative justify-center items-center gap-0.5 w-[134px] h-[52px] font-medium border ${
        isActive ? "border-2 border-[#2E5BFF]" : "bg-white"
      } rounded-md text-xs mr-3 mb-3`}
    >
      {text}
      {id !== "1" && (
        <span className="uppercase text-[#2E5BFF] font-normal">Uzs</span>
      )}
      {isActive ? (
        <img
          className="absolute right-[-5px] top-[-5px]"
          src={checkIcon}
          alt=""
        />
      ) : null}
    </button>
  );
};

export default Check;
