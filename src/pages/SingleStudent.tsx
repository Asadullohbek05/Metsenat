import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../components/Dropdown";

import arrow from "../assets/images/svg/arrow-left.svg";
import logo from "../assets/images/svg/admin-page-logo.svg";
import editIcon from "../assets/images/svg/edit-icon.svg";
import sponsorIcon from "../assets/images/svg/sponsor-icon.svg";
import request from "../server/request";
import formatNumberWithSpaces from "../utils";
// import saveIcon from "../assets/images/svg/save-icon.svg";

const SingleStudent = () => {
  const [studentDetails, setStudentDetails] = useState([]);

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
    window.scrollTo(0, 0);
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        const { data } = await request.get(`/student-detail/${id}`);
        console.log(data);
        setStudentDetails(data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudentDetails();
  }, [id]);

  console.log(studentDetails);

  return (
    <div>
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
          <div className="flex items-center">
            <Link to="/students">
              <img src={arrow} alt="Back" />
            </Link>
            <h3 className="text-[#28293D] font-SfProDisplay font-bold text-2xl ml-4 mr-3">
              {studentDetails.full_name}
            </h3>
          </div>
          <button className="px-8 py-2 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-medium rounded-md my-7 flex items-center gap-[10px]">
            <i className="icon-plus text-2xl"></i>
            {t("addSponsor")}
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  px-10 pb-[443px] bg-[url('../src/assets/images/png/sponsor-single-bg.png')] bg-no-repeat bg-bottom">
        <div className="my-10 bg-white w-[793px] mx-auto rounded-xl p-8">
          <div className="flex justify-between items-center mb-[26px]">
            <h1 className="text-[#28293D] font-SfProDisplay text-2xl font-bold">
              {t("aboutStudent")}
            </h1>
            <button className="flex justify-center items-center gap-[10px] px-8 h-11 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-semibold tracking-[1px] rounded-md">
              <img src={editIcon} alt="Edit Icon" /> {t("edit")}
            </button>
          </div>
          <div className="flex items-center">
            <span className="px-3 py-0.5 bg-[#E5EBFF] uppercase tracking-[1.13px] text-xs font-SfProDisplay font-medium text-[#3366FF]">
              {t("mainInfo")}
            </span>
            <hr className="flex-1 bg-[#E4E8F0]" />
          </div>
          <div className="mt-8 flex gap-5 items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-[#E0E7FF] rounded-md">
              <img src={sponsorIcon} alt="Sponsor Icon" />
            </div>
            <h2 className="max-w-40 font-SfProDisplay text-[#212121] font-semibold text-[16px] tracking-[-1%]">
              {studentDetails.full_name}
            </h2>
          </div>
          <div className="flex gap-56">
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("phoneNumber")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {studentDetails.phone}
              </h3>
            </div>
          </div>
          <div className="flex items-center mt-8">
            <span className="px-3 py-0.5 bg-[#E5EBFF] uppercase tracking-[1.13px] text-xs font-SfProDisplay font-medium text-[#3366FF]">
              {t("infoAboutOTM")}
            </span>
            <hr className="flex-1 bg-[#E4E8F0]" />
          </div>
          <div className="flex gap-10">
            <div className="mt-6 w-[349px]">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("otm")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {studentDetails?.institute?.name}
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("StudentType")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {studentDetails.type === 1
                  ? t("bachelor")
                  : studentDetails.type === 2
                  ? t("masterDegree")
                  : studentDetails.type === 3
                  ? "phd"
                  : null}
              </h3>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mt-6">
              <p className="text-[#B5B5C3] w-[350px] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("AllocatedAmount")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {formatNumberWithSpaces(studentDetails.given)} UZS
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("ContractAmount")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {formatNumberWithSpaces(studentDetails.contract)} UZS
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white w-[793px] mx-auto rounded-xl p-8 h-[90px] flex justify-between items-center">
          <h2 className="text-[#28293D] font-SfProDisplay text-2xl font-bold">
            {t("StudentSponsors")}
          </h2>
          <button className="px-8 py-2 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-medium rounded-md my-7 flex items-center gap-[10px]">
            <i className="icon-plus text-2xl"></i>
            {t("addSponsor")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
