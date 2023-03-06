import config from "../config";

const API_BASE_URL = config.apiBaseUrl;
const CLOUD_WORKFLOW_URL = config.cloudWorkflowBaseUrl;

const RESOURCE_GET_STATUS = "get-status";
const RESOURCE_GET_RESULT = "get-result";
const RESOURCE_START_CLOUD_WORKFLOW = "start-process";

const post = (resourceName, data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };

  let url = "";
  if (resourceName === RESOURCE_START_CLOUD_WORKFLOW) {
    url = `${CLOUD_WORKFLOW_URL}/${resourceName}`;
  } else {
    url = `${API_BASE_URL}/${resourceName}`;
  }
  return fetch(url, requestOptions);
};

export function startCloudWorkflow(data) {
  return post(RESOURCE_START_CLOUD_WORKFLOW, data)
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => {
      throw err;
    });
}

export function fetchStatusMessage(data) {
  return post(RESOURCE_GET_STATUS, data)
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => {
      throw err;
    });
}

export function fetchResultData(data) {
  return post(RESOURCE_GET_RESULT, data)
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => {
      throw err;
    });
}
