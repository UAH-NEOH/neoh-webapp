import { SecondaryButton } from "../../components/index";
import React, { useState } from "react";
import styles from "../../views/Form.module.css";

const RequestForm = (props) => {
    const [selectedDataset, setSelectedDataset] = useState("");
    const [selectedOrgUnit, setSelectedOrgUnit] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("");

    const handleDatasetSelection = (e) => {
        e.persist();
        if(e.target.value !== null) {
            setSelectedDataset((prev) => e.target.value);
        }
    };

    const handleOrgUnitSelection = (e) => {
        e.persist();
        if(e.target.value !== null) {
            setSelectedOrgUnit((prev) => e.target.value);
        }
    };


    const handleStartDateSelection = (e) => {
        e.persist();
        if(e.target.value !== null) {
            setSelectedStartDate((prev) => e.target.value);
        }
    };

    const handleEndDateSelection = (e) => {
        e.persist();
        if(e.target.value !== null) {
            setSelectedEndDate((prev) => e.target.value);
        }
    };

    const handleFormSubmission = () => {
        if (selectedDataset === "") {
            setHasError(true);
            setError("Please specify dataset!");
            return;
        } else if (selectedOrgUnit === "") {
            setHasError(true);
            setError("Please specify org unit!");
            return;
        } else if (selectedStartDate === "") {
            setHasError(true);
            setError("Please select start date!");
            return;
        } else if (selectedEndDate === "") {
            setHasError(true);
            setError("Please select end date!");
            return;
        }
        setHasError(false);

        props.onSubmit({
            dataset: selectedDataset,
            org_unit: selectedOrgUnit,
            start_date: selectedStartDate,
            end_date: selectedEndDate,
        });
    };

    return (

        <div className="form_container">
            <div className={styles.headerText}> Import Earth Observation </div>
            <div className="form">
                <div className={styles.formTemplate}>
                    <label htmlFor="dataset" className={styles.labelClass}>Earth Observation Datasets</label>
                    <select id="dataset" name="dataset" onChange={handleDatasetSelection}>
                        <option value="" selected="true" disabled="disabled">Select Dataset</option>
                        <option value="precipitation">Precipitation</option>
                        <option value="temperature">Temperature</option>
                        <option value="vegetation">Vegetation</option>
                    </select>



                        <label htmlFor="org_unit" className={styles.labelClass}>Organizational Unit Levels</label>
                        <select id="org_unit" name="org_unit" onChange={handleOrgUnitSelection}>
                            <option value="" selected="true" disabled="disabled">Select Organizational Unit</option>
                            {props.organizationUnits.map((orgUnit) => {
                                return (
                                    <option id="org_unit" value={orgUnit.name}>
                                        {orgUnit.name}
                                    </option>
                                );
                            })}
                        </select>



                        <label htmlFor="start_date" className={styles.labelClass}>Start Date</label>
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            start_date="2020-01-01"
                            onChange={handleStartDateSelection}
                        />

                        <label htmlFor="end" className={styles.labelClass}>End Date</label>
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            start_date="2020-01-01"
                            onChange={handleEndDateSelection}
                        />
                </div>
            </div>
            {hasError && <p className="errormsg">{error}</p>}
            <SecondaryButton
                btnText="Create New Request"
                Class="button_secondary"
                btnLink={handleFormSubmission}
                disable={props.disabled}
            />
        </div>

    );
};

export default RequestForm;
