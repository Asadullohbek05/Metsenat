import ChartComponent from "../components/Sections/ChartComponent";
import DashboardCards from "../components/Sections/DashboardCards";

const DashboardPage = () => {
  return (
    <div className="h-screen">
      <DashboardCards />
      <ChartComponent />
    </div>
  );
};

export default DashboardPage;
