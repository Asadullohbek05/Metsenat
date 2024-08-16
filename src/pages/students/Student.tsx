import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../components/Dropdown";

import arrow from "../../assets/images/svg/arrow-left.svg";
import logo from "../../assets/images/svg/admin-page-logo.svg";
import editIcon from "../../assets/images/svg/edit-icon.svg";
import sponsorIcon from "../../assets/images/svg/sponsor-icon.svg";
import request from "../../server/request";
import { formatNumberWithSpaces } from "../../utils";
import StudentSponsorCard from "../../components/Cards/StudentSponsorCard";

interface Institute {
  name: string;
  id: number;
}
interface StudentDetails {
  full_name: string;
  phone: string;
  institute?: Institute;
  type?: number;
  given: number;
  contract: number;
}
interface StudentSponsors {
  full_name: string;
  phone: string;
  institute?: Institute;
  type?: number;
  given: number;
  contract: number;
  length: number;
  id: number;
  sponsor: {
    full_name: string;
  };
  summa: number;
}

const SingleStudent = () => {
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(
    null
  );
  const [studentSponsors, setStudentSponsors] = useState<StudentSponsors[]>([]);

  const [refresh, SetRefresh] = useState(true);

  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otm, setOtm] = useState<number | null>(null);
  const [contract, setContract] = useState("");

  const [error, setError] = useState<string | null>(null);

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
        setFullName(data.full_name);
        setPhoneNumber(data.phone);
        setOtm(data.institute.id);
        setContract(data.contract);
      } catch (err) {
        setError("Failed to fetch student details.");
        console.log(err);
      }
    };
    getStudentDetails();
  }, [id, refresh]);

  useEffect(() => {
    const getStudentSponsors = async () => {
      try {
        const { data } = await request.get(`/student-sponsor/${id}/`);
        setStudentSponsors(data.sponsors);
      } catch (err) {
        setError("Failed to fetch student Sponsors.");
        console.log(err);
      }
    };
    const getInstitutes = async () => {
      try {
        const { data } = await request.get<Institute[]>("/institute-list/");
        setInstitutes(data);
      } catch (err) {
        console.log(err);
      }
    };

    getStudentSponsors();
    getInstitutes();
  }, [id]);

  const modal = document.getElementById("my_modal_1") as HTMLDialogElement;

  const editStudent = () => {
    modal.showModal();
  };

  const addSponsor = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.showModal();
  };

  const handleEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedStudent = {
      contract: Number(contract),
      full_name: fullName,
      institute: otm,
      phone: phoneNumber,
    };

    try {
      await request.put(`/student-update/${id}/`, updatedStudent);
      modal.close();
      SetRefresh(!refresh);
      toast.success("Student Updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add student.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

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
              {studentDetails?.full_name}
            </h3>
          </div>
          <button
            onClick={addSponsor}
            className="px-8 py-2 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-medium rounded-md my-7 flex items-center gap-[10px]"
          >
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
            <button
              onClick={editStudent}
              className="flex justify-center items-center gap-[10px] px-8 h-11 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-semibold tracking-[1px] rounded-md"
            >
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
              {studentDetails?.full_name}
            </h2>
          </div>
          <div className="flex gap-56">
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("phoneNumber")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {studentDetails?.phone}
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
                {studentDetails?.type === 1
                  ? t("bachelor")
                  : studentDetails?.type === 2
                  ? t("masterDegree")
                  : studentDetails?.type === 3
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
                {formatNumberWithSpaces(studentDetails?.given || 0)} UZS
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                {t("ContractAmount")}
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {formatNumberWithSpaces(studentDetails?.contract || 0)} UZS
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white w-[793px] mx-auto rounded-xl px-8 py-6">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-[#28293D] font-SfProDisplay text-2xl font-bold">
              {t("StudentSponsors")}
            </h2>
            <button
              onClick={addSponsor}
              className="px-8 py-2 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-medium rounded-md  flex items-center gap-[10px]"
            >
              <i className="icon-plus text-2xl"></i>
              {t("addSponsor")}
            </button>
          </div>
          {studentSponsors?.length !== 0 ? (
            <div className="flex items-center mt-[26px] mb-3">
              <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-4">
                #
              </span>
              <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-8">
                f.i.sh
              </span>
              <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs w-[200px] ml-[300px] text-center">
                {t("AllocatedAmount")}
              </span>
              <span className="font-SfProDisplay tracking-[1.13px] text-[#B1B1B8] font-medium uppercase text-xs ml-8">
                {t("Actions")}
              </span>
            </div>
          ) : null}
          {studentSponsors?.map((item, i: number) => {
            return <StudentSponsorCard order={i + 1} key={i} sponsor={item} />;
          })}
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleEditStudent}>
            <button
              type="button"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_1"
                ) as HTMLDialogElement;
                modal.close();
              }}
              className="btn text-[#B2B7C1] hover:text-black btn-md btn-circle text-2xl btn-ghost absolute right-3 top-3"
            >
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-[#28293D] font-SfProDisplay text-2xl">
              {t("edit")}
            </h3>
            <hr className="h-0.5 bg-[#F5F5F7] border-none my-7" />
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("fullName")}
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                id="fullName"
                className="border bg-[#E0E7FF33] pl-4 outline-none border-[#E0E7FF] rounded-md w-full h-12 mt-2"
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                id="phoneNumber"
                className="border pl-4 outline-none border-[#E0E7FF] bg-[#E0E7FF33] rounded-md w-full h-12 mt-2"
              />
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label
                htmlFor="otm"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("otm")}
              </label>
              <select
                required
                value={otm || "default"}
                onChange={(e) => setOtm(parseInt(e.target.value))}
                className="select select-md bg-[#E0E7FF33]  text-[#1D1D1F] font-SfProDisplay border border-[#DFE3E8]"
              >
                <option disabled value="default">
                  {t("chooseOtm")}
                </option>
                {institutes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="contract"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("ContractAmount")}
              </label>
              <input
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                type="text"
                id="contract"
                className="border pl-4 outline-none border-[#E0E7FF] bg-[#E0E7FF33] rounded-md w-full h-12 mt-2"
              />
            </div>
            <hr className="h-0.5 bg-[#F5F5F7] border-none" />

            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="flex items-center  gap-[10px] justify-center w-36 h-11 bg-[#3365FC] text-white font-SfProDisplay text-[14px] font-semibold tracking-[1px] rounded-md"
              >
                <i className="icon-save text-2xl"></i>
                {t("Save")}
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_2"
                ) as HTMLDialogElement;
                modal.close();
              }}
              className="btn text-[#B2B7C1]  btn-md btn-circle  btn-ghost absolute right-3 top-3"
            >
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-[#28293D] font-SfProDisplay text-2xl">
              Tahrirlash
            </h3>
            <hr className="h-0.5 bg-[#F5F5F7] border-none mt-7" />
            <h1>Second Modal</h1>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SingleStudent;
