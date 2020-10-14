import React, { useContext } from "react";

import { DataContext } from "../context/dataContext";

const OptionsDisplayType = () => {
  const dataContext = useContext(DataContext);

  return (
    <div className="md:mt-0 mt-4">
      <div className="font-bold md:text-xl text-lg">Outcomes</div>
      <div className="flex flex-row">
        <input
          id="ds1"
          type="checkbox"
          name="displayTotalCases"
          value="totalCases"
          checked={dataContext.includeCases === true}
          onClick={() => dataContext.setIncludeCases(!dataContext.includeCases)}
          className="mt-1 mr-1"
        />
        <label for="ds1">Total Cases</label>
      </div>
      <div className="flex flex-row">
        <input
          id="ds2"
          type="checkbox"
          name="displayDeaths"
          value="deaths"
          checked={dataContext.includeDeaths === true}
          onClick={() =>
            dataContext.setIncludeDeaths(!dataContext.includeDeaths)
          }
          className="mt-1 mr-1"
        />
        <label for="ds2">Deaths</label>
      </div>
      <div className="flex flex-row">
        <input
          id="ds3"
          type="checkbox"
          name="displayRecovered"
          value="recovered"
          checked={dataContext.includeRecovered === true}
          onClick={() =>
            dataContext.setIncludeRecovered(!dataContext.includeRecovered)
          }
          className="mt-1 mr-1"
        />
        <label for="ds3">Recovered</label>
      </div>
    </div>
  );
};

export default OptionsDisplayType;
