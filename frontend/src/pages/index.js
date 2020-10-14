import { useContext, useMemo, useState } from "react";

import axios from "axios";
import { queryCache, useQuery } from "react-query";

import { DataContext } from "../context/dataContext";
import { apiData } from "../api";
import data from "../api/sample";
import {
  ChartDoughnut,
  ChartLine,
  Error,
  Layout,
  Loading,
  TabbedPanel,
  Table,
  Toolbar,
} from "../components";
import { filterArrayOfObjects, filterDatasets } from "../helpers/listFunctions";

const Index = () => {
  const dataContext = useContext(DataContext);
  const [activeTab, setActiveTab] = useState("table");

  // ––– QUERY DATA
  const query = useQuery(
    "data",
    () => axios.get(`${apiData}/data`).then((res) => res.data),
    {
      refetchAllOnWindowFocus: false,
      retry: 1,
      staleTime: 1000,
    }
  );

  const initialData = query.isLoading ? [] : query.isError ? [] : query.data;

  const fetching = query.isFetching;

  // ––– QUERY CHECKPOINT
  const queryCheckpoint = useQuery(
    "checkpoint",
    () => axios.get(`${apiData}/checkpoint`).then((res) => res.data),
    {
      refetchAllOnWindowFocus: true,
      retry: 3,
      staleTime: 1000,
    }
  );

  const checkpoint = queryCheckpoint.isLoading
    ? []
    : queryCheckpoint.isError
    ? []
    : queryCheckpoint.data[0];

  const fetchingCheckpoint = queryCheckpoint.isFetching;

  const intervalData = filterArrayOfObjects(
    initialData,
    dataContext.displayIntervalStart,
    dataContext.displayIntervalEnd
  );

  const data = filterDatasets(
    intervalData,
    dataContext.includeCases,
    dataContext.includeDeaths,
    dataContext.includeRecovered
  );

  return (
    <div className="px-4 pt-0 shadow rounded bg-white">
      <Layout>
        <div className="flex flex-col">
          {/* DASHBOARD TITLE */}
          <div className="flex lg:flex-row flex-col lg:items-center items-start">
            <div className="lg:mb-3 mb-2 font-bold text-4xl lg:tracking-normal tracking-tight lg:leading-normal leading-none ">
              COVID-19 Cases in{" "}
              <span className="lg:hidden inline">
                <br />
              </span>{" "}
              the United States
            </div>
            <div className="lg:ml-3 ml-0 text-gray-500 font-normal text-sm italic">
              Most recent data: {checkpoint.last_successful_run}
            </div>
          </div>

          {/* TABS */}
          <div>
            <TabbedPanel activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="flex flex-row">
            {/* START TABLE */}
            <div
              className={
                activeTab === "table"
                  ? "lg:w-1/4 w-full"
                  : "lg:w-1/4 w-full lg:block hidden"
              }
            >
              {query.isLoading ? (
                <Loading />
              ) : query.isError ? (
                <Error />
              ) : data ? (
                <Table tableData={data} />
              ) : null}
            </div>
            {/* END TABLE */}

            <div
              className={
                activeTab === "table"
                  ? "w-3/4 mx-4 lg:block hidden"
                  : "w-3/4 mx-4 lg:block "
              }
            >
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div
                    className={
                      activeTab === "chart"
                        ? "lg:p-0 pb-2 border border-gray-300 shadow-sm lg:w-2/3 w-full"
                        : "border border-gray-300 shadow-sm lg:w-2/3 w-full lg:block hidden"
                    }
                  >
                    {query.isLoading ? (
                      <Loading />
                    ) : query.isError ? (
                      <Error />
                    ) : data ? (
                      <ChartLine data={data} />
                    ) : null}
                  </div>
                  <div
                    className={
                      activeTab === "doughnut"
                        ? "lg:w-1/3 w-full ml-4 border border-gray-300 shadow-sm "
                        : "lg:w-1/3 w-full ml-4 border border-gray-300 shadow-sm lg:block hidden"
                    }
                  >
                    {query.isLoading ? (
                      <Loading />
                    ) : query.isError ? (
                      <Error />
                    ) : data ? (
                      <ChartDoughnut data={data[data.length - 1]} />
                    ) : null}
                  </div>
                </div>

                {/* TOOLBAR */}
                <div
                  className={
                    activeTab === "toolbar" ? "mt-4" : "mt-4 lg:block hidden"
                  }
                >
                  <Toolbar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
