import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from "moment";
import "moment/locale/zh-cn";
// 引入Provider组件
import {Provider} from 'react-redux';
import store from "./store";

moment.locale('zh-cn');


ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
    </Provider>
    , document.getElementById('root'));

