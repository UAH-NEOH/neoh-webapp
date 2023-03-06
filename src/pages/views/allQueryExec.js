import {useDataQuery} from "@dhis2/app-runtime";

import React from "react";


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

export const fetchOrgLevel = async  () => {
    const {loading, error, data, refetch} = await useDataQuery(orgQuery)

    return data
}

export const fetchDataElements = async  () => {
    const {loading, error, data, refetch} = await useDataQuery(readUserDataStore)

    return data
}


