import React from 'react'
import styles from "./Form.module.css";



export const Welcome2 = () => {
    return(
        <div className={styles.settings_row}>
            <div >
                <div className="form-style-5 padding-style">
                    <div className="form_container">
                        <div className={styles.headerText}>  <img src="https://neoh-logo.s3.amazonaws.com/neoh-logo.png" width="70" height="70" /> NASA Earth Observations for Health (NEOH) </div>
                        <div className="form">
                            <div className={styles.formTemplate}>
                                Welcome to the <span className={styles.textHeader}>Earth observations data import wizard.</span>
                                <br/>
                                This DHIS2 plugin will allow you import NASA Earth observation data such as precipitation, surface temperature, and vegetation health into DHIS2.
                                To import NASA Earth Observations:
                                <br/>
                                <ul className="welcome">
                                    <li>Click the <span className={styles.textHeader}> Import Earth Observations</span> tab.</li>
                                    <li>Select the Earth observation you would like to import. You can choose between <a href="https://gpm.nasa.gov/data/imerg"  target="_blank">precipitation</a>, <a href="https://modis.gsfc.nasa.gov/data/dataprod/mod11.php"  target="_blank">surface temperature</a>, and <a href="https://modis.gsfc.nasa.gov/data/dataprod/mod13.php"  target="_blank">vegetation health</a>.
                                    </li>
                                    <li>Next, select the organizational unit to aggregate the data within those boundaries.</li>
                                    <li>Select the start date and end date.</li>
                                    <li>Select the “Request New Data” button.</li>
                                    <li>Your request and the progress will be displayed in the table.</li>
                                </ul>


                                <div className={styles.textHeader}> Info </div>

                                If the data elements for precipitation, temperature, and vegetation health have not been configured. Contact your system administrator. If you are an administrator select the <span className={styles.textHeader}>Settings</span> tab from the top menu to get started.

                                <br/>
                                <br/>
                                <div className={styles.textHeader}> Acknowledgement
                                </div>

                                This work was funded by NASA’s Earth Science Applied Sciences Program through their Health and Air Quality Program, grant #80NSSC19K0192 and performed by the University of Alabama in Huntsville (UAH).  More information about this plugin can be found at the project’s website <a href="https://www.itsc.uah.edu/home/projects/neoh-nasa-earth-observations-health"  target="_blank">NASA Earth Observations for Health</a>

                                <br/>
                                <br/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )}

