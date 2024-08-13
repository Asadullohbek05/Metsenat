import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

const ChartComponent = () => {
  const [series] = useState([
    {
      name: "Talabalar",
      data: [303, 403, 4500, 30000, 40000, 45000, 40000, 30000],
    },
    {
      name: "Homiylar",
      data: [22000, 30, 35000, 20000, 18000, 17000, 60, 40000],
    },
  ]);

  const [options] = useState<ApexOptions>({
    chart: {
      id: "basic-bar",
      height: 402,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#4C6FFF", "#FF92AE"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Homiylar va talabalar soni",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr",
      ],
      title: {
        text: "Oylar",
      },
    },
    yaxis: {
      title: {
        text: "Soni",
      },
      min: 100,
      max: 50000,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-10">
      <div className="row">
        <div className="mixed-chart bg-white">
          <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
            height={402}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
