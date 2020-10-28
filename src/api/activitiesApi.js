import ajax from './index';

/*
 *   1. 获取地址
 * */
export const getActivitiesAddress = () =>
	ajax('/api/auth/activities/activities_address');
/*
 *   2. 获取招收对象
 * */
export const getActivitiesObject = () =>
	ajax('/api/auth/activities/activities_object');
/*
 *   2. 获取营期
 * */
export const getActivitiesBus = () =>
	ajax('/api/auth/activities/activities_bus');
/*
 *   3. 添加活动
 * */
export const addActivities = (
	token,
	activities_name,
	activities_time,
	activities_img,
	activities_price,
	activities_tag,
	activities_count,
	activities_address_id,
	activities_object_id,
	activities_bus_day_id,
	activities_intro,
	activities_trip,
	activities_day,
	activities_notice,
	is_focus,
	focus_img
) =>
	ajax(
		'/api/auth/activities/add',
		{
			token,
			activities_name,
			activities_time,
			activities_img,
			activities_price,
			activities_tag,
			activities_count,
			activities_address_id,
			activities_object_id,
			activities_bus_day_id,
			activities_intro,
			activities_trip,
			activities_day,
			activities_notice,
			is_focus,
			focus_img,
		},
		'post'
	);
/*
 *   4. 获取活动列表
 * */
export const getActivitiesList = (page_num, page_size) =>
	ajax('/api/auth/activities/list', { page_num, page_size });
/*
 *   5. 设置是否轮播图
 * */
export const setFocusActivities = (id, is_focus) =>
	ajax('/api/auth/activities/set_focus_activities', { id, is_focus });
/*
 *   6. 删除直播课程
 * */
export const deleteActivities = (id) =>
	ajax('/api/auth/activities/delete_activities', { id });
/*
 *   7. 修改一条直播课
 * */
export const editActivities = (
	token,
	id,
	activities_name,
	activities_time,
	activities_img,
	activities_price,
	activities_tag,
	activities_count,
	activities_address_id,
	activities_object_id,
	activities_bus_day_id,
	activities_intro,
	activities_trip,
	activities_day,
	activities_notice,
	is_focus,
	focus_img
) =>
	ajax(
		'/api/auth/activities/edit',
		{
			token,
			id,
			activities_name,
			activities_time,
			activities_img,
			activities_price,
			activities_tag,
			activities_count,
			activities_address_id,
			activities_object_id,
			activities_bus_day_id,
			activities_intro,
			activities_trip,
			activities_day,
			activities_notice,
			is_focus,
			focus_img,
		},
		'post'
	);
