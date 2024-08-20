import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LanguageDropdown from "../components/Dropdown";
import request from "../server/request";
import { AuthContext } from "../context/AuthContext";
import FormGroup from "../components/Form/FormGroup";
import FormInput from "../components/Form/FormInput";
import Button from "../components/Base/Button";
import logo from "../assets/images/svg/logo.svg";

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }
  const { setIsAuthenticated } = authContext;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";
  if (!siteKey) {
    console.warn("ReCAPTCHA site key is not set.");
  }

  // States
  const [captchaVal, setCaptchaVal] = useState<string | null>(null);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVal(value);
  };

  const handleAuth = async () => {
    const user = {
      username: login,
      password: password,
    };
    try {
      setLoading(true);
      const { data } = await request.post("/auth/login/", user);
      localStorage.setItem("token", JSON.stringify(data));
      setIsAuthenticated(true);
      toast.success(t("login_success"));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("login_failed");
      toast.error(t("login_failed"));
    } finally {
      setLoading(false);
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
      <div className="flex flex-col items-center gap-12">
        {/* Logo Image */}
        <img className="h-[33px]" src={logo} alt="Logo" />

        {/* Form */}
        <form
          className="bg-white p-8 rounded-xl flex flex-col shadow-[0px_5px_40px_0px_rgba(0,0,0,0.03)]"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-[#28293D] text-2xl leading-7 mb-11">
            {t("enter")}
          </h1>
          <FormGroup id="loginLabel" label={t("login")} parentClass="mb-[22px]">
            <FormInput
              id="login"
              type="text"
              placeholder="metsenatadmin"
              inputClass="w-full"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              error={Boolean(error)}
              before=""
            />
          </FormGroup>
          <FormGroup
            id="passwordLabel"
            label={t("password")}
            parentClass="mb-[22px]"
          >
            <FormInput
              id="password"
              type="password"
              inputClass="w-full"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(error)}
              before=""
            />
          </FormGroup>

          {/* RECAPTCHA */}
          <ReCAPTCHA
            className="w-full mb-[22px]"
            sitekey={siteKey}
            onChange={handleCaptchaChange}
          />
          <Button
            variant="primary"
            text={t("submit")}
            disabled={!login || !password || !captchaVal || loading}
            customClass="py-[14px]"
            type="submit"
            loading={loading}
          />
        </form>
      </div>

      {/* Language Dropdown */}
      <div className="fixed top-5 right-5">
        <LanguageDropdown />
      </div>
    </div>
  );
};

export default LoginPage;
