import { useEffect, useState } from "react";
import request from "../server/request";
import DashboardCard from "./Cards/DashboardCard";
import { useTranslation } from "react-i18next";

const DashboardCards = () => {
  const { t } = useTranslation();
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
        bgColor="#4C6FFF1A"
      />
      <DashboardCard
        iconClass="icon-flag-icon-1"
        title={t("total_need")}
        value={total_need}
        bgColor="#EDC7001A"
      />
      <DashboardCard
        iconClass="icon-flag-icon-3"
        title={t("total_must_pay")}
        value={total_must_pay}
        bgColor="#ED72001A"
      />
    </div>
  );
};

export default DashboardCards;
