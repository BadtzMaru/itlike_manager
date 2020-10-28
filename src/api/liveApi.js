import ajax from './index';

/*
 *   1. 获取直播主题
 * */
export const getLiveTheme = () => ajax('/api/auth/live/live_theme');
/*
 *   2. 获取使用人群
 * */
export const getLivePerson = () => ajax('/api/auth/live/live_person');
/*
 *   3. 添加直播课程
 * */
export const addLive = (
	token,
	live_title,
	live_author,
	live_img,
	live_begin_time,
	live_end_time,
	live_price,
	live_person_id,
	live_theme_id,
	is_focus,
	focus_img,
	live_url
) =>
	ajax(
		'/api/auth/live/add',
		{
			token,
			live_title,
			live_author,
			live_img,
			live_begin_time,
			live_end_time,
			live_price,
			live_person_id,
			live_theme_id,
			is_focus,
			focus_img,
			live_url,
		},
		'post'
	);
/*
 *   4. 获取直播课程列表
 * */
export const getLive = (page_num, page_size) =>
	ajax('/api/auth/live/list', { page_num, page_size });
/*
 *   5. 设置是否轮播图
 * */
export const setFocusLive = (id, is_focus) =>
	ajax('/api/auth/live/set_focus_live', { id, is_focus });
/*
 *   6. 删除直播课程
 * */
export const deleteLive = (id) => ajax('/api/auth/live/delete_live', { id });
/*
 *   7. 修改一条直播课
 * */
export const editLive = (
	token,
	id,
	live_title,
	live_author,
	live_img,
	live_begin_time,
	live_end_time,
	live_price,
	live_person_id,
	live_theme_id,
	is_focus,
	focus_img,
	live_url
) =>
	ajax(
		'/api/auth/live/edit',
		{
			token,
			id,
			live_title,
			live_author,
			live_img,
			live_begin_time,
			live_end_time,
			live_price,
			live_person_id,
			live_theme_id,
			is_focus,
			focus_img,
			live_url,
		},
		'post'
	);
