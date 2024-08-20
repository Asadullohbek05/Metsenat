import { formatNumberWithSpaces } from "../../utils";

interface DashboardCardProps {
  iconClass: string;
  title: string;
  value: number;
  status: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  iconClass,
  title,
  value,
  status,
}) => {
  return (
    <div className="bg-white w-96 h-24 rounded-lg p-6 flex items-center gap-4 border border-[#2E5BFF14]">
      <div
        className={`w-12 h-12 rounded-xl bg-[${status}] flex justify-center items-center`}
      >
        <i className={`${iconClass} text-[25px]`}></i>
      </div>
      <div>
        <span className="text-[#7A7A9D] leading-[12px] text-xs font-normal">
          {title}
        </span>
        <h2 className="font-SfProDisplay font-bold text-[#2E384D] text-xl">
          {formatNumberWithSpaces(value)}
          <span className="text-pinkPrimary"> UZS</span>
        </h2>
      </div>
    </div>
  );
};

export default DashboardCard;
