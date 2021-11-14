import React, {useState} from "react";
import {useDataQuery} from "@dhis2/app-runtime";

const readUserDataStore = {
    result: {
        resource: 'userDataStore/NEOH-dhis2/currentUserData'
    }
}
 const GetDataElementId = (props) => {


     const {loading, error, data, refetch} = useDataQuery(readUserDataStore)
     // console.log(JSON.stringify(data, null, 2))

     // refetch().then(r=> {console.log(r.result.value);
     //     // props.getInputData(r.result.value);
     // })


    props.getInputData(data);
    return (<> </>);
}

export default GetDataElementId;