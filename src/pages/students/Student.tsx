import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { formatNumberWithSpaces, logOut } from "../../utils";
import StudentSponsorCard from "../../components/Cards/StudentSponsorCard";
import LanguageDropdown from "../../components/Sections/Dropdown";
import request from "../../server/request";
import sponsorIcon from "../../assets/images/svg/sponsor-icon.svg";
import logo from "../../assets/images/svg/admin-page-logo.svg";
import Button from "../../components/Base/Button";
import Loading from "../../components/Sections/Loading";
import FormGroup from "../../components/Form/FormGroup";
import FormInput from "../../components/Form/FormInput";
import FormSelect from "../../components/Form/FormSelect";
import { StudentDetails, StudentSponsors } from "../../types/student";
import Hr from "../../components/Base/Hr";

const SingleStudent = () => {
  // States
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(
    null
  );
  const [studentSponsors, setStudentSponsors] = useState<StudentSponsors[]>([]);
  const [refresh, SetRefresh] = useState(true);
  const [allocatedAmount, setAllocatedAmount] = useState("");

  // User Edit Data
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otm, setOtm] = useState<number | null>(null);
  const [contract, setContract] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Translate
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Auth
  const { setIsAuthenticated } = useContext(AuthContext) || {
    setIsAuthenticated: () => {},
  };

  // Fetch Student Details and Sponsors
  useEffect(() => {
    window.scrollTo(0, 0);
    const getStudentDetails = async () => {
      try {
        const { data } = await request.get(`/student-detail/${id}`);
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

    const getStudentSponsors = async () => {
      try {
        const { data } = await request.get(`/student-sponsor/${id}/`);
        setStudentSponsors(data.sponsors);
      } catch (err) {
        setError("Failed to fetch student Sponsors.");
        console.log(err);
      }
    };
    getStudentDetails();
    getStudentSponsors();
  }, [id, refresh]);

  const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
  const editStudent = () => {
    modal.showModal();
  };

  // Edit Sponsor
  const editSponsor = () => {
    const sponsorModal = document.getElementById(
      "my_modal_3"
    ) as HTMLDialogElement;
    sponsorModal.showModal();
  };

  // Add Sponsor
  const addSponsor = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.showModal();
  };

  // Edit Student
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

  // Handle Errors
  if (error) {
    console.log(error);
  }

  // Loading
  if (!studentDetails) {
    return <Loading />;
  }

  return (
    <div>
      {/* Navbar */}
      <div className="bg-white">
        <div className="shadow-[0_35px_40px_0px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto py-3 px-10 flex justify-between items-center">
            <Link to={"/"}>
              <img src={logo} className="h-6" alt="Logo image" />
            </Link>
            <div className="flex gap-10 items-center">
              <LanguageDropdown />
              <div className="flex gap-6 justify-between items-center bg-[#F1F1F3] p-1 rounded">
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
        <div className="h-20 max-w-7xl mx-auto py-4 px-10 flex justify-between  items-center">
          <div className="flex items-center">
            <Link to="/students" className="flex items-center">
              <i className="icon-arrow-big-left text-[28px]"></i>
            </Link>
            <h3 className="text-blackPrimary font-SfProDisplay font-bold text-2xl ml-4">
              {studentDetails?.full_name}
            </h3>
          </div>
          <Button
            variant="secondary"
            text={t("addSponsor")}
            customClass="h-[42px] px-8 gap-[10px]"
            iconLeft={true}
            icon="icon-plus text-2xl"
            type="button"
            onClick={addSponsor}
          />
        </div>
      </div>
      {/* Student Header */}
      <div className="max-w-7xl mx-auto  px-10 pb-[443px] bg-[url('../src/assets/images/png/sponsor-single-bg.png')] bg-no-repeat bg-bottom">
        <div className="my-10 bg-white w-[793px] mx-auto rounded-xl p-8">
          <div className="flex justify-between items-center mb-[26px]">
            <h1 className="text-blackPrimary font-SfProDisplay text-2xl font-bold">
              {t("aboutStudent")}
            </h1>
            <Button
              variant="secondary"
              text={t("edit")}
              customClass="h-[42px] px-8 gap-[10px]"
              iconLeft={true}
              icon="icon-edit text-2xl"
              onClick={editStudent}
            />
          </div>
          <div className="flex items-center">
            <span className="px-3 py-0.5 bg-[#E5EBFF] uppercase tracking-[1.13px] text-xs font-medium text-blueSecondary">
              {t("mainInfo")}
            </span>
            <hr className="flex-1 bg-[#E4E8F0]" />
          </div>
          <div className="mt-8 flex gap-5 items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-grayPrimary rounded-md">
              <img src={sponsorIcon} alt="Sponsor Icon" />
            </div>
            <h2 className="max-w-40 text-blackSecondary font-medium text-[16px] tracking-[-1%]">
              {studentDetails?.full_name}
            </h2>
          </div>
          <div className="flex gap-56">
            <div className="mt-6">
              <p className="text-grayThird uppercase font-medium tracking-[1.13px] text-xs">
                {t("phoneNumber")}
              </p>
              <h3 className="text-blackSecondary  text-[16px] font-medium mt-2">
                {studentDetails?.phone}
              </h3>
            </div>
          </div>
          <div className="flex items-center mt-8">
            <span className="px-3 py-0.5 bg-[#E5EBFF] uppercase tracking-[1.13px] text-xs font-medium text-blueSecondary">
              {t("infoAboutOTM")}
            </span>
            <hr className="flex-1 bg-[#E4E8F0]" />
          </div>
          <div className="flex gap-10">
            <div className="mt-6 w-[349px]">
              <p className="text-grayThird uppercase  tracking-[1.13px] text-xs">
                {t("otm")}
              </p>
              <h3 className="text-blackSecondary  text-[16px] font-medium mt-3">
                {studentDetails?.institute?.name}
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-grayThird uppercase  tracking-[1.13px] text-xs">
                {t("StudentType")}
              </p>
              <h3 className="text-blackSecondary  text-[16px] font-medium mt-3">
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
              <p className="text-grayThird w-[350px] uppercase  tracking-[1.13px] text-xs">
                {t("AllocatedAmount")}
              </p>
              <h3 className="text-blackSecondary  text-[16px] font-medium mt-3">
                {formatNumberWithSpaces(studentDetails?.given || 0)} UZS
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-grayThird uppercase  tracking-[1.13px] text-xs">
                {t("ContractAmount")}
              </p>
              <h3 className="text-blackSecondary  text-[16px] font-medium mt-3">
                {formatNumberWithSpaces(studentDetails?.contract || 0)} UZS
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white w-[793px] mx-auto rounded-xl px-8 py-6">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-blackPrimary font-SfProDisplay text-2xl font-bold">
              {t("StudentSponsors")}
            </h2>
            <Button
              variant="secondary"
              text={t("addSponsor")}
              customClass="h-[42px] px-8 gap-[10px]"
              iconLeft={true}
              icon="icon-plus text-2xl"
              type="button"
              onClick={addSponsor}
            />
          </div>
          {/* Student Sponsors */}
          {studentSponsors?.length !== 0 ? (
            <div className="flex items-center mt-[26px] mb-3">
              <span className="tracking-[1.13px] text-graySecondary font-medium uppercase text-xs ml-4">
                #
              </span>
              <span className="tracking-[1.13px] text-graySecondary font-medium uppercase text-xs ml-8">
                f.i.sh
              </span>
              <span className="tracking-[1.13px] text-graySecondary font-medium uppercase text-xs w-[200px] ml-[300px] text-center">
                {t("AllocatedAmount")}
              </span>
              <span className="tracking-[1.13px] text-graySecondary font-medium uppercase text-xs ml-8">
                {t("Actions")}
              </span>
            </div>
          ) : null}
          {studentSponsors?.map((item, i: number) => {
            return (
              <StudentSponsorCard
                editSponsor={editSponsor}
                order={i + 1}
                key={i}
                sponsor={item}
              />
            );
          })}
        </div>
      </div>
      {/* Edit Student */}
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
              className="btn text-pinkPrimary hover:text-black btn-md btn-circle text-2xl btn-ghost absolute right-3 top-3"
            >
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-blackPrimary font-SfProDisplay font-bold text-2xl">
              {t("edit")}
            </h3>
            <Hr margin="my-7" />
            <FormGroup id="fullName" label={t("fullName")} parentClass="mb-7">
              <FormInput
                id="fullName"
                type="text"
                inputClass="w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                before=""
                placeholder=""
              />
            </FormGroup>
            <FormGroup
              id="phoneNumber"
              label={t("phoneNumber")}
              parentClass="mb-7"
            >
              <FormInput
                id="phoneNumber"
                type="text"
                inputClass="w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                before=""
                placeholder=""
              />
            </FormGroup>
            <FormGroup id="otm" label={t("otm")} parentClass="mb-7">
              <FormSelect
                id="intitutes"
                onChange={(e) => setOtm(parseInt(e.target.value))}
                value={otm || "default"}
                selectClass="select select-sm bg-brownPrimary h-[45px] text-blackThird font-normal border border-[#DFE3E8]"
                fetchOptionsUrl="/institute-list/"
              />
            </FormGroup>
            <FormGroup
              id="contract"
              label={t("ContractAmount")}
              parentClass="mb-7"
            >
              <FormInput
                id="contract"
                type="text"
                inputClass="w-full"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                before=""
                placeholder=""
              />
            </FormGroup>
            <Hr margin="" />
            <div className="flex justify-end mt-5">
              <Button
                type="submit"
                text={t("Save")}
                customClass="h-[42px] px-8 gap-[10px]"
                iconLeft={true}
                icon="icon-save text-2xl"
              />
            </div>
          </form>
        </div>
      </dialog>

      {/* Add Sponsor Modal*/}
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
              className="btn text-pinkPrimary  btn-md btn-circle  btn-ghost absolute right-3 top-3"
            >
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-blackPrimary font-SfProDisplay font-bold text-2xl">
              {t("addSponsor")}
            </h3>
            <Hr margin="my-7" />
            <div className="mb-7">
              <label
                htmlFor="fullName"
                className="text-blackThird text-xs  uppercase font-medium tracking-[1.13px]"
              >
                {t("fullName")}
              </label>
              <select
                required
                defaultValue={"default"}
                className="select w-full mt-2 select-md bg-brownPrimary  text-blackThird font-normal border border-[#DFE3E8]"
              >
                <option disabled value="default">
                  Homiyni Tanglang
                </option>
                <option value="" className="font-normal">
                  Homiy 1
                </option>
                <option value="" className="font-normal">
                  Homiy 2
                </option>
                <option value="" className="font-normal">
                  Homiy 3
                </option>
                <option value="" className="font-normal">
                  Homiy 4
                </option>
                <option value="" className="font-normal">
                  Homiy 5
                </option>
              </select>
            </div>
            <FormGroup
              id="contract"
              label={t("AllocatedAmount")}
              parentClass="mb-7"
            >
              <FormInput
                id="contract"
                type="number"
                inputClass="w-full"
                value={allocatedAmount}
                onChange={(e) => setAllocatedAmount(e.target.value)}
                before=""
                placeholder={t("enterAmount")}
              />
            </FormGroup>
            <Hr margin="my-7" />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                customClass="h-[42px] px-8 gap-[10px]"
                text={t("add")}
                iconLeft={true}
                icon="icon-plus text-2xl"
              />
            </div>
          </form>
        </div>
      </dialog>

      {/* Edit Sponsor Modal*/}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_3"
                ) as HTMLDialogElement;
                modal.close();
              }}
              className="btn text-pinkPrimary  btn-md btn-circle  btn-ghost absolute right-3 top-3"
            >
              <i className="icon-close text-2xl"></i>
            </button>
            <h3 className="text-blackPrimary font-SfProDisplay font-bold text-2xl">
              {t("editSponsor")}
            </h3>
            <Hr margin="my-7" />
            <div className="mb-7">
              <label
                htmlFor="fullName"
                className="text-blackThird text-xs  uppercase font-medium tracking-[1.13px]"
              >
                {t("fullName")}
              </label>
              <select
                required
                defaultValue={"default"}
                className="select w-full mt-2 select-md bg-brownPrimary  text-blackThird font-normal border border-[#DFE3E8]"
              >
                <option disabled value="default">
                  Ishmuhammedov Aziz Ishqobilovich
                </option>
                <option value="" className="font-normal">
                  Judith Armstrong
                </option>
                <option value="" className="font-normal">
                  Muhammaddiyor Odiljonov
                </option>
                <option value="" className="font-normal">
                  Sopoline Clayton
                </option>
              </select>
            </div>
            <FormGroup
              id="contract"
              label={t("AllocatedAmount")}
              parentClass="mb-7"
            >
              <FormInput
                id="allocatedAmount"
                type="number"
                inputClass="w-full"
                value={allocatedAmount}
                onChange={(e) => setAllocatedAmount(e.target.value)}
                before=""
                placeholder={t("enterAmount")}
              />
            </FormGroup>
            <Hr margin="my-7" />
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="secondary"
                customClass="h-[42px] px-8 gap-[10px] text-[#FF4945]"
                text={t("deleteSponsor")}
                iconLeft={true}
                icon="icon-trash text-2xl"
              />
              <Button
                type="submit"
                variant="primary"
                customClass="h-[42px] px-8 gap-[10px]"
                text={t("Save")}
                iconLeft={true}
                icon="icon-save text-2xl"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SingleStudent;
