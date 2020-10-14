import React, { createRef, useContext, useEffect, useRef } from "react";

import { Line } from "react-chartjs-2";
import { MdLinearScale } from "react-icons/md";

import { DataContext } from "../context/dataContext";
import {
  convertDataToChartsJsFormat,
  formatChartLabels,
} from "../helpers/listFunctions";

const ChartLine = ({ data }) => {
  const dataContext = useContext(DataContext);

  const formatChartDatasets = (data) => {
    let arr = [];
    const colors = [
      { background: "rgb(59,59,255, 0.2)", border: "rgb(59,59,255, 1)" },
      { background: "rgb(255,59,59, 0.2)", border: "rgb(255,59,59, 1)" },
      { background: "rgb(0,138,0, 0.2)", border: "rgb(0,138,0, 1)" },
    ];
    data.forEach((ds) => {
      const colorScheme = colors.pop();
      arr.push({
        label: ds.label,
        data: ds.data,
        fill: false,
        backgroundColor:
          ds.label == "Total Cases"
            ? "rgb(0,128,255,0.3)"
            : ds.label == "Deaths"
            ? "rgb(216,0,0,0.3)"
            : ds.label == "Recovered"
            ? "rgb(0,140,0,0.3)"
            : "#000000",
        borderColor:
          ds.label == "Total Cases"
            ? "rgb(0,128,255,1)"
            : ds.label == "Deaths"
            ? "rgb(216,0,0,1)"
            : ds.label == "Recovered"
            ? "rgb(0,140,0,1)"
            : "#000000",
        lineTension: 0.3,
        borderWidth: 1.5,
        pointRadius: 0,
      });
    });
    return arr;
  };

  const labels = {
    cases: "Total Cases",
    deaths: "Deaths",
    recovered: "Recovered",
  };
  const primaryKey = "date";
  const secondaryKeys = ["cases", "deaths", "recovered"];
  const transformedData = convertDataToChartsJsFormat(
    data,
    labels,
    primaryKey,
    secondaryKeys
  );

  const chartDatasets = formatChartDatasets(transformedData);
  const chartLabels = formatChartLabels(data, "date");
  const chartData = {
    labels: chartLabels,
    datasets: chartDatasets,
  };

  const legend = {
    display: false,
  };

  const options = {
    showlines: false,
    maintainAspectRatio: true,
    responsive: true,
    borderWidth: 1,
    pointRadius: 0,
    tooltips: {
      mode: "nearest",
      intersect: false,
      backgroundColor: "#ffffff",
      bodyFontColor: "#000000",
      titleFontColor: "#000000",
      xPadding: 10,
      yPadding: 10,
      borderColor: "#efefef",
      borderWidth: 1,
    },

    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            maxRotation: 45,
            minRotation: 0,
          },
          type: "time",
          time: {
            parser: "YY-MM-dd",
            unit: "day",
            unitStepSize: 1,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
            maxRotation: 0,
            minRotation: 0,
          },
          display: true,
          type: "linear",
        },
      ],
    },
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="lg:p-6 p-2">
          <div className="flex flex-row justify-between mb-4">
            <div className="font-3xl font-bold">
              {dataContext.displayType === "cumulative"
                ? "Reported Outcomes, Over Period"
                : "Daily Change in Reported Outcomes"}
            </div>
            <div className="ml-3 text-gray-500 text-sm italic lg:block hidden">
              Hover over chart lines for more information
            </div>
          </div>
          <Line data={chartData} legend={legend} options={options} />
        </div>
      </div>
      <div className="ml:5 text-gray-500 text-sm italic lg:hidden ">
        <span className="ml-2">
          Hover over chart lines for more information
        </span>
      </div>
    </div>
  );
};

export default ChartLine;
