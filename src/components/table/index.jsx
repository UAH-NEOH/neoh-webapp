import React, { useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import "./style.css";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const Table = ({ columns, data, onSelect, selectedRows }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 8,
        pageIndex: 0,
        selectedRowIds: selectedRows,
      },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "request_id",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    if (Object.keys(selectedRowIds).length > 0) {
      var temp = [];
      selectedFlatRows.map((d) => {
        temp.push(d.original);
      });
      onSelect(temp);
    } else {
      onSelect([]);
    }
  }, [selectedRowIds, selectedFlatRows, onSelect]);

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
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="24">24</option>
            <option value="32">32</option>
          </select>
        </div>
      </div>
      <div className="table_container">
        <code>{Object.keys(selectedRowIds).length} row(s) selected for deletion </code>
      </div>
    </>
  );
};

export default Table;
