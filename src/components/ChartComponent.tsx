import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTranslation } from "react-i18next";

const ChartComponent = () => {
  const { t, i18n } = useTranslation();

  const [series, setSeries] = useState([
    {
      name: t("students"),
      data: [10000, 20000, 8000, 30000, 15000, 20000, 25000, 35000],
    },
    {
      name: t("sponsors"),
      data: [5000, 2000, 20000, 15000, 25000, 40000, 22000, 10000],
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>({
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
          formatter: (seriesName) => `${seriesName}:`,
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
  });

  useEffect(() => {
    setSeries([
      {
        name: t("students"),
        data: [10000, 20000, 8000, 30000, 15000, 20000, 25000, 35000],
      },
      {
        name: t("sponsors"),
        data: [5000, 2000, 20000, 15000, 25000, 40000, 22000, 10000],
      },
    ]);

    setOptions((prevOptions) => ({
      ...prevOptions,
      tooltip: {
        ...prevOptions.tooltip,
        title: {
          formatter: (seriesName: string) => `${t(seriesName)}:`,
        },
      },
    }));
  }, [i18n.language, t]);

  return (
    <div className="max-w-7xl mx-auto px-10 ">
      <div className="bg-white rounded-lg">
        <div className="pl-6 pt-6">
          <h1 className="text-2xl mb-2 font-medium">
            {t("numbersOfStudentsAndSponsors")}
          </h1>
          <div className="flex gap-5 items-center">
            <h5 className="font-rubik font-normal text-xs flex items-center gap-2 text-[#7A7A9D]">
              <span className="w-2 h-2  rounded-full bg-[#4C6FFF]"></span>
              {t("sponsors")}
            </h5>
            <h5 className="font-rubik font-normal text-xs flex items-center gap-2 text-[#7A7A9D]">
              <span className="w-2 h-2  rounded-full bg-[#FF92AE]"></span>
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
