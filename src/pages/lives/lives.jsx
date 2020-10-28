import React from "react";
import {Switch,Route} from 'react-router-dom';

import NotFound from "../notFound/not-found";
import AddLive from "./pages/add-live";
import LivesList from "./pages/lives-list";
import EditLive from "./pages/edit-live";
export default class LifeJob extends React.Component{
    render() {
        return (
            <Switch>
                <Route path={"/live/add-live"} component={AddLive}/>
                <Route path={"/live/edit-live"} component={EditLive}/>
                <Route path={"/live"} component={LivesList}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}
