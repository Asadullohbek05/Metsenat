import React from "react";

interface HrProps {
  margin?: string;
}

const Hr: React.FC<HrProps> = ({ margin }) => {
  return <hr className={`h-0.5 bg-[#F5F5F7] border-none ${margin}`} />;
};

export default Hr;
