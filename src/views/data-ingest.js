import React, {useEffect, useState} from "react";
import {Card, InputField, Box} from '@dhis2/ui'

import {useDataMutation, useDataQuery} from '@dhis2/app-runtime'

import {CircularLoader} from '@dhis2/ui'
import {ComponentCover, CenteredContent} from '@dhis2/ui'

import {
    Button,
    InputFieldFF,
    SingleSelectFieldFF,

} from '@dhis2/ui'
import {ReactFinalForm} from '@dhis2/ui'
import styles from './Form.module.css'
import "react-datepicker/dist/react-datepicker.css"
import store from '../state/store'
import * as actions from '../state/action'
import {DataQuery} from '@dhis2/app-runtime'

import GetDataElementId from './getDataElementId'
import GetFilledOrgUnits from "./getFilledOrgUnits";
const {Field} = ReactFinalForm


export const DataIngest = () => {
  // let showSpinner = false

    const [showSpinner, setShowSpinner] = useState(false)
    const [end_date, setEDate] = useState('')
    const [start_date, setSDate] = useState('')
    const [request_id, setRequest_id] = useState('')
    const [orgz_unit, setOrgz_unit] = useState('')

    const [getOrgid, setgetOrgid] = useState([])

    const [precipitationId, setPrecipitationId] = useState('')
    const [temperatureId, setTemperatureId] = useState('')
    const [vegetationId, setVegetationId] = useState('')
    const [dhis2Version, setDhis2Version] = useState('')

    let request_id_collection = []
    let org_level = 2
    // requestQuery(org_level);
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

    const saveDataElementId = (enteredElementId) => {
          if(enteredElementId){
                  setPrecipitationId(enteredElementId.result.value.precipitationDataElementId)
                  setTemperatureId(enteredElementId.result.value.temperatureDataElementId)
                  setVegetationId(enteredElementId.result.value.vegetationDataElementId)
                  setDhis2Version(enteredElementId.result.value.dhis_dist_version)

          }
    }

    // console.log(precipitationId, temperatureId, vegetationId, dhis2Version)

    const saveFilledOrgUnits = (enteredFilledOrgUnits) => {
        let dataobj = [];
        // TODO: Cleanup
        // if(enteredFilledOrgUnits){
        //     // console.log(enteredFilledOrgUnits.result);
        //     // const lvl = enteredFilledOrgUnits.result
        //     // dataobj = Object.entries(enteredFilledOrgUnits.result).map( ([key, value]) => ({ [key]: value }));
        //
        //      enteredFilledOrgUnits.result.map(obj => {
        //
        //         // console.log(obj.name);
        //         // console.log(obj.level);
        //         //  setgetOrgid((oldVal)=> {...oldVal,{obj.level} })
        //          dataobj[obj.name]= obj.level
        //     })
        //     setgetOrgid(dataobj);
        //     // console.log(dataobj);
        // }
    }
    const {loading, error, data, refetch} = useDataQuery(levQuery, {
        variables: {
            orgLevel: org_level
        }
    })


    const alertValues = (values) => {

        setOrgz_unit(values.org_unit)

        if (values.org_unit === 'District') {
            org_level = 2
        } else if (values.org_unit === 'Chiefdom') {
            org_level = 3
        } else if (values.org_unit === 'Facility') {
            org_level = 4
        }

        // console.log(data)
        // console.log(requestQuery(org_level));
        // console.log(values.org_unit === 'District')
        // console.log(values['org_unit'] === 'District')


        // console.log(JSON.stringify(org_boundary.organisationUnits[0]))

        const add_data = {
            data_element_id: '',
            stat_type: 'mean',
            boundaries: '',
            product: '',
            var_name: '',
            x_start_stride_stop: '',
            y_start_stride_stop: '',
            dhis_dist_version: dhis2Version

        }
        var final = Object.assign({}, values, add_data);
        // console.log(final)
        // oYJ51K7AJvQ
        // h7oZiAMGMpA John
        if (final.dataset === 'precipitation') {
            final.data_element_id = precipitationId;
            final.product = 'GPM_3IMERGDF_06';
            final.var_name = 'precipitationCal';

        }
        // afWPpfBwIaa
        // wDDqZnuOhwh John
        if (final.dataset === 'temperature') {
            final.product = 'MOD11B2';
            final.var_name = 'LST_Day_6km';
            final.data_element_id = temperatureId;

        }
        // bUBLqMJTkp4
        // yWETNJ3hrrp John
        if (final.dataset === 'vegetation') {
            final.product = 'MOD13A2';
            final.var_name = '_1_km_16_days_NDVI';
            final.x_start_stride_stop = '[0:5:1199]';
            final.y_start_stride_stop = '[0:5:1199]';
            final.data_element_id = vegetationId;

        }
            refetch({orgLevel: org_level}).then(response => {
            console.log(response);

            let buff = response.results.organisationUnits;
            final.boundaries = buff
            console.log(final);
            console.log(JSON.stringify(final))
            const formattedValuesString = JSON.stringify(values, null, 2)
            // alert(formattedValuesString)
            const AWSCloudUrl = 'https://9t06h5m4bf.execute-api.us-east-1.amazonaws.com/default/start_cloud_workflow';
            // content = <CircularLoader large className="loader"/>
            setShowSpinner(true);
            fetch(AWSCloudUrl, {
                method: 'post',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'text/plain'
                },
                mode: 'cors',
                body: JSON.stringify(final)
            }).then(res => res.text())
                .then(res => {
                    setShowSpinner(false);
                        // content = <></>
                        alert('Submitted the request to server');
                        console.log(res);

                        var add = JSON.parse(res);
                        console.log(add.request_id);
                        store.dispatch(actions.requestAdded(add.request_id))

                    }
                )




        // store.dispatch(actions.requestAdded("S8XNEZkB38"))
    }
            )}
    return (
        <>
            <CenteredContent position="top">
                <Box>
                    <Card className={styles.cardLay}>

                        <ReactFinalForm.Form onSubmit={alertValues}>
                            {({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.row}>
                                        <Field
                                            required
                                            name="dataset"
                                            label="Dataset"
                                            // Use `SingleSelectFieldFF` as component
                                            component={SingleSelectFieldFF}
                                            className={styles.title}
                                            initialValue="precipitation"
                                            options={[
                                                {label: 'Precipitation', value: 'precipitation'},
                                                {label: 'Temperature', value: 'temperature'},
                                                {label: 'Vegetation', value: 'vegetation'}
                                            ]}
                                        />
                                    </div>
                                    <div className={styles.row}>
                                        <Field
                                            required
                                            name="org_unit"
                                            label="Org Unit"
                                            // Use `SingleSelectFieldFF` as component
                                            component={SingleSelectFieldFF}
                                            className={styles.title}
                                            initialValue="District"
                                            options={[
                                                {label: 'National', value: 'National'},
                                                {label: 'District', value: 'District'},
                                                {label: 'Chiefdom', value: 'Chiefdom'}
                                            ]}
                                            onChange={(e) => setOrgz_unit(e.target.value)}
                                        />
                                        &nbsp; &nbsp;&nbsp;
                                        <Field
                                            name="agg_period"
                                            label="Agg Period"
                                            // Use `SingleSelectFieldFF` as component
                                            component={SingleSelectFieldFF}
                                            className={styles.title}
                                            initialValue="Daily"
                                            options={[
                                                {label: 'Daily', value: 'Daily'},
                                                {label: 'Monthly', value: 'Monthly'},
                                                {label: 'Yearly', value: 'Yearly'},
                                            ]}
                                        />
                                    </div>
                                    <div className={styles.row}>
                                        <Field
                                            required
                                            name="start_date"
                                            label="Start Date"
                                            type="date"
                                            component={InputFieldFF}
                                            value={start_date}
                                            className={styles.email}
                                            onChange={({value}) => setSDate(value)}
                                        />


                                        &nbsp;&nbsp;&nbsp;

                                        <Field
                                            required
                                            name="end_date"
                                            label="End Date"
                                            type="date"
                                            component={InputFieldFF}
                                            value={end_date}
                                            className={styles.email}
                                            onChange={({value}) => setEDate(value)}

                                        />

                                    </div>
                                    <div>

                                        <br/>
                                    </div>

                                    <div className={styles.row}>
                                    </div>

                                    <div className={styles.button}>

                                        <Button primary type="submit">
                                            Submit
                                        </Button>

                                    </div>
                                    {showSpinner?  <CenteredContent position="bottom">
                                        <CircularLoader large className={styles.spinner}/>
                                    </CenteredContent>: <></> }
                                </form>
                            )}

                        </ReactFinalForm.Form>


                    </Card>
                </Box>

            </CenteredContent>
            <GetDataElementId getInputData={saveDataElementId}/>
            <GetFilledOrgUnits getFilledOrg ={saveFilledOrgUnits}/>
        </>
    )
}

