import eye from "../../assets/images/svg/eye.svg";
import { formatNumberWithSpaces } from "../../utils";
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
    institute: {
      name: string;
    };
    get_status_display: string;
    created_at: string;
    type: number;
    given: number;
    contract: number;
  };
}

const StudentCard: React.FC<StudentCardProps> = ({ student, order }) => {
  return (
    <div className="w-full bg-white h-[68px] flex items-center rounded-lg mb-3 pl-4 hover:bg-slate-200">
      <span className="Rubik font-medium text-blackThird w-[34px] text-center">
        {order}
      </span>
      <h3 className="text-blackThird font-medium ml-[33px] text-[15px] w-[155px]">
        {student.full_name}
      </h3>
      <h3 className="mx-4 w-[150px] text-[14px] font-normal text-blackThird text-center">
        {student.type === 1
          ? "Bakalavr"
          : student.type === 2
          ? "Magistr"
          : student.type === 3
          ? "Phd"
          : null}
      </h3>
      <h3 className="font-normal text-blackThird w-[320px] text-[14px] text-center">
        {student.institute.name}
      </h3>
      <h3 className="font-medium  text-[14px] ml-8 w-[140px] text-center">
        {formatNumberWithSpaces(student.given)}
        <span className="text-pinkPrimary"> UZS</span>
      </h3>

      <h3 className={`ml-9 w-[140px] text-[14px] text-center font-medium`}>
        {formatNumberWithSpaces(student.contract)}
        <span className="text-pinkPrimary"> UZS</span>
      </h3>
      <Link
        to={`/student-single/${student.id}`}
        className="ml-9 w-8 flex justify-center"
      >
        <img src={eye} alt="View" />
      </Link>
    </div>
  );
};

export default StudentCard;
