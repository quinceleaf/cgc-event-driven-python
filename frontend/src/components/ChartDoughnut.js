import React, { createRef, useContext, useEffect, useRef } from "react";

import { Doughnut } from "react-chartjs-2";

import { DataContext } from "../context/dataContext";

const ChartDoughnut = ({ data }) => {
  const dataContext = useContext(DataContext);

  const relevantCases = dataContext.includeCases ? parseInt(data.cases) : 0;
  const relevantDeaths = dataContext.includeDeaths ? parseInt(data.deaths) : 0;
  const relevantRecovered = dataContext.includeRecovered
    ? parseInt(data.recovered)
    : 0;
  const remainingInfected =
    parseInt(data.cases) - parseInt(data.deaths) - parseInt(data.recovered);

  const chartData = {
    labels: ["Unresolved Cases", "Deaths", "Recovered"],
    datasets: [
      {
        data: [
          parseInt(data.cases) -
            parseInt(data.deaths) -
            parseInt(data.recovered),
          data.deaths,
          data.recovered,
        ],
        backgroundColor: [
          "rgb(0,128,255,1)",
          "rgb(216,0,0,1)",
          "rgb(0,140,0,1)",
        ],
        hoverBackgroundColor: [
          "rgb(0,128,255,0.3)",
          "rgb(216,0,0,0.3)",
          "rgb(0,140,0,0.3)",
        ],
      },
    ],
  };

  const legend = {
    display: false,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    circumference: 2 * Math.PI,
  };

  return (
    <div className="lg:p-6 p-4">
      <div className="mx-auto mb-4 font-3xl font-bold">
        Proportion of Reported Outcomes
      </div>
      <div className="flex flex-col ">
        <Doughnut data={chartData} legend={legend} options={options} />
        <div className="mt-3 text-left">
          As of {dataContext.displayIntervalEnd},<br />
          cumulative outcomes totalled:
          <ul>
            {dataContext.includeCases ? (
              <li>
                {relevantCases.toLocaleString("US-en")} Total cases, of which
              </li>
            ) : null}
            {dataContext.includeDeaths ? (
              <li>
                {relevantDeaths.toLocaleString("US-en")} resulted in death
              </li>
            ) : null}
            {dataContext.includeRecovered ? (
              <li>
                {relevantRecovered.toLocaleString("US-en")} resulted in recovery
              </li>
            ) : null}
            <li className="font-bold text-orange-500">
              {remainingInfected.toLocaleString("US-en")} REMAIN INFECTED
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChartDoughnut;
