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
                        <div className={styles.headerText}>  <img src="https://neoh-logo.s3.amazonaws.com/neoh-logo.png" width="70" height="70" /> NASA Earth Observations for Health (NEOH) </div>
                        <div className="form">
                            <div className={styles.formTemplate}>
                                The <span className={styles.textHeader}> Earth Observations Data Import Wizard </span> was designed to request, retrieve, and import NASA Earth observations such as <a href="https://gpm.nasa.gov/data/imerg"  target="_blank">precipitation</a>, <a href="https://modis.gsfc.nasa.gov/data/dataprod/mod11.php"  target="_blank">surface temperature</a>, and <a href="https://modis.gsfc.nasa.gov/data/dataprod/mod13.php"  target="_blank">vegetation health</a> into DHIS2.
                                <br/>
                                <br/>
                                <div className={styles.headerTextLeft}>Precipitation:</div>
                                The precipitation data available with this plugin is NASA’s IMERG Product. The Integrated Multi-satellitE Retrievals for GPM -- combines information from whatever constellation of satellites are operating in Earth orbit at a given time, to estimate precipitation over the majority of the Earth's surface.
                                <br/>
                                <br/>
                                <div className={styles.headerTextLeft}>
                                    Surface Temperatures:</div>
                                The surface temperature data available with this plugin is NASA’s MODIS  Land Surface Temperature (LST) and Emissivity daily data which are retrieved at 1km pixels by the generalized split-window algorithm and at 6km grids by the day/night algorithm. In the split-window algorithm, emissivity's in bands 31 and 32 are estimated from land cover types, atmospheric column water vapor and lower boundary air surface temperature are separated into tractable sub-ranges for optimal retrieval. In the day/night algorithm, daytime and nighttime LSTs and surface emissivity's are retrieved from pairs of day and night MODIS observations in seven TIR bands. The product is comprised of LSTs, quality assessment, observation time, view angles, and emissivity's.
                                <br/>
                                <br/>
                                <div className={styles.headerTextLeft}>
                                    Vegetation Health:</div>
                                The vegetation health data available with this plugin is NASA’s MODIS Normalized Difference Vegetation Index (NDVI) product. MODIS NDVI, produced on 16-day intervals and at multiple spatial resolutions, provide consistent spatial and temporal comparisons of vegetation canopy greenness, a composite property of leaf area, chlorophyll and canopy structure. The NDVI product is derived from atmospherically-corrected reflectance in the red, near-infrared, and blue wavebands, which provides continuity with NOAA's AVHRR NDVI time series record for historical and climate applications.

                                <br/>
                                <br/>
                                <div className={styles.headerTextLeft}></div>
                                More information about this plugin can be found at the project’s website <a href="https://www.itsc.uah.edu/home/projects/neoh-nasa-earth-observations-health"  target="_blank">NASA Earth Observations for Health</a>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )}