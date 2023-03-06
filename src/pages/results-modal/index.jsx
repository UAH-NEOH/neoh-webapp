import React, { useState, useEffect } from "react";
import { fetchResultData as fetchResultService } from "../../services/api";
import {
  SecondaryButton,
  Card,
  Loader,
  SecondaryTable,
} from "../../components";
import "./style.css";

const Results = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [resultsList, setResultsList] = useState([]);
  const [requestId, setRequestId] = useState(props.id);

  const columns = [
    {
      Header: "Period",
      accessor: "period",
    },
    {
      Header: "OrgUnit",
      accessor: "orgUnit",
    },
    {
      Header: "Value (mm)",
      accessor: "value",
    },
  ];

  const fetchResults = (id) => {
    setIsLoading(true);

    const body = JSON.stringify({
      request_id: id,
    });

    fetchResultService(body)
      .finally(() => setIsLoading(false))
      .then((response) => {
        if (!!response) {
          setIsSuccess(true);
          // console.log('Results here')
          // console.log(response);
          const dataValues = response.dataValues;
          setResultsList(dataValues);
        } else if (response.status === "waiting") {
          setIsSuccess(false);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  };

  useEffect(() => {
    setRequestId(props.id);
    fetchResults(requestId);
  }, [props.id, requestId]);

  const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData =
        typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;

    var CSV = "";

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV === "") {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    var fileName = "NEOH_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>

      <div className="close_button_container">
        <div className={"downLoad"}>
          <button onClick={() => JSONToCSVConvertor(resultsList, "see_results", true)}>
            Download CSV
          </button>
        </div>
        <SecondaryButton btnLink={props.closeHandler} btnText="X" />
      </div>
      {isLoading && <Loader displayText="Loading results. Please wait" />}

      {!isSuccess && !isLoading && (
        <p>Results aren't ready yet. Please go back to status page!</p>
      )}

      {isSuccess && !isLoading && (
        <SecondaryTable columns={columns} data={resultsList}/>
      )}
    </>
  );
};

export default Results;
