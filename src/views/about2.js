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
                        <div className={styles.headerText}>  <img src="https://neoh-logo.s3.amazonaws.com/neoh-logo.png" width="70" height="70" /> NEOH (NASA Earth Observations for Health) </div>
                        <div className="form">
                            <div className={styles.formTemplate}>
                                The NEOH project is striving to improve malaria control decision making in sub-Saharan Africa by developing and deploying technology for incorporating the latest NASA Earth observations for surface temperatures, precipitation, and vegetation health into the District Health Information Software 2 (DHIS2) used worldwide, including all sub-Saharan African countries.
                                <div className={styles.imageAlign}>
                                    <a target="_blank" href={require('./SLDHIS2image.png').default}>
                                        <img src={require('./SLDHIS2image.png').default} width="400" height="400" />
                                    </a>
                                    <span className={styles.imgDisp}> </span>
                                    <a target="_blank" href={require('./imergert_1080.png').default}>
                                        <img src={require('./imergert_1080.png').default} width="400" height="400" />
                                    </a>
                                </div>
                                <br/>
                                Researchers at UAH in collaboration with the Center for Disease Control and Prevention (CDC) and NASA are working to improve malaria control decision making in sub-Saharan Africa by developing and deploying a technology for incorporating the latest NASA Earth observations for surface temperatures, precipitation, and vegetation health into a widely used health management platform titled District Health Information Software 2 (DHIS2). DHIS2 is the preferred health management information system in 60 countries across four continents worldwide including all sub-Saharan African countries with whom CDC works. The integration of environmental data with disease information will provide disease control decision makers with situational view needed to optimize interventions. The results of this project will serve to extend the use of NASA Earth observation products to a new health user community. Successful fusion of Earth observation data with a health monitoring application will be applicable to other NASA data products and other diseases monitored through DHIS2.
                                <br/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )}

