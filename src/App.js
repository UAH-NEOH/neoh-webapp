import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import  { About, Settings, NoMatch, Welcome2}  from './pages/views'
import { Navigation } from './navigation'
import styles from './App.module.css'
import {Home} from "./pages";
import DataLoad from "./pages/views/dataLoad";


const MyApp = () => (<BrowserRouter>
    <div className={styles.container}>
        <div className={styles.right}>
           {/* <div style={{justifyContent: "center", alignContent: "center", display: "flex"}}>
                <img src="https://neoh-logo.s3.amazonaws.com/neoh-logo.png" width="70" height="70" />
                <div style={{"margin-top": "15px"}}><h2 >Earth Observation Data Importer</h2></div>
            </div>*/}
            <Navigation
            />
            <br/>

            <Switch

            >

                <Route
                    // Home route, will render "Home" component
                    // when "/" is the current url
                    exact
                    path="/"
                    component={Welcome2}
                />

                <Route
                    // Home route, will render "Home" component
                    // when "/" is the current url
                    exact
                    path="/home"
                    component={Home}
                />

                <Route
                    // Menu item for the data load
                    exact
                    path="/dataload"
                    component={DataLoad}
                />

                <Route
                    exact
                    path="/settings"
                    component={Settings}
                />

                <Route
                    exact
                    path="/about"
                    component={About}
                />

                <Route
                    // 404 page
                    // The `NoMatch` component will redirect to "/"
                    component={NoMatch}
                />
            </Switch>
        </div>
    </div>
</BrowserRouter>

)

export default MyApp
