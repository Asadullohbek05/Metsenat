import { Link, useNavigate, useParams } from "react-router-dom";
import adminLogo from "../assets/images/svg/admin-page-logo.svg";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import arrow from "../assets/images/svg/arrow-left.svg";
import editIcon from "../assets/images/svg/edit-icon.svg";
import sponsorIcon from "../assets/images/svg/sponsor-icon.svg";
import saveIcon from "../assets/images/svg/save-icon.svg";
import request from "../server/request";
import formatNumberWithSpaces from "../utils";

const SingleSponsor = () => {
  const [singleSponsorData, setSingleSponsorData] = useState({});
  const [isVisible, setIsvisible] = useState(false);
  const [fullName, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sponsorSum, setSponsorSum] = useState("");
  const [firm, setFirm] = useState("");

  window.scrollTo(0, 0);
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

  const { id } = useParams();

  const [sing, setSign] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await request.get(`/sponsor-detail/${id}`);
        console.log(data);
        setFullname(data.full_name);
        setPhoneNumber(data.phone);
        setSponsorSum(data.sum);
        setFirm(data.firm);
        setSingleSponsorData(data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [id, sing]);

  const editSponsor = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const handleSubmit = async () => {
    const updatedSponsor = {
      full_name: fullName,
      phone: phoneNumber,
      sum: sponsorSum,
      firm: firm,
    };
    try {
      const { data } = await request.put(
        `sponsor-update/${id}/`,
        updatedSponsor
      );
      console.log(data);
      setSign(!sing);
      toast.success("Sponsor Updated");
    } catch (err) {
      console.log(err);
    }

    console.log(updatedSponsor);
  };

  const handleTab = (tab: string) => {
    if (tab === "yuridik") {
      setIsvisible(true);
    } else if (tab === "jismoniy") {
      setIsvisible(false);
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="shadow-[0_35px_40px_0px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto py-4 px-10 flex justify-between items-center">
            <Link to={"/"}>
              <img src={adminLogo} alt="Logo image" />
            </Link>
            <div className="flex gap-10">
              <div className="flex gap-6 justify-between items-center bg-[#F1F1F3] p-1 rounded">
                <span className="ml-4 font-SfProDisplay font-bold text-[#28293D] tracking-[0.35px]">
                  Shohrux
                </span>
                <div className="w-8 h-8 bg-[#00AE69] rounded flex justify-center items-end">
                  <i className="icon-icons8-user8-1 text-2xl leading-none"></i>
                </div>
              </div>
              <button className="flex items-center" onClick={logOut}>
                <i className="icon-log-out-1 text-[32px]"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="h-20 max-w-7xl mx-auto py-4 px-10 flex items-center">
          <Link to={"/sponsors"}>
            <img src={arrow} alt="Arrow Image" />
          </Link>
          <h3 className="text-[#28293D] font-SfProDisplay font-bold text-2xl ml-4 mr-3">
            {singleSponsorData ? singleSponsorData.full_name : null}
          </h3>
          <span
            className={`${
              singleSponsorData.get_status_display === "Yangi"
                ? "text-[#5BABF2]"
                : singleSponsorData.get_status_display === "Moderatsiyada"
                ? "text-[#FFA445]"
                : singleSponsorData.get_status_display === "Tasdiqlangan"
                ? "text-[#00CF83]"
                : null
            } flex items-center justify-center font-normal font-SfProDisplay w-24 h-6 bg-[#DDFFF2] rounded-md text-xs`}
          >
            {singleSponsorData ? singleSponsorData.get_status_display : null}
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  px-10 h-screen bg-[url('../src/assets/images/png/sponsor-single-bg.png')] bg-no-repeat bg-bottom">
        <div className="mt-10 bg-white w-[793px] mx-auto rounded-xl p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-[#28293D] font-SfProDisplay text-2xl font-bold">
              Homiy haqida
            </h1>
            <button
              onClick={editSponsor}
              className="flex justify-center items-center gap-[10px] w-40 h-11 bg-[#EDF1FD] text-[#3365FC] font-SfProDisplay font-semibold tracking-[1px] rounded-md"
            >
              <img src={editIcon} alt="Edit Icon" /> Tahrirlash
            </button>
          </div>
          <div className="mt-8 flex gap-5 items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-[#E0E7FF] rounded-md">
              <img src={sponsorIcon} alt="" />
            </div>
            <h2 className="max-w-40 font-SfProDisplay text-[#212121] font-semibold text-[16px] tracking-[-1%]">
              {singleSponsorData ? singleSponsorData.full_name : null}
            </h2>
          </div>
          <div className="flex gap-56">
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                telefon raqam
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {singleSponsorData ? singleSponsorData.phone : null}
              </h3>
            </div>
            <div className="mt-6">
              <p className="text-[#B5B5C3] uppercase font-SfProDisplay tracking-[1.13px] text-xs">
                Homiylik summasi
              </p>
              <h3 className="text-[#212121] font-SfProDisplay text-[16px] font-semibold mt-3">
                {singleSponsorData
                  ? formatNumberWithSpaces(singleSponsorData.sum)
                  : null}{" "}
                UZS
              </h3>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn text-[#B2B7C1] hover:text-black btn-md btn-circle text-2xl btn-ghost absolute right-3 top-3">
              ✕
            </button>
            <h3 className="text-[#28293D] font-SfProDisplay text-2xl">
              Tahrirlash
            </h3>
            <hr className="h-0.5 bg-[#F5F5F7] border-none mt-7" />
            <div className="mt-7 mb-8">
              <button
                onClick={() => handleTab("jismoniy")}
                type="button"
                className={`text-xs uppercase font-SfProDisplay tracking-[1.13px] border-2 border-r-0 border-[#E0E7FF] ${
                  !isVisible ? "activeTab" : null
                } h-10 w-1/2  rounded-l-md`}
              >
                Jismoniy shaxs
              </button>
              <button
                onClick={() => handleTab("yuridik")}
                type="button"
                className={`text-xs uppercase font-SfProDisplay tracking-[1.13px]  h-10 w-1/2 rounded-r-md border-2 border-[#E0E7FF] ${
                  isVisible ? "activeTab" : null
                }`}
              >
                Yuridik shaxs
              </button>
            </div>
            <div className="flex flex-col mb-7">
              <label
                htmlFor="full_name"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                F.I.Sh. (Familiya Ism Sharifingiz)
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullname(e.target.value)}
                className="border mt-2 h-11 outline-none border-[#D2D4D7] rounded-md pl-4"
                type="text"
                id="full_name"
              />
            </div>
            <div className="flex flex-col mb-7">
              <label
                htmlFor="phone_number"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                Telefon raqam
              </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border mt-2 h-11 outline-none border-[#D2D4D7] rounded-md pl-4"
                type="text"
                id="phone_number"
              />
            </div>
            {/* <div className="flex flex-col mb-7">
              <label
                htmlFor="phone_number"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                Holati
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="select select-bordered  w-full mt-2 text-[#2E384D] font-SfProDisplay"
              >
                <option value="Tasdiqlangan">Tasdiqlangan</option>
                <option value="Yangi">Yangi</option>
                <option value="Taqiqlangan">Taqiqlangan</option>
                <option value="Moderatsiyada">Moderatsiyada</option>
              </select>
            </div> */}
            <div className="flex flex-col mb-7">
              <label
                htmlFor="phone_number"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                Homiylik summasi
              </label>
              <input
                value={sponsorSum}
                onChange={(e) => setSponsorSum(e.target.value)}
                className="border mt-2 h-11 outline-none border-[#D2D4D7] rounded-md pl-4"
                type="text"
                id="phone_number"
              />
            </div>
            {/* <div className="flex flex-col mb-7">
              <label
                htmlFor="phone_number"
                className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
              >
                To'lov turi
              </label>
              <select className="select select-bordered  w-full mt-2 text-[#2E384D] font-SfProDisplay">
                <option>Naqd pul</option>
                <option>Plastik karta</option>
                <option>Pul ko'chirish</option>
              </select>
            </div> */}
            {isVisible ? (
              <div className="flex flex-col mb-7">
                <label
                  htmlFor="name_of_company"
                  className="text-[#1D1D1F] text-xs font-SfProDisplay uppercase font-semibold tracking-[1.13px]"
                >
                  Tashkilot nomi
                </label>
                <input
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  className="border mt-2 h-11 outline-none border-[#D2D4D7] rounded-md pl-4"
                  type="text"
                  id="name_of_company"
                />
              </div>
            ) : null}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-[#3366FF] flex justify-center items-center gap-[10px] w-[150px] h-11 text-white rounded-md"
              >
                <img src={saveIcon} alt="" /> Saqlash
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SingleSponsor;
