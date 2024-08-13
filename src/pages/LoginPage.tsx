import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../assets/images/svg/logo.svg";
import LanguageDropdown from "../components/Dropdown";
import request from "../server/request";
import { AuthContext } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }
  const { setIsAuthenticated } = authContext;

  const [captchaVal, setCaptchaVal] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  if (!siteKey) {
    console.warn("ReCAPTCHA site key is not set.");
  }

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVal(value);
  };

  const handleAuth = async () => {
    const user = {
      username: login,
      password: password,
    };
    try {
      const { data } = await request.post("/auth/login/", user);
      localStorage.setItem("token", JSON.stringify(data));
      setIsAuthenticated(true);
      toast.success(t("login_success"));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(t("login_failed"));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!captchaVal) {
      toast.error(t("captcha_required"));
      return;
    }
    handleAuth();
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center gap-5 sm:gap-12">
        <img className="h-[28px] sm:w-auto" src={logo} alt="Logo" />
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
            aria-label={t("submit")}
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
