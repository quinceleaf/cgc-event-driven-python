import {
  Legend,
  OptionsDatasets,
  OptionsDateRange,
  OptionsDisplayType,
} from "../components";

const Sources = () => {
  return (
    <div className="lg:mt-0 mt-5">
      <div className="lg:text-sm text-xs">
        Data is compiled daily from
        <span className="lg:inline hidden"> the following sources</span>:
        <ul>
          <li className="lg:mt-0 mt-1">
            The New York Times{" "}
            <span className="lg:hidden inline">
              <br />
            </span>
            <a
              className="text-blue-500"
              href="https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
              target="_blank"
            >
              COVID-19 reported cases, United States
            </a>
          </li>
          <li className=" lg:mt-0 mt-1">
            The Johns Hopkins University{" "}
            <span className="lg:hidden inline">
              <br />
            </span>
            <a
              className="text-blue-500"
              href="https://raw.githubusercontent.com/datasets/covid-19/master/data/time-series-19-covid-combined.csv"
              target="_blank"
            >
              COVID-19 reported cases, globally
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Toolbar = () => {
  return (
    <div className="lg:p-6 p-4 h-auto shadow-sm border flex content-between flex-wrap">
      <div class="w-full ">
        <Legend />
      </div>

      <div className=" flex lg:flex-row flex-col w-full">
        {/* <div className="lg:w-1/3 w-full lg:mr-3 mr-0">
          <OptionsDisplayType />
        </div> */}
        <div className="lg:w-1/3 w-full lg:mr-3 mr-0">
          <OptionsDatasets />
        </div>
        <div className="lg:w-2/3 w-0"> </div>
        <div className="lg:w-2/3 w-full">
          <OptionsDateRange />
        </div>
      </div>

      {/* <div className="w-full ">
        <div>{Sources()}</div>
      </div> */}
    </div>
  );
};

export default Toolbar;
