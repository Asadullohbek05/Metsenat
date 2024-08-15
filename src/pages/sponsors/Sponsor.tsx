import { Link, useNavigate, useParams } from "react-router-dom";
import adminLogo from "../../assets/images/svg/admin-page-logo.svg";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import arrow from "../../assets/images/svg/arrow-left.svg";
import sponsorIcon from "../../assets/images/svg/sponsor-icon.svg";
import saveIcon from "../../assets/images/svg/save-icon.svg";
import request from "../../server/request";
import formatNumberWithSpaces from "../../utils";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../components/Dropdown";

interface SponsorData {
  id: string;
  full_name: string;
  phone: string;
  sum: string;
  firm?: string;
  get_status_display: string;
}

const SingleSponsor: React.FC = () => {
  const [singleSponsorData, setSingleSponsorData] =
    useState<SponsorData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sponsorSum, setSponsorSum] = useState("");
  const [firm, setFirm] = useState("");

  const { t, i18n } = useTranslation();
  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { setIsAuthenticated } = useContext(AuthContext) || {
    setIsAuthenticated: () => {},
  };
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      try {
        const { data } = await request.get<SponsorData>(
          `/sponsor-detail/${id}`
        );
        setFullName(data.full_name);
        setPhoneNumber(data.phone);
        setSponsorSum(data.sum);
        setFirm(data.firm || "");
        setSingleSponsorData(data);
      } catch (err) {
        console.error("Error fetching sponsor data:", err);
      }
    };

    getData();
  }, [id, refresh]);

  const logOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.info("Logged Out Successfully");
    navigate("/");
  };

  const editSponsor = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal.showModal();
  };

  const handleSubmit = async () => {
    const updatedSponsor = {
      full_name: fullName,
      phone: phoneNumber,
      sum: sponsorSum,
      firm: firm,
    };
    try {
      await request.put(`/sponsor-update/${id}/`, updatedSponsor);
      setRefresh(!refresh);
      toast.success("Sponsor Updated Successfully");
    } catch (err) {
      console.error("Error updating sponsor:", err);
    }
  };

  const handleTab = (tab: string) => {
    setIsVisible(tab === "yuridik");
  };

  const formatSum = (sum: string | number): string => {
    const sumStr = typeof sum === "number" ? sum.toString() : sum;
    const num = parseFloat(sumStr.replace(/,/g, ""));
    return isNaN(num) ? sumStr : formatNumberWithSpaces(num);
  };

  if (!singleSponsorData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="bg-white">
        <div className="shadow-[0_35px_40px_0px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto py-4 px-10 flex justify-between items-center">
            <Link to="/">
              <img src={adminLogo} alt="Logo" />
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
        <div className="h-20 max-w-7xl mx-auto py-4 px-10 flex items-center">
          <Link to="/sponsors">
            <img src={arrow} alt="Back" />
          </Link>
          <h3 className="text-[#28293D] font-SfProDisplay font-bold text-2xl ml-4 mr-3">
            {singleSponsorData?.full_name || "Loading..."}
          </h3>
          <span
            className={`${
              singleSponsorData?.get_status_display === "Yangi"
                ? "text-[#5BABF2]"
                : singleSponsorData?.get_status_display === "Moderatsiyada"
                ? "text-[#FFA445]"
                : singleSponsorData?.get_status_display === "Tasdiqlangan"
                ? "text-[#00CF83]"
                : ""
            } flex items-center justify-center font-normal font-SfProDisplay w-24 h-6 bg-[#DDFFF2] rounded-md text-xs`}
          >
            {singleSponsorData?.get_status_display || ""}
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  px-10 h-screen bg-[url('../src/assets/images/png/sponsor-single-bg.png')] bg-no-repeat bg-bottom">
        <div className="mt-10 bg-white w-[793px] mx-auto rounded-xl p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-[#28293D] font-SfProDisplay text-2xl font-bold">
              {t("aboutSponsor")}
            </h1>
            <button
              onClick={editSponsor}
              className="flex justify-center items-center gap-[10px] px-8 h-11 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-semibold tracking-[1px] rounded-md"
            >
              <i className="icon-edit text-2xl"></i>
              {t("edit")}
            </button>
          </div>
          <div className="mt-8 flex gap-5 items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-[#E0E7FF] rounded-md">
              <img src={sponsorIcon} alt="Sponsor Icon" />
            </div>
            <h2 className="max-w-40 font-SfProDisplay text-[#212121] font-semibold text-[16px] tracking-[-1%]">
              {singleSponsorData?.full_name || ""}
            </h2>
          </div>
          <div className="flex gap-56">
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("phoneNumber")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {singleSponsorData?.phone || ""}
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("SponsorshipAmount")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {singleSponsorData ? formatSum(singleSponsorData.sum) : ""} UZS
              </h3>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn text-[#B2B7C1]  btn-md btn-circle  btn-ghost absolute right-3 top-3">
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-[#28293D] font-SfProDisplay text-2xl">
              {t("edit")}
            </h3>
            <hr className="h-0.5 bg-[#F5F5F7] border-none mt-7" />
            <div className="mt-7 mb-8">
              <button
                onClick={() => handleTab("jismoniy")}
                type="button"
                className={`text-xs uppercase font-SfProDisplay tracking-[1.13px] border-2 rounded-l-md w-1/2 h-10 ${
                  !isVisible
                    ? "border-[#3365FC] bg-[#3365FC] text-white"
                    : "border-[#E5E9FF] text-[#3366FF99]"
                }`}
              >
                {t("physicalPerson")}
              </button>
              <button
                onClick={() => handleTab("yuridik")}
                type="button"
                className={`text-xs uppercase font-SfProDisplay tracking-[1.13px] border-2 rounded-r-md w-1/2 h-10 ${
                  isVisible
                    ? "border-[#3365FC] bg-[#3365FC] text-white"
                    : "border-[#E5E9FF] text-[#3366FF99]"
                }`}
              >
                {t("LegalEntity")}
              </button>
            </div>
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("fullName")}
              </label>
              <input
                type="text"
                id="fullName"
                className="border pl-4 outline-none border-[#E0E7FF] rounded-md w-full h-12 mt-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("phoneNumber")}
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="border pl-4 outline-none border-[#E0E7FF] rounded-md w-full h-12 mt-2"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="sponsorSum"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("SponsorshipAmount")}
              </label>
              <input
                type="text"
                id="sponsorSum"
                className="border pl-4 outline-none border-[#E0E7FF] rounded-md w-full h-12 mt-2"
                value={sponsorSum}
                onChange={(e) => setSponsorSum(e.target.value)}
              />
            </div>
            {isVisible && (
              <div className="mb-6">
                <label
                  htmlFor="firm"
                  className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
                >
                  {t("NameOrganization")}
                </label>
                <input
                  type="text"
                  id="firm"
                  className="border pl-4 outline-none border-[#E0E7FF] rounded-md w-full h-12 mt-2"
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                />
              </div>
            )}
            <div className="flex justify-end mt-10">
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex items-center  gap-[10px] justify-center w-36 h-11 bg-[#3365FC] text-white font-SfProDisplay text-[14px] font-semibold tracking-[1px] rounded-md"
              >
                <img src={saveIcon} alt="Save Icon" /> {t("Save")}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SingleSponsor;
