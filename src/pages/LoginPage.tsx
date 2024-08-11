import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";

import logo from "../assets/images/svg/logo.svg";
import LanguageDropdown from "../components/Dropdown";

import { toast } from "react-toastify";
import request from "../server/request";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext) || {
    setIsAuthenticated: () => {},
  };
  const [captchaVal, setCaptchaVal] = useState<string | null>(null);
  const { t } = useTranslation();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  if (!siteKey) {
    console.warn("ReCAPTCHA site key is not set.");
  }

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVal(value);
  };

  const handleAuth = async () => {
    const user: { username: string; password: string } = {
      username: login,
      password: password,
    };
    try {
      const { data } = await request.post("/auth/login/", user);
      localStorage.setItem("token", JSON.stringify(data));
      setIsAuthenticated(true);
      toast.success("Logged In Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!captchaVal) {
      toast.error("Please complete the captcha.");
      return;
    }
    handleAuth();
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center gap-5 sm:gap-12">
        <img className="h-[28px] sm:w-auto" src={logo} alt="Logo Image" />
        <form
          className="bg-white p-5 sm:p-8 rounded-xl flex flex-col"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-2xl leading-7 mb-11 font-SfProDisplay">
            {t("enter")}
          </h1>
          <div className="flex flex-col gap-2 mb-6">
            <label
              htmlFor="login"
              className="text-xs tracking-wide text-[#1D1D1F] font-bold font-Rubik"
            >
              {t("login")}
            </label>
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              id="login"
              required
              type="text"
              className="h-10 border rounded-md border-[#E0E7FF] outline-none px-4 bg-[#E0E7FF33]"
            />
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label
              htmlFor="password"
              className="text-xs tracking-wide text-[#1D1D1F] font-bold font-Rubik"
            >
              {t("password")}
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              type="password"
              className="h-10 border rounded-md border-[#E0E7FF] outline-none px-4 bg-[#E0E7FF33]"
            />
          </div>
          <ReCAPTCHA
            className="w-full"
            sitekey={siteKey}
            onChange={handleCaptchaChange}
          />
          <button
            aria-label="Submit form"
            className={`bg-[#2E5BFF] w-full h-[50px] mt-6 rounded-md font-medium text-white ${
              !login || !password || !captchaVal
                ? "opacity-50 cursor-not-allowed"
                : ""
            } `}
            disabled={!login || !password || !captchaVal}
          >
            {t("submit")}
          </button>
        </form>
      </div>
      <div className="fixed top-5 right-5">
        <LanguageDropdown />
      </div>
    </div>
  );
};

export default LoginPage;
