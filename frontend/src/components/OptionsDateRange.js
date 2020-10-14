import React, { useContext } from "react";

import { format, parse } from "date-fns";

import { DataContext } from "../context/dataContext";
import DatePicker from "react-datepicker";

const OptionsDateRange = () => {
  const dataContext = useContext(DataContext);

  const resetDateRange = () => {
    dataContext.setDisplayIntervalStart("2020-01-22");
    dataContext.setDisplayIntervalEnd(
      format(new Date(new Date() - 60 * 60 * 24 * 1000), "Y-MM-d")
    );
  };

  return (
    <div className="flex flex-col md:mt-0 mt-4">
      <div className="font-bold md:text-xl text-lg">Date Range</div>

      <div>
        <div className="flex md:flex-row flex-col md:justify-end justify-start">
          {/* START INTERVAL */}
          <div className="flex flex-col mt-2 md:mr-2 mr-0 w-full">
            <label
              htmlFor="startDate"
              className="md:mr-2 mr-0 md:text-sm text-xs text-gray-600"
            >
              Start
            </label>
            <div className="p-2 px-3 mt-1 text-sm focus:outline-none rounded-md border border-gray-300 ">
              <DatePicker
                id="startDate"
                selected={parse(
                  dataContext.displayIntervalStart,
                  "y-MM-dd",
                  new Date()
                )}
                onChange={(date) => {
                  const dateStr = format(date, "Y-MM-d");
                  dataContext.setDisplayIntervalStart(dateStr);
                }}
                selectsStart
                startDate={parse(
                  dataContext.displayIntervalStart,
                  "y-MM-dd",
                  new Date()
                )}
                endDate={parse(
                  dataContext.displayIntervalEnd,
                  "y-MM-dd",
                  new Date()
                )}
                showMonthDropdown
              />

              {/* <DatePicker
                selected={parse(
                  dataContext.displayIntervalStart,
                  "y-MM-dd",
                  new Date()
                )}
                onChange={(date) => {
                  const dateStr = format(date, "Y-MM-d");
                  dataContext.setDisplayIntervalStart(dateStr);
                }}
              /> */}
            </div>
          </div>

          {/* END INTERVAL */}
          <div className="flex flex-col md:mt-2 mt-3 md:ml-2 ml-0 w-full">
            <label
              htmlFor={"endDate"}
              className="mr-2 md:text-sm text-xs text-gray-600"
            >
              End{" "}
            </label>
            <div className="p-2 px-3 mt-1 text-sm focus:outline-none rounded-md border border-gray-300 ">
              <DatePicker
                id={"endDate"}
                selected={parse(
                  dataContext.displayIntervalEnd,
                  "y-MM-dd",
                  new Date()
                )}
                onChange={(date) => {
                  dataContext.setDisplayIntervalEnd(date.toJSON().slice(0, 10));
                }}
                selectsEnd
                startDate={parse(
                  dataContext.displayIntervalStart,
                  "y-MM-dd",
                  new Date()
                )}
                endDate={parse(
                  dataContext.displayIntervalEnd,
                  "y-MM-dd",
                  new Date()
                )}
                minDate={parse(
                  dataContext.displayIntervalStart,
                  "y-MM-dd",
                  new Date()
                )}
                showMonthDropdown
              />
            </div>
          </div>
        </div>
        <button
          className="p-1 px-5 mt-4 h-8 w-full bg-blue-500 text-white rounded-md outline-none disabled:opacity-25"
          type={"button"}
          disabled={false}
          onClick={() => resetDateRange()}
        >
          Reset to Original Date Range
        </button>
      </div>
    </div>
  );
};

export default OptionsDateRange;
