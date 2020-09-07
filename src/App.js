import React from 'react';
import {connect} from 'react-redux';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {Button} from 'antd';

import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

class App extends React.Component {
    render() {
        return (
            <div>
                hello
                <Button type="primary">测试按钮</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
