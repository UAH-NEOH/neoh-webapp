import React from 'react'
import { Card } from '@dhis2/ui'
import styles from "./Form.module.css";
import {useDataQuery} from '@dhis2/app-runtime'

const levQuery = {
    filledOrganisationUnitLevels: {
        resource: 'filledOrganisationUnitLevels',
        params: {
            fields: 'name, level'
        },
    },
}
export const Settings = () => {

    const {loading, error, data} = useDataQuery(levQuery)
    console.log(data)

    return(
    <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>

            <Card className={styles.cardLaySettings} dataTest="dhis2-uicore-card">
                This page is only accessible to the User with <b>SysAdmin</b>  role.
            </Card>

    </div>
)}
