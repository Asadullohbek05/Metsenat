import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/images/svg/admin-page-logo.svg";

const Navbar = () => {
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

  const [activeTab, setActiveTab] = useState("dashboard");
  const handleTab = (active: string) => {
    setActiveTab(active);
  };

  return (
    <div className="bg-white">
      <div className="shadow-[0_35px_40px_0px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto py-4 px-10 flex justify-between items-center">
          <Link to={"/"}>
            <img src={logo} alt="Logo image" />
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
      <div className="h-20 max-w-7xl mx-auto py-4 px-10 flex justify-between  items-center">
        <div>
          <button
            onClick={() => handleTab("dashboard")}
            className={`font-SfProDisplay font-medium uppercase tracking-[1.13px] text-xs h-10 w-48 border-2 border-[#E0E7FF] border-r-0 rounded-l-md ${
              activeTab === "dashboard"
                ? " bg-[#3366FF] text-white"
                : "text-[#3366FF99]"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleTab("homiylar")}
            className={`font-SfProDisplay font-medium uppercase tracking-[1.13px] text-xs h-10 w-48 border-2 border-[#E0E7FF] border-r-0  ${
              activeTab === "homiylar"
                ? " bg-[#3366FF] text-white"
                : "text-[#3366FF99]"
            }`}
          >
            Homiylar
          </button>
          <button
            onClick={() => handleTab("talabalar")}
            className={`font-SfProDisplay font-medium uppercase tracking-[1.13px] text-xs h-10 w-48 border-2 border-[#E0E7FF] rounded-r-md ${
              activeTab === "talabalar"
                ? " bg-[#3366FF] text-white"
                : "text-[#3366FF99]"
            }`}
          >
            Talabalar
          </button>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-72 border h-10 bg-[#E8E8E8] rounded-md flex items-center">
            <i className="icon-search-2 ml-[10px] text-xl"></i>
            <input
              className="outline-none w-full bg-transparent px-2  h-full border"
              type="text"
              placeholder="Izlash"
            />
          </div>
          <button className="bg-[#EDF1FD] h-10 px-8 flex gap-[10px] items-center text-[#3365FC] text-[14px] font-SfProDisplay font-medium rounded-md">
            <i className="icon-filter-1 text-[16px]"></i>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
