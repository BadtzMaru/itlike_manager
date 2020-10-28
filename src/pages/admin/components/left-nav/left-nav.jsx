import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import PubSub from 'pubsub-js';
// 引入目录JSON文件
import menus from './config/menuConfig';

import './fonts/iconfont.css';
import xl from './images/xiaoliao.png';
import './left-nav.css';

// 引入管理员数据
import { getUser } from '../../../../api/adminApi';
import config from '../../../../config/config';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

class LeftNav extends Component {
	state = {
		menuList: menus,
		account_name: getUser().account_name,
		account_icon: getUser().account_icon,
	};
	static propTypes = {
		collapsed: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		// 订阅管理员信息更新
		PubSub.subscribe('changeAdminMsg', (msg, data) => {
			if (msg === 'changeAdminMsg') {
				this.setState({
					account_name: getUser().account_name,
					account_icon: getUser().account_icon,
				});
			}
		});
	}

	/* 创建左侧菜单 */
	_renderMenu(menuList) {
		return menuList.map((item) => {
			// 取出一级菜单
			if (!item.children) {
				return (
					<Item key={item._key}>
						<Link to={item._key}>
							<span
								className={'iconfont ' + item.icon}
								style={
									this.props.collapsed
										? { fontSize: 25, marginLeft: -8 }
										: {}
								}
							></span>
							<span
								style={
									this.props.collapsed
										? { display: 'none' }
										: {}
								}
							>
								{item.title}
							</span>
						</Link>
					</Item>
				);
			} else {
				return (
					<SubMenu
						key={item._key}
						title={
							<span>
								<span
									className={'iconfont ' + item.icon}
									style={
										this.props.collapsed
											? { fontSize: 25, marginLeft: -8 }
											: {}
									}
								></span>
								<span
									style={
										this.props.collapsed
											? { display: 'none' }
											: {}
									}
								>
									{item.title}
								</span>
							</span>
						}
					>
						{this._renderMenu(item.children)}
					</SubMenu>
				);
			}
		});
	}

	// 根据当前的菜单列表以及当前的路由路径获取应该被展开的菜单项
	_getOpenKeys = (menuList, path) => {
		for (let i = 0; i < menuList.length; i++) {
			// 1. 获取配置对象
			let item = menuList[i];
			// 2. 判断
			if (
				item.children &&
				item.children.find((c_item) => c_item._key === path)
			)
				return item._key;
		}
		return '';
	};

	render() {
		/* 获取当前的路由 */
		const { account_name, account_icon, menuList } = this.state;
		let path = this.props.location.pathname;
		let openKeys = this._getOpenKeys(menuList, path);
		let pPath = path.substr(0, path.indexOf('/', 2));
		return (
			<Sider trigger={null} collapsible collapsed={this.props.collapsed}>
				<div className='logo'>
					<div
						className='avatar'
						style={
							this.props.collapsed
								? { width: 40, height: 40 }
								: {}
						}
					>
						<img
							src={
								account_icon
									? config.BASE_URL + account_icon
									: xl
							}
							alt=''
						/>
					</div>
					<h4>{account_name ? account_name : '撩课学院'}</h4>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[path]}
					selectedKeys={[path, pPath]}
					defaultOpenKeys={[openKeys]}
				>
					{this._renderMenu(this.state.menuList)}
				</Menu>
			</Sider>
		);
	}
}

export default withRouter(LeftNav);
