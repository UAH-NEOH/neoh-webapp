import React, {useState} from "react";
import {useDataQuery} from "@dhis2/app-runtime";



const levQuery = {
    results: {
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
 const GetOrgUnits = (props) => {


     const {loading, error, data, refetch} = useDataQuery(levQuery, {
         variables: {
             orgLevel: org_level
         }
     })
     console.log(data)

     // refetch().then(r=> {console.log(r.result.value);
     //     // props.getInputData(r.result.value);
     // })

    // props.getInputData(data);
    return (<> </>);
}

export default GetOrgUnits;