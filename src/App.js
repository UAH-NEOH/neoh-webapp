import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import  { Settings, NoMatch}  from './views'
import { Navigation } from './navigation'
import styles from './App.module.css'
import {Home} from "./pages";


const MyApp = () => (<BrowserRouter

>

    <div className={styles.container}>
        <div className={styles.left}>
            <Navigation

            />
        </div>

        <div className={styles.right}>
            <div style={{justifyContent: "center", alignContent: "center", display: "flex"}}>
                <img src="https://neoh-logo.s3.amazonaws.com/neoh-logo.png" width="70" height="70" />
                <h2 >Earth Observation Data Importer</h2>
            </div>
            <br/>


            <Switch

            >
                <Route
                    // Home route, will render "Home" component
                    // when "/" is the current url
                    exact
                    path="/"
                    component={Home}
                />

                <Route
                    exact
                    path="/settings"
                    component={Settings}
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
