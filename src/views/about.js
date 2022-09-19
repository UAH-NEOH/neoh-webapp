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



export const About = () => {


    return(
        <div className={styles.settings_row}>
            <div >
                <div className="form-style-5 padding-style">
                    <div className="form_container">
                        <div className="form">
                            <div className={styles.formTemplate}>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )}

