import React from 'react';
import { Card, Form, Input, message, Button } from 'antd';
import PubSub from 'pubsub-js';

import LikeUploadImg from '../../../components/LikeUploadImg';
import EditPassword from './edit-password';
import { getUser, saveUser, changeAdminMsg } from '../../../api/adminApi';
import config from '../../../config/config';

export default class AccountSetting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account_icon: '',
			editPwdPanelShow: false,
			account: '',
			account_name: '',
			token: '',
		};
		// 创建表单ref
		this.formRef = React.createRef();
	}

	componentDidMount() {
		// 获取本地管理员数据
		const userObj = getUser();
		this.setState(
			{
				account: userObj.account,
				account_name: userObj.account_name,
				account_icon: userObj.account_icon,
				token: userObj.token,
			},
			() => {
				// 设置默认值
				const { account, account_name } = this.state;
				this.formRef.current.setFieldsValue({
					account,
					account_name,
				});
			}
		);
	}

	// 修改密码
	editPassword = () => {
		this.setState({
			editPwdPanelShow: true,
		});
	};
	_hidePwdPanel = () => {
		this.setState({
			editPwdPanelShow: false,
		});
	};

	render() {
		const { account_icon } = this.state;
		const onFinish = (values) => {
			console.log(values);
			const { token, account_icon } = this.state;
			// 改用修改管理员信息接口
			changeAdminMsg(token, values.account_name, account_icon)
				.then((result) => {
					if (result && result.status === 1) {
						// 更新管理员信息
						saveUser(result.data);
						message.success(result.msg);
						// 告知外界管理员信息修改成功
						PubSub.publish('changeAdminMsg', {});
					}
				})
				.catch((error) => {
					message.error('管理员信息修改失败');
				});
		};
		const formItemLayout = {
			labelCol: {
				sm: { span: 6 },
			},
			wrapperCol: {
				sm: { span: 8 },
			},
		};

		return (
			<Card title={'管理员信息编辑'}>
				<Form
					{...formItemLayout}
					onFinish={onFinish}
					ref={this.formRef}
				>
					<Form.Item label={'账户名'} name={'account'}>
						<Input disabled />
					</Form.Item>
					<Form.Item
						label={'管理员名称'}
						name={'account_name'}
						rules={[
							{ required: true, message: '请输入管理员名称' },
						]}
					>
						<Input placeholder={'请添加一个昵称'} />
					</Form.Item>
					<Form.Item label={'管理员头像'} name={'account_icon'}>
						<LikeUploadImg
							upLoadBtnTitle={'上传头像'}
							upLoadName={'admin_avatar'}
							upLoadAction={'/api/auth/admin/upload_admin_icon'}
							successCallBack={(name) => {
								console.log(name);
								this.setState({
									account_icon: name,
								});
							}}
							upLoadImg={config.BASE_URL + account_icon}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ xs: { span: 24 } }}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<Button type={'primary'} htmlType={'submit'}>
								修改
							</Button>
							<div style={{ marginLeft: 10 }}>
								或者{' '}
								<span
									style={{ color: 'blue', cursor: 'pointer' }}
									onClick={this.editPassword}
								>
									修改密码
								</span>
							</div>
						</div>
					</Form.Item>
				</Form>
				<EditPassword
					visible={this.state.editPwdPanelShow}
					hideFunc={this._hidePwdPanel}
				/>
			</Card>
		);
	}
}
