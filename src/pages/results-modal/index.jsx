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
      Header: "Value",
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
        if (response.status === "success") {
          setIsSuccess(true);
          const dataValues = response.result.dataValues;
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

  return (
    <>
      <div className="close_button_container">
        <SecondaryButton btnLink={props.closeHandler} btnText="X" />
      </div>
      {isLoading && <Loader displayText="Loading results. Please wait" />}

      {!isSuccess && !isLoading && (
        <p>Results aren't ready yet. Please go back to status page!</p>
      )}

      {isSuccess && !isLoading && (
        <SecondaryTable columns={columns} data={resultsList} />
      )}
    </>
  );
};

export default Results;
