import React, { createContext, useContext, useState } from "react";

import { format } from "date-fns";
import { SiGreenkeeper } from "react-icons/si";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [includeCases, setIncludeCases] = useState(true);
  const [includeDeaths, setIncludeDeaths] = useState(true);
  const [includeRecovered, setIncludeRecovered] = useState(true);

  const [displayIntervalStart, setDisplayIntervalStart] = useState(
    "2020-01-22"
  );
  const [displayIntervalEnd, setDisplayIntervalEnd] = useState(
    format(new Date(new Date() - 60 * 60 * 24 * 1000), "Y-MM-d")
  );

  const [displayType, setDisplayType] = useState("cumulative");

  return (
    <DataContext.Provider
      value={{
        includeCases,
        setIncludeCases,
        includeDeaths,
        setIncludeDeaths,
        includeRecovered,
        setIncludeRecovered,
        displayIntervalStart,
        setDisplayIntervalStart,
        displayIntervalEnd,
        setDisplayIntervalEnd,
        displayType,
        setDisplayType,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
