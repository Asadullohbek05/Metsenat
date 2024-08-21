import React from "react";
import eye from "../../assets/images/svg/eye.svg";
import { Link } from "react-router-dom";
import { formatNumberWithSpaces } from "../../utils";

interface SponsorCardProps {
  order: number;
  sponsor: {
    id: number;
    full_name: string;
    phone: string;
    sum: number;
    spent: number;
    get_status_display: string;
    created_at: string;
  };
}

const SponsorCard: React.FC<SponsorCardProps> = ({ sponsor, order }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const statusClassName = () => {
    switch (sponsor.get_status_display) {
      case "Yangi":
        return "text-[#5BABF2]";
      case "Moderatsiyada":
        return "text-[#FFA445]";
      case "Tasdiqlangan":
        return "text-[#00CF83]";
      default:
        return "";
    }
  };

  return (
    <div className="w-full transition-[1s] bg-white h-16 flex items-center rounded-lg mb-3 pl-4 hover:bg-slate-200">
      <span className="font-normal text-[15px] text-blackThird w-[24px] text-center">
        {order}
      </span>
      <h3 className="text-blackThird font-medium ml-[33px] text-[15px] w-[222px]">
        {sponsor.full_name}
      </h3>
      <h3 className="mx-8 font-normal text-[14px] w-[150px] text-blackThird text-center">
        {sponsor.phone}
      </h3>
      <h3 className="font-medium text-[14px] w-[132px] text-center">
        {formatNumberWithSpaces(sponsor.sum)}
        <span className="text-pinkPrimary"> UZS</span>
      </h3>
      <h3 className="text-[14px] font-medium ml-8 w-[140px] text-center">
        {formatNumberWithSpaces(sponsor.spent)}
        <span className="text-pinkPrimary"> UZS</span>
      </h3>
      <h3 className="ml-[26px] text-blackThird font-normal text-[14px] w-20">
        {formatDate(sponsor.created_at)}
      </h3>
      <h3
        className={`ml-8 w-[140px] text-[15px] font-normal text-center ${statusClassName()}`}
      >
        {sponsor.get_status_display}
      </h3>
      <Link
        to={`/sponsors-single/${sponsor.id}`}
        className="ml-9 w-8 flex justify-center hover:scale-[1.15] transition-[1s]"
      >
        <img src={eye} alt="View" />
      </Link>
    </div>
  );
};

export default SponsorCard;
