import React,{Component} from "react";
import {connect} from 'react-redux';

class Login extends Component{
    render() {
        return (
            <div>登录</div>
        );
    }
}

export default connect(null,null)(Login)
