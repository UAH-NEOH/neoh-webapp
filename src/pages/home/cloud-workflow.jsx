const PrepareCloudWorkflowPayload = (dataset, org_unit, boundaries, start_date, end_date, userStore) => {
  // let userStore = {
  //   dhis_dist_version: "guinea_1",
  //   vegetationDataElementId: "bUBLqMJTkp4",
  //   temperatureDataElementId: "afWPpfBwIaa",
  //   precipitationDataElementId: "oYJ51K7AJvQ",
  // };

  let payload = {
    dataset: dataset,
    org_unit: org_unit,
    agg_period: "Daily",
    start_date: start_date,
    end_date: end_date,
    data_element_id: "",
    stat_type: "mean",
    product: "",
    var_name: "",
    x_start_stride_stop: "",
    y_start_stride_stop: "",
    dhis_dist_version: userStore.dhis_dist_version,
    boundaries: boundaries
  };

  if (dataset === "precipitation") {
    payload.product = "GPM_3IMERGDF_06";
    payload.var_name = "precipitationCal";
    payload.x_start_stride_stop = "";
    payload.y_start_stride_stop = "";
    payload.data_element_id = userStore.precipitationDataElementId;
  } else if (dataset === "vegetation") {
    payload.product = "MOD13A2";
    payload.var_name = "_1_km_16_days_NDVI";
    payload.x_start_stride_stop = "[0:5:1199]";
    payload.y_start_stride_stop = "[0:5:1199]";
    payload.data_element_id = userStore.vegetationDataElementId;
  } else if (dataset === "temperature") {
    payload.product = "MOD11B2";
    payload.var_name = "LST_Day_6km";
    payload.x_start_stride_stop = "";
    payload.y_start_stride_stop = "";
    payload.data_element_id = userStore.temperatureDataElementId;
  }
  return payload;
};

export default PrepareCloudWorkflowPayload;
