import React, { useEffect } from "react";
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
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  return (
    <span
      className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs text-center"
      style={{ marginLeft: marginLeft, width: width || undefined }}
    >
      {t(content)}
    </span>
  );
};

export default HeaderTitle;
