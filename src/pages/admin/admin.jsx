import React,{Component} from "react";
import {connect} from 'react-redux';

class Admin extends Component{
    render() {
        return (
            <div>主界面</div>
        );
    }
}

export default connect(null,null)(Admin)
