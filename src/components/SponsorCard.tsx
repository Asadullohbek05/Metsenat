import React from "react";
import eye from "../assets/images/svg/eye.svg";
import formatNumberWithSpaces from "../utils";
import { Link } from "react-router-dom";

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
  const formatDate = (sana: string | Date): string => {
    const date = new Date(sana);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
      <h3 className=" mx-8 w-[150px] text-center">{sponsor.phone}</h3>
      <h3 className=" font-SfProDisplay font-medium w-[132px] text-center">
        {formatNumberWithSpaces(sponsor.sum)}
        <span className="text-[#b2b7c1]"> UZS</span>
      </h3>
      <h3 className="font-SfProDisplay font-medium  ml-8 w-[140px] text-center">
        {formatNumberWithSpaces(sponsor.spent)}
        <span className="text-[#b2b7c1]"> UZS</span>
      </h3>
      <h3 className="ml-5 font-SfProDisplay font-medium w-20">
        {formatDate(sponsor.created_at)}
      </h3>
      <h3
        className={`ml-9 w-[140px] text-center ${
          sponsor.get_status_display === "Yangi"
            ? "text-[#5BABF2]"
            : sponsor.get_status_display === "Moderatsiyada"
            ? "text-[#FFA445]"
            : sponsor.get_status_display === "Tasdiqlangan"
            ? "text-[#00CF83]"
            : null
        }`}
      >
        {sponsor.get_status_display}
      </h3>
      <button className="ml-9 w-8 flex justify-center">
        <img src={eye} alt="View" />
      </button>
    </Link>
  );
};

export default SponsorCard;
