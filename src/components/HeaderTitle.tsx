import React from "react";
import { useTranslation } from "react-i18next";

interface HeaderTitleConfig {
  content: string;
  marginLeft?: string;
  width?: string;
}

interface HeaderTitleProps {
  config: HeaderTitleConfig;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  config: { content, marginLeft, width },
}) => {
  const { t } = useTranslation();

  return (
    <span
      className="tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs text-center"
      style={{ marginLeft: marginLeft, width: width || undefined }}
    >
      {t(content)}
    </span>
  );
};

export default HeaderTitle;
