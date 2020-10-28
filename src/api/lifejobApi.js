import ajax from './index';

/*
 *   1. 获取学前所属分类
 * */
export const getJobPre = () => ajax('/api/auth/lifejob/job_pre');
/*
 *   2. 获取所属家园
 * */
export const getJobFamily = () => ajax('/api/auth/lifejob/job_family');
/*
 *   3. 添加职场人生
 * */
export const addJob = (
	token,
	job_name,
	job_img,
	job_author,
	job_time,
	job_content,
	job_pre_edu_id,
	job_family_edu_id,
	is_focus,
	focus_img
) =>
	ajax(
		'/api/auth/lifejob/add',
		{
			token,
			job_name,
			job_img,
			job_author,
			job_time,
			job_content,
			job_pre_edu_id,
			job_family_edu_id,
			is_focus,
			focus_img,
		},
		'post'
	);
/*
 *   4. 获取人生列表
 * */
export const getJobList = (page_num, page_size) =>
	ajax('/api/auth/lifejob/list', { page_num, page_size });
/*
 *   5. 设置是否轮播图
 * */
export const setFocusJob = (id, is_focus) =>
	ajax('/api/auth/lifejob/set_focus_job', { id, is_focus });
/*
 *   6. 删除直播课程
 * */
export const deleteJob = (id) => ajax('/api/auth/lifejob/delete_job', { id });
/*
 *   7. 修改职场人生
 * */
export const editJob = (
	token,
	id,
	job_name,
	job_img,
	job_author,
	job_time,
	job_content,
	job_pre_edu_id,
	job_family_edu_id,
	is_focus,
	focus_img
) =>
	ajax(
		'/api/auth/lifejob/edit',
		{
			token,
			id,
			job_name,
			job_img,
			job_author,
			job_time,
			job_content,
			job_pre_edu_id,
			job_family_edu_id,
			is_focus,
			focus_img,
		},
		'post'
	);
