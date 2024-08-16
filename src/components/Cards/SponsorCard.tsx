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
    <Link
      to={`/sponsors-single/${sponsor.id}`}
      className="w-full bg-white h-16 flex items-center rounded-lg mb-3 pl-4 hover:bg-slate-200"
    >
      <span className="Rubik font-medium text-[#1D1D1F] w-[34px] text-center">
        {order}
      </span>
      <h3 className="font-SfProDisplay text-[#1D1D1F] font-medium ml-[33px] text-[16px] w-[222px]">
        {sponsor.full_name}
      </h3>
      <h3 className="mx-8 w-[150px] text-[#1D1D1F] text-center">
        {sponsor.phone}
      </h3>
      <h3 className="font-SfProDisplay font-medium w-[132px] text-center">
        {formatNumberWithSpaces(sponsor.sum)}
        <span className="text-[#b2b7c1]"> UZS</span>
      </h3>
      <h3 className="font-SfProDisplay font-medium ml-8 w-[140px] text-center">
        {formatNumberWithSpaces(sponsor.spent)}
        <span className="text-[#b2b7c1]"> UZS</span>
      </h3>
      <h3 className="ml-5 font-SfProDisplay font-medium w-20">
        {formatDate(sponsor.created_at)}
      </h3>
      <h3 className={`ml-9 w-[140px] text-center ${statusClassName()}`}>
        {sponsor.get_status_display}
      </h3>
      <button className="ml-9 w-8 flex justify-center">
        <img src={eye} alt="View" />
      </button>
    </Link>
  );
};

export default SponsorCard;
