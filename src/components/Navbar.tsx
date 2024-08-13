import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/images/svg/admin-page-logo.svg";
import LanguageDropdown from "./Dropdown";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext) || {
    setIsAuthenticated: () => {},
  };
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsAuthenticated(false);
    toast.info("Logged Out Successfully");
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  return (
    <div className="bg-white">
      <div className="shadow-[0_35px_40px_0px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto py-4 px-10 flex justify-between items-center">
          <Link to={"/"}>
            <img src={logo} alt="Logo image" />
          </Link>
          <div className="flex gap-10">
            <LanguageDropdown />
            <div className="flex gap-6 justify-between items-center bg-[#F1F1F3] p-1 rounded">
              <span className="ml-4 font-SfProDisplay font-bold text-[#28293D] tracking-[0.35px]">
                Shohrux
              </span>
              <div className="w-8 h-8 bg-[#00AE69] rounded flex justify-center items-end">
                <i className="icon-user-icon text-2xl leading-none"></i>
              </div>
            </div>
            <button className="flex items-center" onClick={logOut}>
              <i className="icon-log-out text-[32px]"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="h-20 max-w-7xl mx-auto py-4 px-10 flex justify-between  items-center">
        <div>
          <NavLink
            to={"/dashboard"}
            className={`font-SfProDisplay font-medium uppercase tracking-[1.13px] text-xs py-[14px] px-[60px] border-2 border-[#E0E7FF] border-r-0 rounded-l-md`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/sponsors"}
            className={`font-SfProDisplay font-medium uppercase tracking-[1.13px] text-xs py-[14px] px-[60px] border-2 border-[#E0E7FF] border-r-0`}
          >
            {t("sponsors")}
          </NavLink>
          <NavLink
            to={"/students"}
            className={`font-SfProDisplay font-medium uppercase tracking-[1.13px] text-xs py-[14px] px-[60px] border-2 border-[#E0E7FF] rounded-r-md`}
          >
            {t("students")}
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-72 border h-10 bg-[#E8E8E8] rounded-md flex items-center">
            <i className="icon-search ml-[10px] text-xl"></i>
            <input
              className="outline-none w-full bg-transparent px-2  h-full border"
              type="text"
              placeholder={t("search")}
            />
          </div>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="bg-[#EDF1FD] h-10 px-8 flex gap-[10px] items-center text-[#3365FC] text-[14px] font-SfProDisplay font-medium rounded-md"
          >
            <i className="icon-filter-icon text-[16px]"></i>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
