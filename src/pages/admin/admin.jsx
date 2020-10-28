import React, {Component} from "react";
import {connect} from 'react-redux';
import {Layout,Modal} from 'antd';
import {Switch, Redirect, Route} from 'react-router-dom';
import PubSub from 'pubsub-js';

import LeftNav from './components/left-nav/left-nav';
import RightHeader from './components/right-header/right-header';
import './admin.css';
import Home from "../home/home";
import Resource from "../resource/resource";
import LifeJob from "../lifejob/life-job";
import Lives from "../lives/lives";
import Activities from "../activities/activities";
import Setting from "../setting/setting";
import NotFound from "../notFound/not-found";
import {isLogin} from '../../api/adminApi';

const {Content, Footer} = Layout;

class Admin extends Component {
    componentDidMount() {
        // 订阅token失效信息w
        PubSub.subscribe('tokenOut',(msg)=>{
            if (msg === 'tokenOut') {
                Modal.warn({
                    title: '登录信息过期',
                    content: (
                        <div>
                            <p>请重新登录后再操作</p>
                        </div>
                    ),
                    onOk: ()=>{
                        this.props.history.replace('/login');
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe('tokenOut');
    }

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        if (!isLogin()) {
            return <Redirect to={"/login"}/>
        }
        return (
            <Layout className="admin-pane">
                <LeftNav collapsed={this.state.collapsed}/>
                <Layout>
                    <RightHeader collapsed={this.state.collapsed} toggle={this.toggle}/>
                    <Content className="admin-content">
                        <Switch>
                            <Redirect exact from="/" to="/home"/>
                            <Route path="/home" component={Home}/>
                            <Route path="/resource" component={Resource}/>
                            <Route path="/lifejob" component={LifeJob}/>
                            <Route path="/activities" component={Activities}/>
                            <Route path="/live" component={Lives}/>
                            <Route path="/setting" component={Setting}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer className="admin-footer">引擎计划-后台管理系统</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(null, null)(Admin)
