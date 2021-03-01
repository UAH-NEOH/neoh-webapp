import React, { useEffect, useState } from "react";
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
    const [loadingData, setLoadingData] = useState(true);
    const [tableDat, setTableDat] = useState('')
    let data = []
    let useData = []
    // {
    //     dataset: '',
    //         type: '',
    //     status: '',
    //     message: ,
    //     creation_time: ''
    // }
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
    useEffect(() => {
        async function getRow() {
            let data = []
            const AWSCloudUrlStatus = 'https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_status';
            const stat = {
                "request_id": [
                    "LB0hCRSBjn",
                    "PhREyN8em5"]
            }
            // console.log(JSON.stringify(stat))
            const response = await fetch(AWSCloudUrlStatus, {
                method: 'post',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'text/plain'
                },
                mode: 'cors',
                body: JSON.stringify(stat)
            }).then(res => res.text())
                .then(res => {
                        // alert('Submitted the request to server');
                        // console.log(res);
                        var addElements = JSON.parse(res);
                        // console.log(addElements);
                        //
                        // data = [...addElements]
                        // console.log(data)
                        setTableDat(addElements)
                        setLoadingData(false);
                        // setTableDat( data => [data, addElements])
                        // console.log(Object.keys(data).map(key => console.log(key)))
                    }
                )

        }
        if (loadingData) {

            getRow();
        }
    }, []);


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
                const add = JSON.parse(res);
                console.log(add);
            }
        )

    return(
        <div>
            {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
            {loadingData ? (
                <p>Loading Please wait...</p>
            ) : (
            <Card className={styles.cardLay} dataTest="dhis2-uicore-card">
                <Styles>
                    <Table
                        data={tableDat}
                        columns={columns}
                    />
                </Styles>
            </Card>
            )}
        </div>
)}
