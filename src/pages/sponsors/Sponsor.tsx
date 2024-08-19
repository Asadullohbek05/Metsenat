import { Link, useNavigate, useParams } from "react-router-dom";
import adminLogo from "../../assets/images/svg/admin-page-logo.svg";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import sponsorIcon from "../../assets/images/svg/sponsor-icon.svg";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../components/Dropdown";
import { formatSum, logOut } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { SponsorDetails } from "../../types/sponsor";
import {
  fetchSponsorData,
  updateSponsorData,
} from "../../redux/singleSponsorSlice";
import Button from "../../components/Button/Button";
import FormGroup from "../../components/Form/FormGroup";
import FormInput from "../../components/Form/FormInput";

const SingleSponsor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sponsorSum, setSponsorSum] = useState("");
  const [firm, setFirm] = useState("");

  // Translate
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Auth
  const { setIsAuthenticated } = useContext(AuthContext) || {
    setIsAuthenticated: () => {},
  };

  // Fetch SponsorDetails
  const dispatch = useDispatch<AppDispatch>();
  const { sponsorDetails, status } = useSelector(
    (state: RootState) => state.sponsorDetails
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSponsorData(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (sponsorDetails) {
      setFullName(sponsorDetails.full_name);
      setPhoneNumber(sponsorDetails.phone);
      setSponsorSum(sponsorDetails.sum);
      setFirm(sponsorDetails.firm || "");
    }
  }, [sponsorDetails]);

  const editSponsor = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
    modal.showModal();
  };

  const handleSubmit = async () => {
    const updatedSponsor: Partial<SponsorDetails> = {
      full_name: fullName,
      phone: phoneNumber,
      sum: sponsorSum,
      firm: firm,
    };

    try {
      await dispatch(
        updateSponsorData({ id: Number(id), updatedSponsor })
      ).unwrap();
      toast.success("Sponsor Updated Successfully");
    } catch (err) {
      console.error("Error updating sponsor:", err);
    }
  };

  const handleTab = (tab: string) => {
    setIsVisible(tab === "yuridik");
  };

  if (status === "loading" || !sponsorDetails) {
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
        <div className="h-20 max-w-7xl mx-auto py-4 px-10 flex items-center">
          <Link className="flex items-center" to="/sponsors">
            <i className="icon-arrow-big-left text-[28px]"></i>
          </Link>
          <h3 className="text-[#28293D] font-SfProDisplay font-bold text-2xl ml-4 mr-3">
            {sponsorDetails?.full_name}
          </h3>
          <span
            className={`${
              sponsorDetails?.get_status_display === "Yangi"
                ? "text-[#5BABF2] bg-[#4C6FFF1A]"
                : sponsorDetails?.get_status_display === "Moderatsiyada"
                ? "text-[#FFA445] bg-[#EDC7001A]"
                : sponsorDetails?.get_status_display === "Tasdiqlangan"
                ? "text-[#00CF83] bg-[#ED72001A]"
                : ""
            } flex items-center justify-center font-normal w-24 h-6 bg-[#DDFFF2] rounded-md text-xs`}
          >
            {sponsorDetails?.get_status_display || ""}
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  px-10 h-screen bg-[url('../src/assets/images/png/sponsor-single-bg.png')] bg-no-repeat bg-bottom">
        <div className="mt-10 bg-white w-[793px] mx-auto rounded-xl p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-[#28293D] font-SfProDisplay text-2xl font-bold">
              {t("aboutSponsor")}
            </h1>
            <Button
              variant="secondary"
              iconLeft={true}
              icon="icon-edit text-2xl"
              text={t("edit")}
              customClass="h-[42px] px-8 gap-[10px]"
              onClick={editSponsor}
            />
          </div>
          <div className="mt-8 flex gap-5 items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-[#E0E7FF] rounded-md">
              <img src={sponsorIcon} alt="Sponsor Icon" />
            </div>
            <h2 className="max-w-40 text-[#212121] font-medium text-[16px] tracking-[-1%] leading-5">
              {sponsorDetails?.full_name}
            </h2>
          </div>
          <div className="flex gap-56">
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-medium  tracking-[1.13px] text-xs">
                {t("phoneNumber")}
              </p>
              <h3 className="text-[#212121] text-[16px] font-medium mt-3">
                {sponsorDetails?.phone}
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-medium tracking-[1.13px] text-xs">
                {t("SponsorshipAmount")}
              </p>
              <h3 className="text-[#212121]  text-[16px] font-medium mt-3">
                {sponsorDetails ? formatSum(sponsorDetails.sum) : ""} UZS
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Edit Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn text-[#B2B7C1]  btn-md btn-circle  btn-ghost absolute right-3 top-3">
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-[#28293D] font-SfProDisplay font-bold text-2xl">
              {t("edit")}
            </h3>
            <hr className="h-0.5 bg-[#F5F5F7] border-none mt-7" />
            <div className="mt-7 mb-8">
              <button
                onClick={() => handleTab("jismoniy")}
                type="button"
                className={`text-xs uppercase font-medium  tracking-[1.13px] border-2 rounded-l-md w-1/2 h-10 ${
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
                className={`text-xs uppercase font-medium tracking-[1.13px] border-2 rounded-r-md w-1/2 h-10 ${
                  isVisible
                    ? "border-[#3365FC] bg-[#3365FC] text-white"
                    : "border-[#E5E9FF] text-[#3366FF99]"
                }`}
              >
                {t("LegalEntity")}
              </button>
            </div>
            <FormGroup id="fullName" label={t("fullName")}>
              <FormInput
                inputClass="w-full"
                id="fullName"
                type="text"
                placeholder=""
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                parentClass="mb-7"
                before=""
              />
            </FormGroup>
            <FormGroup id="phoneNumber" label={t("phoneNumber")}>
              <FormInput
                inputClass="w-full"
                id="fullName"
                type="text"
                placeholder=""
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                parentClass="mb-7"
                before=""
              />
            </FormGroup>
            <FormGroup id="SponsorshipAmount" label={t("SponsorshipAmount")}>
              <FormInput
                inputClass="w-full"
                id="sponsorShipAmount"
                type="text"
                placeholder=""
                value={sponsorSum}
                onChange={(e) => setSponsorSum(e.target.value)}
                parentClass="mb-7"
                before=""
              />
            </FormGroup>
            {isVisible && (
              <FormGroup id="firm" label={t("NameOrganization")}>
                <FormInput
                  inputClass="w-full"
                  id="firm"
                  type="text"
                  placeholder=""
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  parentClass="mb-7"
                  before=""
                />
              </FormGroup>
            )}
            <hr className="h-0.5 bg-[#F5F5F7] border-none mb-7" />

            <div className="flex justify-end">
              <Button
                variant="primary"
                text={t("Save")}
                iconLeft={true}
                icon="icon-save text-2xl"
                customClass="gap-[10px] h-[42px] px-8"
                type="button"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SingleSponsor;
