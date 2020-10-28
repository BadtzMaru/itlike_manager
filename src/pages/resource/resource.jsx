import React from "react";
import {Switch, Route} from 'react-router-dom';
import AddResource from "./pages/add-resource";
import ResourceList from "./pages/resource-list";
import NotFound from "../notFound/not-found";
import EditResource from "./pages/edit-resource";

export default class Resource extends React.Component {
    render() {
        return (
            <Switch>
                <Route path={"/resource/add-resource"} component={AddResource}/>
                <Route path={"/resource/edit-resource"} component={EditResource}/>
                <Route path={"/resource"} component={ResourceList}/>
                <Route component={NotFound}/>
            </Switch>
        );
    }
}
