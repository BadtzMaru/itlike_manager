import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import md5 from 'blueimp-md5';
import { withRouter } from 'react-router-dom';
import { changeAdminPwd, getUser, removeUser } from '../../../api/adminApi';
import config from '../../../config/config';

class EditPassword extends React.Component {
	static propTypes = {
		visible: PropTypes.bool.isRequired,
		hideFunc: PropTypes.func.isRequired,
	};
	handleCancel = (e) => {
		console.log(e);
		this.props.hideFunc();
	};

	render() {
		const { visible } = this.props;
		const onFinish = (values) => {
			console.log(values);
			if (values.old_password === values.new_password)
				return message.warning('新密码和旧密码不能一致');
			// 密码加密
			const old_pwd = md5(values.old_password, config.KEY);
			const new_pwd = md5(values.new_password, config.KEY);
			// 调用接口
			changeAdminPwd(getUser().token, old_pwd, new_pwd)
				.then((result) => {
					if (result && result.status === 1) {
						message.success(result.msg);
						// 清除用户信息
						removeUser();
						// 路由跳转
						this.props.history.replace('/login');
					} else if (result && result.status === 0) {
						message.error(result.msg);
					} else {
						message.error('服务器内部错误');
					}
				})
				.catch(() => {
					message.error('修改密码失败');
				});
		};
		return (
			<Modal
				title='修改密码'
				visible={visible}
				onCancel={this.handleCancel}
				footer={null}
			>
				<Form
					onFinish={onFinish}
					ref={this.formRef}
					style={{ textAlign: 'center' }}
				>
					<Form.Item
						name={'old_password'}
						rules={[{ required: true, message: '请输入旧密码' }]}
					>
						<Input
							prefix={<LockOutlined />}
							type={'password'}
							placeholder={'请输入旧密码'}
						/>
					</Form.Item>
					<Form.Item
						name={'new_password'}
						rules={[{ required: true, message: '请输入新密码' }]}
					>
						<Input
							prefix={<LockOutlined />}
							type={'password'}
							placeholder={'请输入新密码'}
						/>
					</Form.Item>
					<Form.Item>
						<Button type={'primary'} htmlType={'submit'}>
							修改密码
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		);
	}
}

export default withRouter(EditPassword);
