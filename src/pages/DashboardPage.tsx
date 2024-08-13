import ChartComponent from "../components/ChartComponent";
import DashboardCards from "../components/DashboardCards";

const DashboardPage = () => {
  return (
    <div className="h-screen">
      <DashboardCards />
      <ChartComponent />
    </div>
  );
};

export default DashboardPage;
