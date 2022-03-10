import React, { useState, useEffect, useCallback } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchStatusMessage as fetchStatusService,
  startCloudWorkflow as startCloudWorkflowService,
} from "../../services/api";
import { Table, Button, Card, Loader, SecondaryButton } from "../../components";
import RequestForm from "./request-form";
import PrepareCloudWorkflowPayload from "./cloud-workflow";
import { Results } from "../../pages";
import Modal from "react-modal";
import "./style.css";

const customStyles = {
  content: {
    top: "12%",
    bottom: "12%",
    left: "20%",
    right: "20%",
  },
};

const columns = [
  {
    Header: "Dataset",
    accessor: "dataset",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Message",
    accessor: "message",
  },
  {
    Header: "Date Created",
    accessor: "creation_time",
  },

  {
    Header: "View",
    accessor: "action",
  },
];

const initialRequestIdList = [
  // "1HRUq2kEQQ",
  // "bjAwLPMPwd",
  // "dk00foKRqP",
  // "DB27ynegt9",
  // "NSYq1WYfKM",
  // "FAMB8rfpne",
];

const organizationUnits = [
  {
    name: "National",
    created: "2011-12-24T12:24:22.935",
    lastUpdated: "2015-08-09T12:58:05.003",
    translations: [],
    externalAccess: false,
    userGroupAccesses: [],
    userAccesses: [],
    favorites: [],
    displayName: "National",
    level: 1,
    favorite: false,
    id: "H1KlN4QIauv",
    attributeValues: [],
  },
  {
    name: "District",
    created: "2011-12-24T12:24:22.935",
    lastUpdated: "2015-08-09T12:58:04.997",
    translations: [],
    externalAccess: false,
    userGroupAccesses: [],
    userAccesses: [],
    favorites: [],
    displayName: "District",
    level: 2,
    favorite: false,
    id: "wjP19dkFeIk",
    attributeValues: [],
  },
  {
    name: "Chiefdom",
    created: "2011-12-24T12:24:22.935",
    lastUpdated: "2015-08-09T12:58:05.001",
    translations: [],
    externalAccess: false,
    userGroupAccesses: [],
    userAccesses: [],
    favorites: [],
    displayName: "Chiefdom",
    level: 3,
    favorite: false,
    id: "tTUf91fCytl",
    attributeValues: [],
  },
  {
    name: "Facility",
    created: "2011-12-24T12:24:22.935",
    lastUpdated: "2015-08-09T12:58:05.005",
    translations: [],
    externalAccess: false,
    userGroupAccesses: [],
    userAccesses: [],
    favorites: [],
    displayName: "Facility",
    level: 4,
    favorite: false,
    id: "m9lBJogzE95",
    attributeValues: [],
  },
  {
    name: "Level 5",
    translations: [],
    externalAccess: false,
    userGroupAccesses: [],
    userAccesses: [],
    favorites: [],
    displayName: "Level 5",
    level: 5,
    favorite: false,
    attributeValues: [],
  },
  {
    name: "Level 6",
    translations: [],
    externalAccess: false,
    userGroupAccesses: [],
    userAccesses: [],
    favorites: [],
    displayName: "Level 6",
    level: 6,
    favorite: false,
    attributeValues: [],
  },
];

if (typeof window !== "undefined") {
  injectStyle();
}

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [requestStatus, setRequestStatus] = useState("waiting");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);

  const openModal = (e) => {
    setModalIsOpen(true);
    setSelectedRequestId(e.target.id);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRequestId("");
  };

  const selectedRowsHandler = selectedRequestIds.reduce((obj, curr) => {
    const ind = statusList.findIndex((status) => status.request_id === curr);
    return { ...obj, [ind]: true };
  }, {});

  const getLocalStorageRequestIds = () => {
    const saved = localStorage.getItem("request_id");
    return JSON.parse(saved);
  };

  const saveRequestIdListToLocalStorage = (requestIdList) => {
    localStorage.setItem("request_id", JSON.stringify(requestIdList));
  };

  const popLocalStorageRequestId = (reqId) => {
    var saved = getLocalStorageRequestIds();

    var filtered = saved.filter((d) => !reqId.includes(d));
    saveRequestIdListToLocalStorage(filtered);

    var savedStatusList = statusList;

    var filteredStatusList = savedStatusList.filter(
      (d) => !reqId.includes(d.request_id)
    );
    setStatusList(filteredStatusList);
  };

  const handleRowSelection = useCallback((selectedFlatRows) => {
    if (Object.keys(selectedFlatRows).length > 0) {
      var tmpIds = [];
      console.log(selectedFlatRows);
      selectedFlatRows.map((r) => {
        tmpIds.push(r.request_id);
        return null;
      });
      setSelectedRequestIds(() => {
        return [...tmpIds];
      });
      setIsRowSelected(true);
    } else {
      setIsRowSelected(false);
      setSelectedRequestIds([]);
    }
  }, []);

  const handleClearRowSelection = () => {
    popLocalStorageRequestId(selectedRequestIds);
    setIsRowSelected(false);
    setSelectedRequestId("");
    toast.success("Deleted selected row(s) successfully!");
  };

  const getStatusMessages = useCallback(() => {
    const body = JSON.stringify({
      request_id: getLocalStorageRequestIds(),
    });
    var tempStatus = "success";
    fetchStatusService(body)
      .finally(() => setIsLoading(false))
      .then((statusMessages) => {
        statusMessages.map((statusMsg) => {
          if (statusMsg.status === "success") {
            statusList.map((sl) => {
              if (
                sl.request_id === statusMsg.request_id &&
                sl.status !== "success"
              ) {
                //using simple logic to display successful toast message
                toast.success(statusMsg.request_id + " is successful");
              }
            });

            statusMsg.action = (
              <Button
                id={statusMsg.request_id}
                btnText="See Results"
                btnLink={openModal}
              />
            );
          }
          if (statusMsg.status !== "success") {
            tempStatus = "waiting";
          }

          return ;
        });
        setStatusList(() => {
          return [...statusMessages];
        });
        console.log("request status is: ", tempStatus);
        setRequestStatus(tempStatus);
      })
      .catch((error) => {
        console.log("error is: ", error); //todo: handle error properly
        setHasError(true);
      });
  }, [statusList, setStatusList]);

  useEffect(() => {
    const saved = getLocalStorageRequestIds();
    if (saved === null || saved.length === 0) {
      saveRequestIdListToLocalStorage(initialRequestIdList);
    }

    console.log("overall request status here is: ", requestStatus);
    if (requestStatus !== "waiting") {
      return;
    }

    const interval = setInterval(() => {
      console.log("calling get_status api");
      getStatusMessages();
    }, 5000); //run every 5 sec until status is set to waiting!
    return () => clearInterval(interval);
  }, [requestStatus, getStatusMessages]);

  const requestFormSubmitHandler = (data) => {
    setIsCreatingRequest(true);

    console.log("request data is :", data);

    if (data.org_unit !== "District") {
      console.log("currently overriding org_unit selection with District data");
      organizationUnits.map((orgUnit) => {
        if (orgUnit.name === "District") {
          data.org_unit = orgUnit.name;
          data.level = orgUnit.level;
        }
      });
    }

    const payload = PrepareCloudWorkflowPayload(
      data.dataset,
      data.org_unit,
      data.level,
      data.start_date,
      data.end_date
    );
    console.log("payload is : ", payload);
    startCloudWorkflowService(JSON.stringify(payload))
      .finally(() => setIsCreatingRequest(false))
      .then((data) => {
        const newRequestId = data.request_id;
        const requestIds = getLocalStorageRequestIds();
        saveRequestIdListToLocalStorage([newRequestId, ...requestIds]);
        setRequestStatus(getStatusMessages());
      })
      .catch((err) => {
        setHasError(true);
        console.log("error occured while requesting cloud workflow ", err);
      });
  };

  return (
    <div>
      <ToastContainer />
      <RequestForm
        onSubmit={requestFormSubmitHandler}
        disabled={isCreatingRequest}
        organizationUnits={organizationUnits}
      />

      {isLoading && !hasError && (
        <Loader  displayText="Loading status! Please wait" />
      )}

      {!isLoading && !hasError && (
        <>
          <Table
            columns={columns}
            data={statusList}
            onSelect={handleRowSelection}
            selectedRows={selectedRowsHandler}
          ></Table>

          <div className="clear_button_container">
            <SecondaryButton
              id={selectedRequestId}
              btnText="Clear"
              btnLink={handleClearRowSelection}
              disable={!isRowSelected}
            />
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Results id={selectedRequestId} closeHandler={closeModal} />
          </Modal>
        </>
      )}
      {hasError && <p>Oops! Something went wrong. Try refreshing the page.</p>}
    </div>
  );
};

export default Home;
