import { useEffect, useState } from "react";
import request from "../server/request";
import DashboardCard from "./DashboardCard";
import { useTranslation } from "react-i18next";
import Loading from "./Loading";

const DashboardCards = () => {
  const { t, i18n } = useTranslation();
  const [dashboardData, setDashboardData] = useState({
    total_paid: 0,
    total_need: 0,
    total_must_pay: 0,
  });
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const { data } = await request.get("/dashboard");
      setDashboardData(data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Could not load dashboard data.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      const { locale } = JSON.parse(storedLang);
      i18n.changeLanguage(locale);
    }
  }, [i18n]);

  const { total_paid, total_need, total_must_pay } = dashboardData;

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-10 mt-12 mb-7 flex justify-between">
      <DashboardCard
        iconClass="icon-flag-icon-2"
        title={t("total_paid")}
        value={total_paid}
        currency="UZS"
      />
      <DashboardCard
        iconClass="icon-flag-icon-1"
        title={t("total_need")}
        value={total_need}
        currency="UZS"
      />
      <DashboardCard
        iconClass="icon-flag-icon-3"
        title={t("total_must_pay")}
        value={total_must_pay}
        currency="UZS"
      />
    </div>
  );
};

export default DashboardCards;
