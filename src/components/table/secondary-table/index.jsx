import React, { useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import "./style.css";

const SecondaryTable = ({ columns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      pageOptions,
      setPageSize,
      state: { pageIndex, pageSize },
      previousPage,
      nextPage,
      canPreviousPage,
      canNextPage,
    } = useTable(
      {
        columns,
        data,
        initialState: { pageSize: 15, pageIndex: 0 },
      },
      usePagination
    );
  
    return (
      <>
        <div className="table_container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table_container">
          <div>
            <button className={canPreviousPage?"secButton":"secButtonDisabled"} onClick={() => previousPage()} disabled={!canPreviousPage}>
              Prev
            </button>
              &nbsp;
            <button className={canNextPage?"secButton":"secButtonDisabled"} onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
              &nbsp;
            <div>
              Page{" "}
              <em>
                {pageIndex + 1} of {pageOptions.length}
              </em>
            </div>
          </div>
          <div>
            <span>Select page size: </span>
            <select
              id="row"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
            </select>
          </div>
        </div>
      </>
    );
  };

  export default SecondaryTable; 
