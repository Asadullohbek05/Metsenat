import { Link, useNavigate } from "react-router-dom";
import LanguageDropdown from "../components/Dropdown";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import arrow from "../assets/images/svg/arrow-left.svg";
import logo from "../assets/images/svg/admin-page-logo.svg";
import request from "../server/request";

interface Institute {
  id: number;
  name: string;
}

const AddStudentPage = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otm, setOtm] = useState<number | null>(null);
  const [studentType, setStudentType] = useState("");
  const [contract, setContract] = useState("");

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

  const getInstitutes = async () => {
    try {
      const { data } = await request.get<Institute[]>("/institute-list/");
      setInstitutes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInstitutes();
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStudent = {
      contract: Number(contract),
      full_name: fullName,
      institute: otm,
      phone: "+998" + phoneNumber,
      type: studentType,
    };

    try {
      await request.post("/student-create/", newStudent);
      navigate("/students");
      toast.success("Student added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add student.");
    }
  };

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
        <div className="h-20 max-w-7xl mx-auto py-4 px-10 flex items-center">
          <Link to="/students">
            <img src={arrow} alt="Back" />
          </Link>
          <h1 className="text-[#28293D] font-SfProDisplay font-bold text-2xl ml-4 mr-3">
            {t("addStudent")}
          </h1>
        </div>
      </div>
      <div className="h-screen">
        <form
          onSubmit={handleAddStudent}
          className="bg-white h-auto w-[790px] mt-10 mx-auto border-1 rounded-xl border-[#EBEEFC] shadow-[0_5px_40px_0_#00000008] p-7"
        >
          <div className="flex items-center justify-between mb-7">
            <div className="w-[353px]">
              <label
                htmlFor="fullName"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("fullName")}
              </label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                id="fullName"
                placeholder="Abdullayev Abdulla Abdulla o'g'li"
                className="border pl-4 font-SfProDisplay font-normal outline-none border-[#E0E7FF] bg-[#E0E7FF33] rounded-md w-full h-12 mt-2"
              />
            </div>
            <div className="w-[353px]">
              <label
                htmlFor="number"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("phoneNumber")}
              </label>

              <div className="border flex items-center  text-[#2E384D] pl-4 outline-none border-[#E0E7FF] bg-[#E0E7FF33] rounded-md w-full h-12 mt-2">
                <label
                  htmlFor="number"
                  className="text-[16px] font-SfProDisplay font-medium"
                >
                  +998
                </label>
                <input
                  required
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={12}
                  id="number"
                  placeholder="00 000-00-00"
                  className="pl-1 outline-none font-SfProDisplay  bg-transparent rounded-md w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-7">
            <label
              htmlFor="otm"
              className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
            >
              OTM
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
          <div className="flex items-center justify-between mb-7">
            <div className="w-[353px] flex flex-col">
              <label
                htmlFor="studentType"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px] my-2"
              >
                {t("StudentType")}
              </label>
              <select
                required
                value={studentType}
                onChange={(e) => setStudentType(e.target.value)}
                className="select select-md bg-[#E0E7FF33]  text-[#1D1D1F] font-SfProDisplay border border-[#DFE3E8]"
              >
                <option value="All">{t("all")}</option>
                <option value="1">{t("bachelor")}</option>
                <option value="2">{t("masterDegree")}</option>
                <option value="3">{t("phd")}</option>
              </select>
            </div>
            <div className="w-[353px]">
              <label
                htmlFor="contract_sum"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                {t("ContractAmount")}
              </label>

              <input
                required
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                type="text"
                id="contract_sum"
                placeholder={t("enterAmount")}
                className="border pl-4 font-SfProDisplay outline-none border-[#E0E7FF] bg-[#E0E7FF33] rounded-md w-full h-12 mt-2"
              />
            </div>
          </div>
          <hr className="h-0.5 bg-[#F5F5F7] border-none mb-7" />
          <div className="flex justify-end items-center">
            <button className="bg-[#3366FF] flex items-center gap-[10px] px-8 py-[9px] rounded-md text-white">
              <i className="icon-plus text-2xl"></i>
              {t("add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPage;
