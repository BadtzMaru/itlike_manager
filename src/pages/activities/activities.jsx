import React from "react";
import {Switch,Route} from 'react-router-dom';

import NotFound from "../notFound/not-found";
import AddActivities from "./pages/add-activities";
import ActivitiesList from "./pages/activities-list";
import EditActivities from "./pages/edit-activities";
export default class LifeJob extends React.Component{
    render() {
        return (
            <Switch>
                <Route path={"/activities/add-activities"} component={AddActivities}/>
                <Route path={"/activities/edit-activities"} component={EditActivities}/>
                <Route path={"/activities"} component={ActivitiesList}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}
