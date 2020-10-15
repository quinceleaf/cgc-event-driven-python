import React, { useContext, useEffect, useMemo } from "react";

import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { usePagination, useSortBy, useTable } from "react-table";

import { DataContext } from "../context/dataContext";
import { Pagination } from "../components";

const DataTable = ({ tableData }) => {
  const dataContext = useContext(DataContext);
  const data = useMemo(() => tableData, []);

  const columns = useMemo(
    () => [
      {
        accessor: "date",
        Header: "Date",
        className:
          "table-cell p-1 text-sm font-light border bg-white text-center",
      },

      {
        Header: "Cumulative",
        columns: [
          {
            accessor: "cases",
            Header: "Cases",
            isVisible: dataContext.displayType === "cumulative" ? true : false,
            className:
              "table-cell p-1 pr-3 text-sm font-light border bg-white text-right",
          },
          {
            accessor: "deaths",
            Header: "Deaths",
            isVisible: dataContext.displayType === "cumulative" ? true : false,
            className:
              "table-cell p-1 pr-3 text-sm font-light border bg-white text-right",
          },
          {
            accessor: "recovered",
            Header: "Recovered",
            isVisible: dataContext.displayType === "cumulative" ? true : false,
            className:
              "table-cell p-1 pr-3 text-sm font-light border bg-white text-right",
          },
        ],
      },
      // {
      //   Header: "Daily",
      //   columns: [
      //     {
      //       accessor: "daily_cases",
      //       Header: "Cases",
      //       isVisible: dataContext.displayType === "daily" ? true : false,
      //       className:
      //         "table-cell p-1 pr-3 text-sm font-light border bg-yellow-100 text-right",
      //     },
      //     {
      //       accessor: "daily_deaths",
      //       Header: "Deaths",
      //       isVisible: dataContext.displayType === "daily" ? true : false,
      //       className:
      //         "table-cell p-1 pr-3 text-sm font-light border bg-yellow-100 text-right",
      //     },
      //     {
      //       accessor: "daily_recovered",
      //       Header: "Recovered",
      //       isVisible: dataContext.displayType === "daily" ? true : false,
      //       className:
      //         "table-cell p-1 pr-3 text-sm font-light border bg-yellow-100 text-right",
      //     },
      //   ],
      // },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setHiddenColumns,
    // the following are pagination-specific parameters
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    useSortBy,
    usePagination
  );

  // combining together for convenience in passing to Pagination component
  const pageProps = {
    pageIndex,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  };

  return (
    <div className="flex flex-col">
      <div>
        <table
          {...getTableProps()}
          className="table table-auto border-gray-300 border w-full"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-1 text-xs border "
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <BiCaretDown />
                        ) : (
                          <BiCaretUp />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: cell.column.className,
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col justify-start">
        <Pagination pageProps={pageProps} />
        <div className="mt-4 text-gray-500 text-sm">
          {rows.length} days of reported data
        </div>
      </div>
    </div>
  );
};

export default DataTable;
