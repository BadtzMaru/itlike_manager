import ajax from './index';
import { saveObj, getObj, removeObj } from '../tools/cache-tool';
import config from '../config/config';
/*
 *   提供给外部是否登录的函数
 * */
export const isLogin = () => {
	let userObj = getObj(config.ADMIN_KEY);
	return !!userObj.token;
};
/*
 *   登录接口
 * */
export const checkLogin = (account, password) => {
	return ajax('/api/auth/admin/login', { account, password }, 'post');
};
/*
 *   退出登录
 * */
export const checkLogout = () => {
	return ajax('/api/auth/admin/logout');
};
/*
 *   保存用户登录信息
 * */
export const saveUser = (userObj) => {
	saveObj(config.ADMIN_KEY, userObj);
};
/*
 *   删除本地存储登录信息
 * */
export const removeUser = () => {
	removeObj(config.ADMIN_KEY);
};
/*
 *   获取用户信息
 * */
export const getUser = () => {
	return getObj(config.ADMIN_KEY);
};
/*
 *   修改管理员信息
 * */
export const changeAdminMsg = (token, account_name, account_icon) => {
	return ajax(
		'/api/auth/admin/edit',
		{ token, account_name, account_icon },
		'post'
	);
};
/*
 *   修改管理员密码
 * */
export const changeAdminPwd = (token, old_pwd, new_pwd) => {
	return ajax(
		'/api/auth/admin/reset_pwd',
		{ token, old_pwd, new_pwd },
		'post'
	);
};
