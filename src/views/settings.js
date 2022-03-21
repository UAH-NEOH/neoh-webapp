import React, { useState } from 'react'
import { Card } from '@dhis2/ui'
import styles from "./Form.module.css";
import {useDataMutation, useDataQuery, useAlert} from '@dhis2/app-runtime'
import { InputField, Button  } from '@dhis2/ui'
import {getData} from "./allQueryExec";
import {fetchDataElements} from "./allQueryExec";
import {SecondaryButton} from "../components";

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
        aggregationType:"SUM",
        domainType:"AGGREGATE",
        valueType:"NUMBER",
        name:"NEOH-Precipitation",
        shortName:"NEOH-precip",
        categoryCombo:{id:"bjDvmb4bfuf"},
        legendSets:[],
        aggregationLevels:[3,2,4,1]
    }),
}

const createTempDataElement = {
    type: 'create',
    resource: 'dataElements',
    data:  ({
        aggregationType:"SUM",
        domainType:"AGGREGATE",
        valueType:"NUMBER",
        name:"NEOH-Temperature",
        shortName:"NEOH-temp",
        categoryCombo:{id:"bjDvmb4bfuf"},
        legendSets:[],
        aggregationLevels:[3,2,4,1]
    }),
}
const createVegDataElement = {
    type: 'create',
    resource: 'dataElements',
    data:  ({
        aggregationType:"SUM",
        domainType:"AGGREGATE",
        valueType:"NUMBER",
        name:"NEOH-Vegetation",
        shortName:"NEOH-veg",
        categoryCombo:{id:"bjDvmb4bfuf"},
        legendSets:[],
        aggregationLevels:[3,2,4,1]
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
        <>
    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>



            <Card className={styles.cardLaySettings} dataTest="dhis2-uicore-card">

                <InputField type="text" label="Precipitation Data Element ID" name="precip" value={precipitationDataElementIds} onChange={ ({value}) => setPrecipitationDataElementId(value)} />

                <InputField type="text" label="Temperature Data Element ID" name="temp" value={temperatureDataElementId} onChange={({value}) => setTemperatureDataElementId(value)} />
                <InputField type="text" label="Vegetation Data Element ID" name="veg" value={vegetationDataElementId} onChange={({value}) => setVegetationDataElementId(value)} />
                <InputField type="text" label="DHIS2 district & Version" name="version" value={dhis_dist_version} onChange={({value}) => setDhis_dist_version(value)} />

                <br/>
                <div className={styles.button}>
                <Button onClick={createDataElements} primary>Generate</Button>
                &nbsp; &nbsp; &nbsp;
                <Button onClick={checkUserStore}  primary>Store</Button>
                &nbsp; &nbsp; &nbsp;
                {/*<Button onClick={removeUserDataStoreButton}  destructive>Remove</Button>*/}
                {/*&nbsp; &nbsp; &nbsp;*/}
                <Button onClick={showBox}  primary>Show</Button>
                </div>

            </Card>

    </div>
        </>
)}

