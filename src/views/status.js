import React, { useEffect, useState } from "react";
import {useTable, usePagination} from 'react-table';
import styled, { css } from 'styled-components'
import { Card } from '@dhis2/ui'
import store from '../state/store'
import * as actions from '../state/action'
import styles from "./Form.module.css";
import {useDataMutation} from "@dhis2/app-runtime";


const mutation = {
    resource: 'dataValueSets',
    type: 'create',
    data: ({ val }) => ({
        dataValues: val
    }),
}


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
                            return( <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            )
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
        {' '}
        {/*<button onClick={clearAll}>Clear All</button>*/}
    </div>
        </>

)}


// function clearAll() {
//     store.dispatch(actions.requestClear());
//
// }



export const Status = () =>{

    const [loadingData, setLoadingData] = useState(true);
    const [tableDat, setTableDat] = useState('')

    const [mutate, { loadings }] = useDataMutation(mutation, {
        onComplete: response => {
            // console.log(JSON.stringify(response))
                        const add = response;
                        alert(add.status +': '+ add.description+
                            '. Imported: ' + add.importCount.imported + ' Updated: ' + add.importCount.updated + ' Ignored: ' + add.importCount.ignored + ' Deleted: ' + add.importCount.deleted)
                        // console.log(add);
                        // console.log(add.status);
                        // console.log(add.description);


        },
        onError: error => {console.log(JSON.stringify(error))}
    })

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
            Header: 'Publish',
            accessor: 'publish',
            Cell: ({ cell }) => (
                <button value={cell.row.values.creation_time} onClick={getResults}>
                    Publish
                </button>


            )
        }
    ]

    useEffect(() => {
        async function getRow() {
            let rData = {"request_id": []}
            let updatedRequest = []

            updatedRequest = store.getState()
            for (let obj of updatedRequest.reducer) {

                rData['request_id'].push(obj.requestId)
            }
            const AWSCloudUrlStatus = 'https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_status';
           await fetch(AWSCloudUrlStatus, {
                method: 'post',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'text/plain'
                },
                mode: 'cors',
                body: JSON.stringify(rData)
            }).then(res => res.text())
                .then(res => {
                        // alert('Submitted the request to server');
                        //  console.log(res);
                        let addElements = JSON.parse(res);
                        let count = 0;

                        for (const obj of addElements){
                            if(obj.status==='success'){
                                count = count + 1;
                            }
                            if (count === Object.keys(addElements).length){
                                for (let i = 1; i < 999; i++)
                                    clearInterval(i);
                            }
                        }
                        setTableDat(addElements)
                        setLoadingData(false);

                    }
                )

        }

        if (loadingData) {

        let intervalId = setInterval(function() {
                getRow();

            }, 3000);

        }
    }, []);

    function getResults(event) {

        // console.log(event.target.value)
        const identifier = event.target.value
        const itm = tableDat.find(d => d.creation_time === identifier)
        console.log(itm)
        console.log(itm.request_id)
        if(itm.status.toLowerCase() === "success"){

        const AWSCloudUrlResult = 'https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_result';
        const result ={"request_id": itm.request_id.toString()}
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
                    console.log(JSON.stringify(add.result.dataValues));


                const resp = async () => {
                    await  mutate( {val: add.result.dataValues})
                }
                // console.log(res)
                resp().then(r => {})

                    // const dhisURL = 'https://neoh-dhis2.itsc.uah.edu/api/dataValueSets'
                    //
                    // fetch(dhisURL, {
                    //     method: 'post',
                    //     headers: {
                    //         'Accept':  '*/*',
                    //         'Content-Type': 'application/json'
                    //     },
                    //     mode: 'cors',
                    //     body: JSON.stringify(add.result)
                    // }).then(res=>res.text())
                    //     .then(res => {
                    //             // alert('Submitted the request to server');
                    //             // console.log(res);
                    //             const add = JSON.parse(res);
                    //             alert(add.status +': '+ add.description+
                    //                 '. Imported: ' + add.importCount.imported + ' Updated: ' + add.importCount.updated + ' Ignored: ' + add.importCount.ignored + ' Deleted: ' + add.importCount.deleted)
                    //             console.log(add);
                    //             console.log(add.status);
                    //             console.log(add.description);
                    //         }
                    //     )


                }
            )
        }else {
            alert('Not ready to Publish. Please wait till the process is successful')
        }

    }


    return(
        <div>
            {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
            {loadingData ? (
                <p>Loading ...</p>
            ) : (
            <Card className={styles.cardLay} dataTest="dhis2-uicore-card">
                <Styles>
                    <Table
                        defaultPageSize={15}
                        data={tableDat}
                        columns={columns}
                    />
                </Styles>


            </Card>
            )}
        </div>
)}
