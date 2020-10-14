import React from "react";

const Legend = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col self-start md:mb-4 mb-0">
        <div className="flex flex-row">
          <div
            className="mr-2 border w-10 h-4 self-center"
            style={{ backgroundColor: "rgb(0,128,255,1)" }}
          ></div>
          <div className="md:mr-6 mr-0 text-gray-500 text-sm">Total Cases</div>
        </div>

        <div className="flex flex-row">
          <div
            className="mr-2 border w-10 h-4 self-center"
            style={{ backgroundColor: "rgb(216,0,0,1)" }}
          ></div>
          <div className="md:mr-6 mr-0 text-gray-500 text-sm">Deaths</div>
        </div>

        <div className="flex flex-row">
          <div
            className="mr-2 border w-10 h-4 self-center"
            style={{ backgroundColor: "rgb(0,140,0,1)" }}
          ></div>
          <div className=" text-gray-500 text-sm">Recovered</div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
