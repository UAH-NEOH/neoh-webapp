import React from 'react'




export const Status = () =>{
    const AWSCloudUrlStatus = 'https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_status';
    const stat ={
        "request_id": [
            "LB0hCRSBjn",
            "PhREyN8em5"]}
    // console.log(JSON.stringify(stat))
    fetch(AWSCloudUrlStatus, {
        method: 'post',
        headers: {
            'Accept':  '*/*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: JSON.stringify(stat)
    }).then(res=>res.text())
        .then(res => {
                // alert('Submitted the request to server');
                // console.log(res);
                var add = JSON.parse(res);
                console.log(add);
            }
        )

    const AWSCloudUrlResult = 'https://n9uowbutv1.execute-api.us-east-1.amazonaws.com/default/get_result';
    const result ={"request_id": "LB0hCRSBjn"}
    // console.log(JSON.stringify(stat))
    fetch(AWSCloudUrlResult, {
        method: 'post',
        headers: {
            'Accept':  '*/*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: JSON.stringify(result)
    }).then(res=>res.text())
        .then(res => {
                // alert('Submitted the request to server');
                // console.log(res);
                var add = JSON.parse(res);
                console.log(add);
            }
        )

    return(


    <div>
        <h1>Status</h1>

        <p>Status page</p>
    </div>
)}
