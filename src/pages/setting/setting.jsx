import React from "react";
import {Switch, Route} from 'react-router-dom';

import AccountSetting from "./pages/account-setting";
import MemberCount from "./pages/member-count";
import NotFound from "../notFound/not-found";

export default class Setting extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/setting/account" component={AccountSetting}/>
                    <Route path="/setting/member" component={MemberCount}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}
