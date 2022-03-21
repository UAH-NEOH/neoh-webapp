import {useDataMutation, useDataQuery} from "@dhis2/app-runtime";
import {Button} from "@dhis2/ui";
import React from "react";

const levQuery = {
    result: {
        resource: 'organisationUnits',
        params: ({orgLevel}) => {
            return {
                fields: 'id, name, level, geometry, parent',
                order: 'level',
                paging: false,
                level: orgLevel
            }
        },
    },
}

const orgQuery = {
    result: {
        resource: 'filledOrganisationUnitLevels',
    },
}

const readUserDataStore = {
    result: {
        resource: 'userDataStore/NEOH-dhis2/currentUserData'
    }
}

const createDataElement = {
    type: 'create',
    resource: 'dataElements',
    data: ({ value }) => ({
        ...value
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


export const fetchOrgBoundary = async  (level) => {
    const {loading, error, data, refetch} = await useDataQuery(levQuery, {
        variables: {
            orgLevel: level
        }
    })

    console.log(level)
    return data
}
export const fetchOrgLevel = async  () => {
    const {loading, error, data, refetch} = await useDataQuery(orgQuery)

    // console.log(data)
    return data
}

export const fetchDataElements = async  () => {
    const {loading, error, data, refetch} = await useDataQuery(readUserDataStore)

    return data
}
export const getData = async () => {
    const {loading, error, data, refetch} = await useDataQuery(readPrecipDataElement)
    console.log(data)
    return data
}

export const GetPrecipDataElement = async (props) => {
    let precip_dataElement_id;

    const [create, { loadings }] = await useDataMutation(createDataElement, {
        variables:{
            value: {
                aggregationType:"SUM",
                domainType:"AGGREGATE",
                valueType:"NUMBER",
                name:"ygchk",
                shortName:"trbve",
                categoryCombo:{id:"bjDvmb4bfuf"},
                legendSets:[],
                aggregationLevels:[3,2,4,1]
            }
        },
        onComplete: respone => {
            console.log(JSON.stringify(respone))
            console.log(respone.response.uid)
            console.log(respone['response']['uid'])
            precip_dataElement_id = respone.response.uid
        },
        onError: error => {console.log(JSON.stringify(error))}
    })

    return precip_dataElement_id;
}
