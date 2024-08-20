import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/svg/admin-page-logo.svg";
import LanguageDropdown from "./Dropdown";
import { useTranslation } from "react-i18next";
import Button from "./Base/Button";
import { logOut } from "../utils";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext) || {
    setIsAuthenticated: () => {},
  };

  const handleFilter = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal.showModal();
  };

  return (
    <nav className="bg-white nav">
      <div className="shadow-[0_35px_40px_0px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto py-3 px-10 flex justify-between items-center">
          <Link to={"/"}>
            <img src={logo} className="h-6" alt="Logo image" />
          </Link>
          <div className="flex gap-10 items-center">
            <LanguageDropdown />
            <div className="flex gap-6 justify-between items-center bg-[#F1F1F3] p-1 rounded">
              <span className="ml-5 font-SfProText text-[13px] font-bold text-[#28293D] tracking-[-0.35px] leading-[19.5px]">
                Shohrux
              </span>
              <div className="w-8 h-8 bg-[#00AE69] rounded flex justify-center items-end">
                <i className="icon-user-icon text-2xl leading-none"></i>
              </div>
            </div>
            <Button
              onClick={() => logOut(navigate, setIsAuthenticated)}
              iconLeft={true}
              text=""
              icon="icon-log-out text-[30px]"
              variant="outline"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 px-10 flex justify-between  items-center">
        <div>
          <NavLink
            to={"/dashboard"}
            className={`font-medium uppercase leading-[1] tracking-[1.13px] text-xs py-[14px] px-[55px] border-2 text-[#3366FF99] border-[#E0E7FF] border-r-0 rounded-l-md`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/sponsors"}
            className={`font-medium uppercase leading-[1] tracking-[1.13px] text-xs py-[14px] px-[55px] border-2 text-[#3366FF99] border-[#E0E7FF] `}
          >
            {t("sponsors")}
          </NavLink>
          <NavLink
            to={"/students"}
            className={`font-medium uppercase leading-[1] tracking-[1.13px] text-xs py-[14px] px-[55px] border-2 text-[#3366FF99] border-[#E0E7FF] border-l-0 rounded-r-md`}
          >
            {t("students")}
          </NavLink>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-[284px] border h-10 bg-[#E8E8E8] rounded-md flex items-center">
            <i className="icon-search ml-[10px] text-xl"></i>
            <input
              className="outline-none w-full bg-transparent capitalize px-2  h-full border placeholder-shown:text-[15px] font-normal placeholder:text-[#B1B1B8]"
              type="text"
              placeholder={t("search")}
            />
          </div>

          <Button
            variant="secondary"
            iconLeft={true}
            icon="icon-filter-icon text-[16px]"
            text={t("filter")}
            type="button"
            customClass="h-10 px-8 gap-[10px] font-SfProText tracking-[-0.35px]"
            onClick={handleFilter}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
