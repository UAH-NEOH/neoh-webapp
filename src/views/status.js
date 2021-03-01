import React from 'react'
import {useTable, usePagination} from 'react-table';
import styled, { css } from 'styled-components'
import { Card } from '@dhis2/ui'
import styles from "./Form.module.css";

const Styles = styled.div `
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`


function Table({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
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
            initialState: { pageIndex: 0 },
        },
        usePagination
    )
    return(
        <>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    {/* Pagination */}
    <div className="pagination">
        <br/>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
        </button>{' '}
        <span>
          Page{' '}
            <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
            <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
        </span>{' '}
        <select
            value={pageSize}
            onChange={e => {
                setPageSize(Number(e.target.value))
            }}
        >
            {[15, 7, 3].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
            ))}
        </select>
    </div>
        </>
    )
}

export const Status = () =>{
    const data = [
        {
            name: 'Leanne Graham',
            email: 'Sincere@april.biz',
            age: 28,
            status: 'Active'
        },
        {
            name: 'Ervin Howell',
            email: 'Shanna@melissa.tv',
            age: 35,
            status: 'Active'
        },
        {
            name: 'Clementine Bauch',
            email: 'Nathan@yesenia.net',
            age: 33,
            status: 'Inactive'
        },
        {
            name: 'Patricia Lebsack',
            email: 'Julianne@kory.org',
            age: 25,
            status: 'Active'
        },
        {
            name: 'Kamren',
            email: 'Hettinger@annie.ca',
            age: 42,
            status: 'Active'
        },
        {
            name: 'Dennis Schulist',
            email: 'Dach@jasper.info',
            age: 34,
            status: 'Inactive'
        },
        {
            name: 'Kurtis Weissnat',
            email: 'Hoeger@billy.biz',
            age: 44,
            status: 'Active'
        },
        {
            name: 'Maxime_Nienow',
            email: 'Sherwood@rosamond.me',
            age: 26,
            status: 'Active'
        },
        {
            name: 'Glenna Reichert',
            email: 'McDermott@dana.io',
            age: 30,
            status: 'Inactive'
        },
    ]
    const columns = [
        {
            Header: 'Dataset',
            accessor: 'dataset'
        }, {
            Header: 'Function',
            accessor: 'type'
        }, {
            Header: 'Status',
            accessor: 'status'
        }, {
            Header: 'Message',
            accessor: 'message'
        }, {
            Header: 'Date created',
            accessor: 'creation_time'
        }, {
            Header: 'View/Publish',
            accessor: 'view_publish'
        }
    ]

    const AWSCloudUrlStatus = 'https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_status';
    const stat ={
        "request_id": [
            "LB0hCRSBjn",
            "PhREyN8em5"]}
    // console.log(JSON.stringify(stat))
    fetch(AWSCloudUrlStatus, {
        method: 'post',
        headers: {
            'Accept':  '*/*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: JSON.stringify(stat)
    }).then(res=>res.text())
        .then(res => {
                // alert('Submitted the request to server');
                // console.log(res);
                var add = JSON.parse(res);
                console.log(add);
            }
        )

    const AWSCloudUrlResult = 'https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_result';
    const result ={"request_id": "LB0hCRSBjn"}
    // console.log(JSON.stringify(stat))
    fetch(AWSCloudUrlResult, {
        method: 'post',
        headers: {
            'Accept':  '*/*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: JSON.stringify(result)
    }).then(res=>res.text())
        .then(res => {
                // alert('Submitted the request to server');
                // console.log(res);
                var add = JSON.parse(res);
                console.log(add);
            }
        )

    return(
        <div>
            <Card className={styles.cardLay} dataTest="dhis2-uicore-card">
                <Styles>
                    <Table
                        data={data}
                        columns={columns}
                    />
                </Styles>
            </Card>
        </div>
)}
