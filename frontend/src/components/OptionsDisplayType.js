import React, { useContext } from "react";

import { DataContext } from "../context/dataContext";

const OptionsDisplayType = () => {
  const dataContext = useContext(DataContext);

  return (
    <div className="md:mt-0 mt-4">
      <div className="font-bold md:text-xl text-lg">Data Organization</div>
      <div className="flex flex-row">
        <input
          id="d1"
          type="radio"
          name="changeDisplayType"
          value="cumulative"
          checked={dataContext.displayType === "cumulative"}
          onClick={() => dataContext.setDisplayType("cumulative")}
          className="mt-1 mr-1"
        />
        <label htmlFor="d1">Cumulative</label>
      </div>

      <div className="flex flex-row">
        <input
          id="d2"
          type="radio"
          name="changeDisplayType"
          value="daily"
          checked={dataContext.displayType === "daily"}
          onClick={() => dataContext.setDisplayType("daily")}
          className="mt-1 mr-1"
        />
        <label htmlFor="d2" className="mb-1">
          Daily
        </label>
      </div>
    </div>
  );
};

export default OptionsDisplayType;
