import formatNumberWithSpaces from "../../utils";

interface StudentSponsorCardProps {
  sponsor: {
    id: number;
    sponsor: {
      full_name: string;
    };
    summa: number;
  };
  order: number;
}

const StudentSponsorCard: React.FC<StudentSponsorCardProps> = ({
  sponsor,
  order,
}) => {
  return (
    <div className="w-full border border-[#2E5BFF14] rounded-lg bg-[#FBFBFC] h-[68px] flex items-center mt-3">
      <h3 className="Rubik font-medium text-[#1D1D1F] text-[15px] w-[40px] text-center">
        {order}
      </h3>
      <h3 className="font-SfProDisplay font-medium w-[335px] text-[15px] ml-4 ">
        {sponsor.sponsor.full_name}
      </h3>
      <h3
        className={` w-[205px] text-center text-[14px] font-SfProDisplay font-medium`}
      >
        {formatNumberWithSpaces(sponsor.summa)}
        <span className="text-[#b2b7c1]"> UZS</span>
      </h3>
      <button className="flex items-center justify-center ml-12">
        <i className="icon-edit text-2xl"></i>
      </button>
    </div>
  );
};

export default StudentSponsorCard;
