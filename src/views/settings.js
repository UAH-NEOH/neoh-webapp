import React, { useState } from 'react'
import { Card } from '@dhis2/ui'
import styles from "./Form.module.css";
import {useDataMutation, useDataQuery, useAlert} from '@dhis2/app-runtime'
import { InputField, Button,  } from '@dhis2/ui'


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

export const Settings = () => {
    let [precipitationDataElementIds, setPrecipitationDataElementId]= useState('');
    let [temperatureDataElementId, setTemperatureDataElementId] = useState('');
    let [vegetationDataElementId, setVegetationDataElementId] = useState('');
    let [dhis_dist_version, setDhis_dist_version] = useState('');


    const [create, { loadings }] = useDataMutation(createUserDataStore, {
        variables:{
            value: {
                precipitationDataElementId: 'oYJ51K7AJvQ',
                temperatureDataElementId: 'afWPpfBwIaa',
                vegetationDataElementId: 'bUBLqMJTkp4',
                dhis_dist_version: 'guinea_1',
                created: true
            }
        },
        onComplete: respone => {console.log(JSON.stringify(respone))},
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
        refetch().then(r=> {console.log(r.result.value)
            setPrecipitationDataElementId(r.result.value.precipitationDataElementId);
            setTemperatureDataElementId(r.result.value.temperatureDataElementId);
            setVegetationDataElementId(r.result.value.vegetationDataElementId);
            setDhis_dist_version(r.result.value.dhis_dist_version);

        })
    }
    const updateUserDataStoreButton = async () => {
        await update({ value:{
            precipitationDataElementId: precipitationDataElementIds,
            temperatureDataElementId: temperatureDataElementId,
            vegetationDataElementId: vegetationDataElementId,
            dhis_dist_version: dhis_dist_version}}
            )
        refetch().then(r=> {
            show()
        })
    }
    const updateUserDataStoredisplay =  () => {
        createDatastoreVariables().then()
        refetch().then(r=> {console.log(r.result.value)
            setPrecipitationDataElementId(r.result.value.precipitationDataElementId);
            setTemperatureDataElementId(r.result.value.temperatureDataElementId);
            setVegetationDataElementId(r.result.value.vegetationDataElementId);
            setDhis_dist_version(r.result.value.dhis_dist_version);

        })
    }

    const removeUserDataStoreButton = async () => {
        await remove()
        refetch().then(r=> console.log(r.result.value))
    }
    const checkUserStore = () => {

        updateUserDataStoreButton().then()
    }


    const {loading, error, data, refetch} = useDataQuery(readUserDataStore)

    const { show } = useAlert('Updated the Data store')

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
                <Button onClick={updateUserDataStoredisplay} primary>Show</Button>
                &nbsp; &nbsp; &nbsp;
                <Button onClick={checkUserStore}  primary>Update</Button>
                    {/*&nbsp; &nbsp; &nbsp;*/}
                    {/*<Button onClick={removeUserDataStoreButton}  primary>Remove</Button>*/}

                </div>

            </Card>

    </div>

        </>
)}
