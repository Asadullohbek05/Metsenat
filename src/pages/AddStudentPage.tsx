import { Link, useNavigate } from "react-router-dom";
import LanguageDropdown from "../components/Dropdown";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import request from "../server/request";
import Button from "../components/Base/Button";
import { logOut } from "../utils";
import arrow from "../assets/images/svg/arrow-left.svg";
import logo from "../assets/images/svg/admin-page-logo.svg";
import FormGroup from "../components/Form/FormGroup";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import Hr from "../components/Base/Hr";

const AddStudentPage = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otm, setOtm] = useState<number | null>(null);
  const [studentType, setStudentType] = useState("");
  const [contract, setContract] = useState("");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext) || {
    setIsAuthenticated: () => {},
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add Student
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
          <div className="max-w-7xl mx-auto py-3 px-10 flex justify-between items-center">
            <Link to={"/"}>
              <img src={logo} className="h-6" alt="Logo image" />
            </Link>
            <div className="flex gap-10 items-center">
              <LanguageDropdown />
              <div className="flex gap-6 justify-between items-center bg-whiteSecondary p-1 rounded">
                <span className="ml-5 font-SfProText text-[13px] font-bold text-blackPrimary tracking-[-0.35px] leading-[19.5px]">
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
          <Link to="/students">
            <img src={arrow} alt="Back" />
          </Link>
          <h1 className="text-blackPrimary font-SfProDisplay font-bold text-2xl ml-4 mr-3">
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
            <FormGroup
              id="fullName"
              label={t("fullName")}
              parentClass="w-[353px]"
            >
              <FormInput
                id="fullName"
                type="text"
                placeholder="Abdullayev Abdulla Abdulla o'g'li"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                inputClass="w-full"
                before=""
              />
            </FormGroup>
            <FormGroup
              id="phoneNumber"
              label={t("phoneNumber")}
              parentClass="w-[353px]"
            >
              <FormInput
                id="phoneNumber"
                inputClass="w-full pl-14 text-[#2E384D] font-normal"
                placeholder="00 000-00-00"
                type="text"
                value={phoneNumber}
                before="+998"
                parentClass="relative"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormGroup>
          </div>
          {/* Intitutes Select */}
          <FormGroup id="otm" label={t("OTM")} parentClass="mb-7">
            <FormSelect
              id="institutes"
              onChange={(e) => setOtm(parseInt(e.target.value))}
              value={otm || "default"}
              fetchOptionsUrl="/institute-list/"
              selectClass="select select-sm h-[44px] bg-brownPrimary  text-blackThird font-normal border border-[#DFE3E8]"
            />
          </FormGroup>
          <div className="flex items-center justify-between mb-7">
            <div className="w-[353px] flex flex-col">
              <label
                htmlFor="studentType"
                className="text-blackThird text-xs  uppercase  tracking-[1.13px] mb-2"
              >
                {t("StudentType")}
              </label>
              <select
                required
                value={studentType}
                onChange={(e) => setStudentType(e.target.value)}
                className="select select-sm bg-brownPrimary h-[44px] font-normal  text-blackThird border border-[#DFE3E8]"
              >
                <option className="font-normal" value="All">
                  {t("all")}
                </option>
                <option className="font-normal" value="1">
                  {t("bachelor")}
                </option>
                <option className="font-normal" value="2">
                  {t("masterDegree")}
                </option>
                <option className="font-normal" value="3">
                  {t("phd")}
                </option>
              </select>
            </div>
            <FormGroup
              id="contract"
              label={t("ContractAmount")}
              parentClass="w-[353px]"
            >
              <FormInput
                id="contract"
                type="text"
                placeholder="Summani kiriting"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                inputClass="w-full"
                before=""
              />
            </FormGroup>
          </div>
          <Hr margin="mb-7" />
          <div className="flex justify-end items-center">
            <Button
              variant="primary"
              text={t("add")}
              iconLeft={true}
              icon="icon-plus text-2xl"
              type="submit"
              customClass="h-[42px] px-8 gap-[10px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPage;
