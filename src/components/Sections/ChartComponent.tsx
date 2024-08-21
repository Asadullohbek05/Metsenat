import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTranslation } from "react-i18next";

const ChartComponent = () => {
  const { t } = useTranslation();

  const series = useMemo(
    () => [
      {
        name: t("students"),
        data: [15000, 15000, 13000, 35000, 20000, 25000, 30000, 40000],
      },
      {
        name: t("sponsors"),
        data: [10000, 7000, 25000, 20000, 30000, 45000, 27000, 15000],
      },
    ],
    [t]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: "basic-bar",
        height: 402,
        type: "line",
        dropShadow: {
          enabled: false,
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
      colors: ["#FF92AE", "#4C6FFF"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          opacity: 0.5,
        },
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [
          t("January"),
          t("February"),
          t("March"),
          t("April"),
          t("May"),
          t("June"),
          t("July"),
          t("August"),
          t("September"),
          t("October"),
          t("November"),
          t("December"),
        ],
      },
      yaxis: {
        min: 1,
        max: 50000,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: false,
        offsetY: -25,
        offsetX: -5,
      },
      tooltip: {
        theme: "light",
        x: {
          show: true,
          format: "MMM dd",
        },
        y: {
          formatter: (value) => `${value}`,
          title: {
            formatter: (seriesName) => `${t(seriesName)}:`,
          },
        },
        marker: {
          show: true,
        },
        style: {
          fontSize: "12px",
          fontFamily: "Rubik, sans-serif",
        },
      },
    }),
    [t]
  );

  return (
    <div className="max-w-7xl mx-auto px-10">
      <div className="bg-white rounded-lg">
        <div className="pl-6 pt-6">
          <h1 className="text-2xl mb-2 font-medium">
            {t("numbersOfStudentsAndSponsors")}
          </h1>
          <div className="flex gap-5 items-center">
            <h5 className="font-rubik font-normal text-xs flex items-center gap-2 text-[#7A7A9D]">
              <span className="w-2 h-2 rounded-full bg-[#4C6FFF]"></span>
              {t("sponsors")}
            </h5>
            <h5 className="font-rubik font-normal text-xs flex items-center gap-2 text-[#7A7A9D]">
              <span className="w-2 h-2 rounded-full bg-[#FF92AE]"></span>
              {t("students")}
            </h5>
          </div>
        </div>
        <div className="row bg-white rounded-lg">
          <div className="mixed-chart bg-white rounded-lg">
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
    </div>
  );
};

export default ChartComponent;
