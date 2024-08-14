import React from "react";
import eye from "../assets/images/svg/eye.svg";
import formatNumberWithSpaces from "../utils";
import { Link } from "react-router-dom";

interface StudentCardProps {
  order: number;
  student: {
    id: number;
    full_name: string;
    phone: string;
    sum: number;
    spent: number;
    name: string;
    institute: object;
    get_status_display: string;
    created_at: string;
  };
}

const StudentCard: React.FC<StudentCardProps> = ({ student, order }) => {
  return (
    <Link
      to={`/student-single/${student.id}`}
      className="w-full bg-white h-[68px] flex items-center rounded-lg mb-3 pl-4 hover:bg-slate-200"
    >
      <span className="Rubik font-medium text-[#1D1D1F] w-[34px] text-center">
        {order}
      </span>
      <h3 className="font-SfProDisplay text-[#1D1D1F] font-medium ml-[33px] text-[16px] w-[155px]">
        {student.full_name}
      </h3>
      <h3 className="mx-4 w-[150px] font-SfProDisplay text-[#1D1D1F] text-center">
        {student.type === 1
          ? "Bakalavr"
          : student.type === 2
          ? "Magistr"
          : student.type === 3
          ? "Phd"
          : null}
      </h3>
      <h3 className="font-SfProDisplay font-medium w-[320px] text-[14px] text-center">
        {student.institute.name}
      </h3>
      <h3 className="font-SfProDisplay font-medium  ml-8 w-[140px] text-center">
        {formatNumberWithSpaces(student.given)}
        <span className="text-[#b2b7c1]"> UZS</span>
      </h3>

      <h3
        className={`ml-9 w-[140px] text-center font-SfProDisplay font-medium`}
      >
        {formatNumberWithSpaces(student.contract)}
        <span className="text-[#b2b7c1]"> UZS</span>
      </h3>
      <button className="ml-9 w-8 flex justify-center">
        <img src={eye} alt="View" />
      </button>
    </Link>
  );
};

export default StudentCard;
