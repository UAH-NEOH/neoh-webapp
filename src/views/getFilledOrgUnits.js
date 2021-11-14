import React, {useState} from "react";
import {useDataQuery} from "@dhis2/app-runtime";



const orgQuery = {
    result: {
        resource: 'filledOrganisationUnitLevels',
    },
}
 const GetFilledOrgUnits = (props) => {


     const {loading, error, data, refetch} = useDataQuery(orgQuery)
     console.log(data)

     // refetch().then(r=> {console.log(r.result.value);
     //     // props.getInputData(r.result.value);
     // })

    // props.getInputData(data);
    return (<> </>);
}

export default GetFilledOrgUnits;