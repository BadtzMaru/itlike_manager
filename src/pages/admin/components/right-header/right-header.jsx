import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './right-header.css';
import ajax from '../../../../api';
import { checkLogout, removeUser } from '../../../../api/adminApi';

const { Header } = Layout;
const { confirm } = Modal;

class RightHeader extends Component {
	static propTypes = {
		collapsed: PropTypes.bool.isRequired,
		toggle: PropTypes.func.isRequired,
	};

	componentDidMount() {
		// 获取当前城市天气
		// this._weather();
	}

	// 天气预报
	// https://restapi.amap.com/v3/weather/weatherInfo?key=9c3bb5b50f35a3f045417e6526fffe4f&city=350100&output=JSON
	_weather() {
		const city = '350100';
		const key = '9c3bb5b50f35a3f045417e6526fffe4f';
		const url = `https://restapi.amap.com/v3/weatherInfo?key=${key}&city=${city}&output=JSON`;
		ajax(url)
			.then((data) => {
				console.log(data);
				if (data.status === '0') {
					// message.error('网络异常: ' + data.info);
				}
			})
			.catch((error) => {
				console.log(error);
				message.error('网络异常: ' + error);
			});
	}

	// 退出登录
	_logout = () => {
		confirm({
			title: '您确定退出嘛?',
			icon: <ExclamationCircleOutlined />,
			content: '再想想看嘛~',
			cancelText: '取消',
			okText: '确定',
			onOk: () => {
				checkLogout().then((result) => {
					removeUser();
					if (result && result.status === 1) {
						message.success(result.msg);
					} else {
						message.success('服务器内部出现问题');
					}
					this.props.history.replace('/login');
				});
			},
			onCancel() {},
		});
	};

	render() {
		return (
			<Header className='header' style={{ padding: 0 }}>
				{React.createElement(
					this.props.collapsed
						? MenuUnfoldOutlined
						: MenuFoldOutlined,
					{
						className: 'trigger',
						onClick: this.props.toggle,
					}
				)}
				<div className='navbar-header'>
					<h3 className='navbar-brand'>引擎计划-后台管理系统</h3>
					<div className='navbar-header-right'>
						<Button
							type='danger'
							className='exit-btn'
							onClick={this._logout}
						>
							退出
						</Button>
					</div>
				</div>
			</Header>
		);
	}
}

export default withRouter(RightHeader);
