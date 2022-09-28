import React, { useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime'
import SecondaryTable from "../components/table/secondary-table";
import {Loader, SecondaryButton} from "../components";
import styles from "./Form.module.css";
import {fetchOrgLevel} from "../views/allQueryExec";
import bootstrap from "./bootstrap.css"

const myQuery = {
    results: {
        resource: 'programs',
        params: {
            pageSize: 5,
            fields: ['id', 'displayName'],
        },
    },
}

const query2 = {
    indicators: {
        resource: 'indicators',
        params: ({ page }) => ({
            order: 'displayName:asc',
            page,
            pageSize: 10,
        }),
    },
}

const readPrecipDataElement = {
    result: {
        resource: 'dataElements',
        params: {
            filter: 'displayName:ilike:NEOH'

        }
    }
}

const columns = [
    {
        Header: "Year",
        accessor: "year"
    },
    {
        Header: "Jan",
        accessor: "jan",
    },
    {
        Header: "Feb",
        accessor: "feb",
    },
    {
        Header: "Mar",
        accessor: "mar",
    },
    {
        Header: "Apr",
        accessor: "apr",
    },
    {
        Header: "May",
        accessor: "may",
    },
    {
        Header: "June",
        accessor: "june",
    },
    {
        Header: "Jul",
        accessor: "jul",
    },
    {
        Header: "Aug",
        accessor: "aug",
    },
    {
        Header: "Sep",
        accessor: "sep",
    },
    {
        Header: "Oct",
        accessor: "oct",
    },
    {
        Header: "Nov",
        accessor: "nov",
    },
    {
        Header: "Dec",
        accessor: "dec",
    }

];


const defaultData = [
    {
        year: 2000,
        jan: 'X',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''

    },
    {
        year: 2001,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'X',
        oct:'',
        nov:'',
        dec:''

    },
    {
        year: 2002,
        jan: '',
        feb: 'X',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'X',
        sep:'',
        oct:'',
        nov:'',
        dec:'X'
    },
    {
        year: 2003,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'X',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'X',
        dec:''
    },
    {
        year: 2004,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'X',
        jul:'',
        aug:'',
        sep:'X',
        oct:'',
        nov:'',
        dec:'X'
    },
    {
        year: 2005,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'X',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2006,
        jan: 'X',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2007,
        jan: '',
        feb: '',
        mar: '',
        apr:'X',
        may:'',
        june:'',
        jul:'X',
        aug:'',
        sep:'',
        oct:'X',
        nov:'',
        dec:''
    },
    {
        year: 2008,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'X',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:'X'
    },
    {
        year: 2009,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'X',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec: 'X'
    },
    {
        year: 2010,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'X',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2011,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul: 'X',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2012,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may: 'X',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2013,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june: 'X',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'X',
        dec:''
    },
    {
        year: 2014,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2015,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2016,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2017,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2018,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2019,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2020,
        jan: 'X',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2021,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'X',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
    {
        year: 2022,
        jan: '',
        feb: '',
        mar: '',
        apr:'',
        may:'',
        june:'',
        jul:'',
        aug:'',
        sep:'',
        oct:'',
        nov:'',
        dec:''
    },
]


const query = {
    results: {
        resource: 'analytics/dataValueSet.json',
        params: ({ a, b, c }) => ({
            "dimension":["ou:"+"LEVEL-"+a, "pe:"+b, "dx:"+c],
        })
    },
}

const DataLoad = () => {
    const {data} =  useDataQuery(readPrecipDataElement)
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedDataset, setSelectedDataset] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [dataSave, setData] = useState(() => [...defaultData])
    const [selectedOrgUnit, setSelectedOrgUnit] = useState("");
    const [flag, setFlag] = useState();
    const [loadingVal, setLoading] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("");
    const [orgUnits, setOrganizationUnits] = useState([]);
    const {refetch} = useDataQuery(query)

    fetchOrgLevel().then(r=>{
        if(r){
            // console.log(r.result)
            setOrganizationUnits(prevState => r.result)
        }

    })

    const filterDate =  (data) => {
        if(selectedEndDate == ""){
            return data.year == selectedStartDate;
        }
        return data.year >= selectedStartDate &&  data.year <= selectedEndDate;
    }

    const handleStartDateSelection = (e) => {
        setFlag(0);
        e.persist();
        if(e.target.value !== null) {
            setSelectedStartDate((prev) => e.target.value);
        }
    };

    const handleEndDateSelection = (e) => {
        setFlag(0);
        e.persist();
        if(e.target.value !== null) {
            setSelectedEndDate((prev) => e.target.value);
        }
    };

    const handleDatasetSelection = (e) => {
        setFlag(0);
        e.persist();
        if(e.target.value !== null) {
            setSelectedDataset((prev) => e.target.value);
        }
    };

    const handleOrgUnitSelection = (e) => {
        setFlag(0);
        e.persist();
        if(e.target.value !== null) {
            setSelectedOrgUnit((prev) => e.target.value);
        }
    };

    const createObject = (data) => {
        console.log('selectedOrgUnit', selectedOrgUnit);
        return {
            year: data[0],
            jan: data[1],
            feb: data[2],
            mar: data[3],
            apr: data[4],
            may: data[5],
            june: data[6],
            jul: data[7],
            aug: data[8],
            sep: data[9],
            oct: data[10],
            nov: data[11],
            dec: data[12]
        }
    }

    const handleButtonClick = async (e) => {
       /* let xy = defaultData;
        setData(xy.filter(filterDate));*/

        if(selectedDataset === ""){
            setHasError(true);
            setError("Select the Dataset");
            return;
        }

        if(selectedOrgUnit === ""){
            setHasError(true);
            setError("Select the Organizational Unit Level");
            return;
        }

        if (selectedStartDate === ""){
            setHasError(true);
            setError("Please select start date!");
            return;
        }

        if(selectedEndDate !== "" && selectedStartDate > selectedEndDate){
            setHasError(true);
            setError("Start date can not be greater than End date");
            return;
        }

        setHasError(false);

        let finalDataArr = [];
        let startVal = parseInt(selectedStartDate);
        let endVal = selectedEndDate != ""?selectedEndDate:startVal;

        while(startVal <= parseInt(endVal)){
            let dataViewer = [];
            let month = 1;
            let initStartDate;
            dataViewer.push(startVal);
            while(month <= 12){
                if(month < 10){
                    initStartDate = startVal+'0'+month;
                }else{
                    initStartDate = startVal +"" +month;
                }

                let dataElement;

                if(data && data.result){
                    if("precipitation" === selectedDataset){
                        dataElement = data.result.dataElements[0].id
                    }else if("temperature" === selectedDataset){
                        dataElement = data.result.dataElements[1].id
                    }else if("vegetation" === selectedDataset){
                        dataElement = data.result.dataElements[2].id
                    }else{
                        dataElement = 0;
                    }
                }
                await refetch({
                    b: parseInt(initStartDate),
                    c: dataElement,
                    a: selectedOrgUnit
                }).then( r=> {
                    if(r.results.dataValues && r.results.dataValues.length > 0){
                        dataViewer.push('X');
                    }else{
                        dataViewer.push('');
                    }
                    setFlag(0);
                    setLoading(1);
                });
                month = month + 1;
            }
            finalDataArr.push(createObject(dataViewer));
            startVal = startVal + 1;
        }
        setData(finalDataArr);
        setFlag(1);
        setLoading(0);
    };


    return (
        <div>
            <div className={styles.row}>
                <div className={styles.col1}>
                    <div className="form-style-5 padding-style">
                        <div className="form_container">
                            <div className={styles.headerText}>  Imported Data </div>
                            <div className={styles.headerText2}> * Data Refreshed Periodically </div>
                            <div className="form">
                                <div className={styles.formTemplate}>
                                    <label htmlFor="dataset" className={styles.labelClass}>Earth Observation Datasets</label>
                                    <select id="dataset" name="dataset" onChange={handleDatasetSelection}>
                                        <option value="" selected="true" disabled="disabled">Select Earth Observation Dataset</option>
                                        <option value="precipitation">Precipitation</option>
                                        <option value="temperature">Temperature</option>
                                        <option value="vegetation">Vegetation</option>
                                    </select>

                                    <label htmlFor="org_unit"  className={styles.labelClass}>Organizational Unit Levels</label>
                                    <select id="org_unit" name="org_unit" onChange={handleOrgUnitSelection}>
                                        <option value="" selected="true" disabled="disabled">Select Organizational Unit Level</option>
                                        {orgUnits.map((orgUnit) => {
                                            return (
                                                <option id="org_unit" value={orgUnit.level}>
                                                    {orgUnit.name}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    <label htmlFor="start_date" className={styles.labelClass}>Start Year</label>
                                    <input
                                        type="number"
                                        className ={styles.input_data_viewer}
                                        id="start_date"
                                        name="start_date"
                                        min={"2000"}
                                        max={"2099"}
                                        step={"1"}

                                        onChange={handleStartDateSelection}
                                    />

                                    <label htmlFor="end" className={styles.labelClass}>End Year</label>
                                    <input
                                        type="number"
                                        className ={styles.input_data_viewer}
                                        id="end_date"
                                        name="end_date"
                                        min={"2000"}
                                        max={"2099"}
                                        step={"1"}
                                        onChange={handleEndDateSelection}
                                    />
                                    <br/>
                                </div>
                            </div>
                            {hasError && <p className="errormsg">{error}</p>}
                            <div className={styles.button}>
                                <SecondaryButton
                                    btnText="Submit"
                                    Class="button_secondary"
                                    btnLink={handleButtonClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.col2}>
                    {flag ?
                        <div><div className={styles.textLabels}>{selectedDataset.charAt(0).toUpperCase() + selectedDataset.slice(1)} {orgUnits.find(({ level }) => level == selectedOrgUnit)?orgUnits.find(({ level }) => level == selectedOrgUnit).displayName:"" } {selectedEndDate !== ""? "("+selectedStartDate +" - "+selectedEndDate+")":selectedStartDate}</div>
                            <SecondaryTable
                            columns={columns}
                            data={dataSave}
                            /> </div>: loadingVal == 1?<div className="loader_position">
                            {
                                <Loader  displayText="Loading Data! Please wait" className={styles.noData}/>
                            }
                        </div>:<div className={styles.noData}> Table shown once you pick the Dataset, Organizational Unit Levels, the Start, and End Year </div>}  </div>
            </div>
        </div>
    )
}

export default DataLoad;