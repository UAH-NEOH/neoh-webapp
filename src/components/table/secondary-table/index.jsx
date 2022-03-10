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
        initialState: { pageSize: 10, pageIndex: 0 },
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
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Prev
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
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
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </>
    );
  };

  export default SecondaryTable; 