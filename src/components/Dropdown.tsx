import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

type Language = {
  code: string;
  name: string;
  locale: string;
};

function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    return storedLang
      ? JSON.parse(storedLang)
      : { code: "ENG", name: "ENG", locale: "en" };
  });

  const languages: Language[] = [
    { code: "ENG", name: "ENG", locale: "en" },
    { code: "UZ", name: "UZ", locale: "uz" },
    { code: "RU", name: "RU", locale: "ru" },
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectLanguage = (lang: Language) => {
    const storedLangStr = localStorage.getItem("selectedLanguage");
    const storedLang = storedLangStr ? JSON.parse(storedLangStr) : null;
    if (lang.name != storedLang.code) {
      i18n.changeLanguage(lang.locale);
      setSelectedLanguage(lang);
      localStorage.setItem("selectedLanguage", JSON.stringify(lang));
      toast.success(`Language changed to ${lang.name}`, {});
    }
    setIsDropdownOpen(false);
    console.log(lang.locale);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    i18n.changeLanguage(selectedLanguage.locale);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedLanguage.locale, i18n]);

  return (
    <div
      className="language-dropdown flex relative bg-[#F1F1F3]  border rounded-md"
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        className="px-[10px] border-none flex items-center bg-transparent focus:outline-none"
      >
        {selectedLanguage.code}
        <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-t-black border-l-transparent border-r-transparent transition-all duration-300 ml-[10px]"></span>
      </button>
      {isDropdownOpen && (
        <div
          className="absolute w-full right-5 mt-2 min-w-[150px] shadow-md z-20 rounded border border-[#F1F1F1] bg-[#FCFCFC]"
          role="menu"
          aria-labelledby="language-button"
        >
          {languages.map((lang) => (
            <a
              key={lang.locale}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                selectLanguage(lang);
              }}
              className="p-[4px_10px] no-underline block bg-white text-[#2B2B2B] font-inter text-sm font-medium uppercase hover:bg-[#f1f1f1]"
              role="menuitem"
            >
              {lang.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
