import { Menu, MenuItem,TabBar, Tab } from '@dhis2/ui'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

const NavigationItem = ({ path, label }) => {
    // browser history object
    const history = useHistory()

    // "null" when not active, "object" when active
    const routeMatch = useRouteMatch(path)
    // If "isActive" is not null and "isActive.isExact" is true
    const isActive = routeMatch?.isExact

    // Callback called when clicking on the menu item.
    // If the menu item is not active, navigate to the path
    const onClick = () => !isActive && history.push(path)

    return <Tab selected={isActive} onClick={onClick} >{label} </Tab>
}

NavigationItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}

export const Navigation = () => (
    <TabBar>
        <NavigationItem
            //Welcome
            label="Welcome"
            path="/">
        </NavigationItem>

        <NavigationItem
            // Menu item for the home page
            label="Import Earth Observations"
            path="/home">
        </NavigationItem>

        <NavigationItem
            // Menu item for the data load
            label="Data Viewer"
            path="/dataload">
        </NavigationItem>

        <NavigationItem
            // Menu item for the FAQ page
            label="Settings"
            path="/settings">
        </NavigationItem>

        <NavigationItem
            // Menu item for the FAQ page
            label="About"
            path="/about">
        </NavigationItem>
    </TabBar>
)
