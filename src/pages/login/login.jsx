import React, {Component} from "react";
import {connect} from 'react-redux';
import {Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import md5 from 'blueimp-md5';

import './css/login.css';
import xl from './images/xiaoliao.png';
import {checkLogin, saveUser} from '../../api/adminApi';
import config from '../../config/config';

class Login extends Component {
    render() {
        const onFinish = values => {
            // 对密码进行MD5加密
            const hash_pwd = md5(values.password, config.KEY);
            // 处理登录业务
            checkLogin(values.account, hash_pwd).then((result) => {
                if (result && result.status === 1) {
                    // 保存用户信息到本地
                    message.success(result.msg);
                    saveUser(result.data);
                    // 跳转到主面板
                    this.props.history.replace('/');
                } else if (result && result.status === 0) {
                    message.warning(result.msg);
                } else {
                    message.error('网络出现一点小问题');
                }
            }).catch((error) => {
                message.error('服务器端内部错误');
            });
        };
        return (
            <div className="login">
                <div className="login-wrap">
                    <div className="avatar">
                        <img src={xl} alt=""/>
                    </div>
                    <div className="content">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                        >
                            <Form.Item name="account" rules={[{required: true, message: '账户名不能为空!'}]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入账户"/>
                            </Form.Item>
                            <Form.Item name="password" rules={[{required: true, message: '密码不能为空!'}]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(Login)
