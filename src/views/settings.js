import React, { useState } from 'react'
import { Card } from '@dhis2/ui'
import styles from "./Form.module.css";
import {useDataMutation, useDataQuery, useAlert} from '@dhis2/app-runtime'
import { InputField, Button  } from '@dhis2/ui'


const readUserDataStore = {
    result: {
        resource: 'userDataStore/NEOH-dhis2/currentUserData'
    }
}

const deleteUserDataStore = {
    type: 'delete',
    resource: 'userDataStore/NEOH-dhis2/currentUserData',
}


const updateUserDataStore = {
    type: 'update',
    resource: 'userDataStore/NEOH-dhis2/currentUserData',
    data: ({ value }) => ({
        value
    }),
}

const createUserDataStore = {
    type: 'create',
    resource: 'userDataStore/NEOH-dhis2/currentUserData',
    data: ({ value }) => ({
        value
    }),
}

const createPrecipDataElement = {
    type: 'create',
    resource: 'dataElements',
    data:  ({
        aggregationType:"AVERAGE",
        domainType:"AGGREGATE",
        valueType:"NUMBER",
        name:"NEOH-Precipitation",
        shortName:"NEOH-precip",
        categoryCombo:{id:"bjDvmb4bfuf"},
        legendSets:[],
        aggregationLevels:[3,2,4,1],
        zeroIsSignificant: true
    }),
}

const createTempDataElement = {
    type: 'create',
    resource: 'dataElements',
    data:  ({
        aggregationType:"AVERAGE",
        domainType:"AGGREGATE",
        valueType:"NUMBER",
        name:"NEOH-Temperature",
        shortName:"NEOH-temp",
        categoryCombo:{id:"bjDvmb4bfuf"},
        legendSets:[],
        aggregationLevels:[3,2,4,1],
        zeroIsSignificant: true
    }),
}
const createVegDataElement = {
    type: 'create',
    resource: 'dataElements',
    data:  ({
        aggregationType:"AVERAGE",
        domainType:"AGGREGATE",
        valueType:"NUMBER",
        name:"NEOH-Vegetation",
        shortName:"NEOH-veg",
        categoryCombo:{id:"bjDvmb4bfuf"},
        legendSets:[],
        aggregationLevels:[3,2,4,1],
        zeroIsSignificant: true
    }),
}

const readPrecipDataElement = {
    result: {
        resource: 'dataElements',
        params: {
            filter: 'displayName:ilike:NEOH'

        }
    }
}



export const Settings = () => {
    let [precipitationDataElementIds, setPrecipitationDataElementId]= useState('');
    let [temperatureDataElementId, setTemperatureDataElementId] = useState('');
    let [vegetationDataElementId, setVegetationDataElementId] = useState('');
    let [dhis_dist_version, setDhis_dist_version] = useState('');


    const [createPrecip, { loadingsPrecip }] =  useDataMutation(createPrecipDataElement, {

        onComplete:  response => {
            // console.log(response['response']['uid']);
            setPrecipitationDataElementId((prev) => response.response.uid)
            setDhis_dist_version((prev) => 'sierra_leone_1');
            show({msg:'Created Data Element - NEOH-Precipitation'})
        },
        onError: error => {
            console.log(JSON.stringify(error))
            show({msg:'NEOH-Precipitation - Data Element already exists'})
        }
    });

    const [createTemp, { loadingsTemp }] =  useDataMutation(createTempDataElement, {

        onComplete: response => {
            console.log(JSON.stringify(response));
            // console.log(response.response.uid);
            // console.log(response['response']['uid']);
            setTemperatureDataElementId(response.response.uid)
            setDhis_dist_version((prev) => 'sierra_leone_1');
            show({msg:'Created Data Element - NEOH-Temperature'})

        },
        onError: error => {console.log(JSON.stringify(error))
            show({msg:'NEOH-Temperature - Data Element already exists'})
        }
    });

    const [createVeg, { loadingsVeg }] =  useDataMutation(createVegDataElement, {

        onComplete: response => {
            console.log(JSON.stringify(response));
            // console.log(response.response.uid);
            // console.log(response['response']['uid']);
            setVegetationDataElementId(response.response.uid)
            setDhis_dist_version((prev) => 'sierra_leone_1');
            show({msg:'Created Data Element - NEOH-Vegetation'})
        },
        onError: error => {console.log(JSON.stringify(error))
            show({msg:'NEOH-Vegetation - Data Element already exists'})
        }
    });

    const [create, { loadings }] = useDataMutation(createUserDataStore, {
        variables:{
            value: {
                precipitationDataElementId: precipitationDataElementIds,
                temperatureDataElementId: temperatureDataElementId,
                vegetationDataElementId: vegetationDataElementId,
                dhis_dist_version: dhis_dist_version,
                created: true
            }
        },
        onComplete: respone => {console.log(JSON.stringify(respone))
            console.log('4')
        },
        onError: error => {console.log(JSON.stringify(error))}
    })

    const [update, { load }] = useDataMutation(updateUserDataStore, {
        onComplete: respone => {console.log(JSON.stringify(respone))

        },
        onError: error => {console.log(JSON.stringify(error))}
    })

    const [remove] = useDataMutation(deleteUserDataStore, {
        onComplete: respone => {console.log(JSON.stringify(respone))},
        onError: error => {console.log(JSON.stringify(error))}
    })


    const createDatastoreVariables = async() => {
        await  create()

    }
    const updateUserDataStoreButton = async () => {
        await update({
            value:{
                precipitationDataElementId: precipitationDataElementIds,
                temperatureDataElementId: temperatureDataElementId,
                vegetationDataElementId: vegetationDataElementId,
                dhis_dist_version: dhis_dist_version
            }
        })

        show({msg:'Updated the Data store'})
    }



    const removeUserDataStoreButton = async () => {
        await remove()
    }
    const checkUserStore = () => {
        createDatastoreVariables();
        updateUserDataStoreButton().then()

    }

    const createDataElements = async () => {
        createPrecip();
        createTemp();
        createVeg();
        getDataElementID()
        handledhis2distData()
        createDatastoreVariables();

    };
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    const getDataElementID = () => {
        refetch().then(r =>{
            if(r){
                // console.log(r.result.dataElements)
                let tmparray = r.result.dataElements;
                tmparray.map((orgUnit) => {
                    if(orgUnit.displayName==="NEOH-Precipitation") {
                        console.log('2');
                        // console.log(orgUnit.id);
                        setPrecipitationDataElementId((prev) =>orgUnit.id);


                    }
                    if(orgUnit.displayName==="NEOH-Vegetation") {
                        // console.log('v');
                        // console.log(orgUnit.id);

                        setVegetationDataElementId((prev) =>orgUnit.id);
                    }
                    if(orgUnit.displayName==="NEOH-Temperature") {
                        // console.log('t');
                        // console.log(orgUnit.id);
                        setTemperatureDataElementId((prev) =>orgUnit.id);
                    }

                    // console.log(orgUnit.id);
                });
                if(tmparray.length===0) {
                    // console.log('No Data to show');
                    // console.log(orgUnit.id);
                    show({msg:'No Data to show'})

                }
            }
        })
    };


    const handledhis2distData = () => {
        if(data) {
            // console.log('3')
            // console.log(data.result.value.dhis_dist_version);
            setDhis_dist_version(data.result.value.dhis_dist_version)
        }
    };

    const showBox = () => {
        handledhis2distData()
        getDataElementID()
    }

    // console.log(data)

    const {loading, error,  refetch} =  useDataQuery(readPrecipDataElement)
    const { data} = useDataQuery(readUserDataStore)

    const { show } = useAlert(({msg})=>msg)

    return(
        <div className={styles.settings_row}>
            <div className={styles.col1}>
                <div className="form-style-5 padding-style">
                    <div className="form_container">
                        <div className={styles.headerText}> Data Element ID Information </div>
                        <div className="form">
                            <div className={styles.formTemplate}>

                                <label htmlFor="precip" className={styles.labelClass}>Precipitation Data Element ID</label>
                                <InputField type="text" value={precipitationDataElementIds} onChange={ ({value}) => setPrecipitationDataElementId(value)} />

                                <label htmlFor="temp" className={styles.labelClass}>Temperature Data Element ID</label>
                                <InputField type="text" value={temperatureDataElementId} onChange={({value}) => setTemperatureDataElementId(value)} />

                                <label htmlFor="veg" className={styles.labelClass}>Vegetation Data Element ID</label>
                                <InputField type="text"  value={vegetationDataElementId} onChange={({value}) => setVegetationDataElementId(value)} />

                                <label htmlFor="version" className={styles.labelClass}>DHIS2 district & Version</label>
                                <InputField type="text"  value={dhis_dist_version} onChange={({value}) => setDhis_dist_version(value)} />

                                <br/>
                            </div>
                        </div>
                                <div className={styles.button_settings}>
                                    <Button className={styles.button_secondary} onClick={createDataElements}>Generate</Button>
                                    &nbsp; &nbsp; &nbsp;
                                    <Button className={styles.button_secondary} onClick={checkUserStore} >Store</Button>
                                    &nbsp; &nbsp; &nbsp;
                                    {/*<Button onClick={removeUserDataStoreButton}  destructive>Remove</Button>*/}
                                    {/*&nbsp; &nbsp; &nbsp;*/}
                                    <Button className={styles.button_secondary} onClick={showBox} >Show</Button>
                                </div>
                    </div>

            </div>
        </div>
        </div>
    )}

