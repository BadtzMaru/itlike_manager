import ajax from './index';

/*
*   1. 获取分类
* */
export const getResourceCategory = () => ajax('/api/auth/resource/r_category');
/*
*   2. 获取所属班级
* */
export const getResourceClasses = () => ajax('/api/auth/resource/r_classes');
/*
*   3. 获取所属区域
* */
export const getResourceArea = () => ajax('/api/auth/resource/r_Area');
/*
*   4. 获取所属格式
* */
export const getResourceFormat = () => ajax('/api/auth/resource/r_format');
/*
*   5. 获取所属材料
* */
export const getResourceMate = () => ajax('/api/auth/resource/r_mate');
/*
*   6. 添加资源
* */
export const addResource = (
    token,
    resource_name,
    resource_author,
    resource_publish_time,
    resource_content,
    resource_category_id,
    resource_classes_id,
    resource_area_id,
    resource_mate_id,
    resource_format_id,
    resource_img,
    resource_price,
    is_focus,
    focus_img,
) => ajax('/api/auth/resource/add', {
    token,
    resource_name,
    resource_author,
    resource_publish_time,
    resource_content,
    resource_category_id,
    resource_classes_id,
    resource_area_id,
    resource_mate_id,
    resource_format_id,
    resource_img,
    resource_price,
    is_focus,
    focus_img,
}, 'post');
/*
*   7. 获取资源列表
* */
export const getResourceList = (page_num, page_size) => ajax('/api/auth/resource/list', {page_num, page_size});
/*
*   8. 是否设为轮播图
* */
export const setFocusResource = (id, is_focus) => ajax('/api/auth/resource/set_focus_resource', {id, is_focus});
/*
*   9. 删除资源
* */
export const deleteResource = (id) => ajax('/api/auth/resource/delete_resource', {id});
/*
*   10. 获取上传文件
* */
export const getFileList = (tag) => ajax('/api/auth/resource/file_list',{tag});
/*
*   11. 编辑资源
* */
export const editResource = (
    token,
    id,
    tag,
    resource_name,
    resource_author,
    resource_publish_time,
    resource_content,
    resource_category_id,
    resource_classes_id,
    resource_area_id,
    resource_mate_id,
    resource_format_id,
    resource_img,
    resource_price,
    is_focus,
    focus_img,
) => ajax('/api/auth/resource/edit', {
    token,
    id,
    tag,
    resource_name,
    resource_author,
    resource_publish_time,
    resource_content,
    resource_category_id,
    resource_classes_id,
    resource_area_id,
    resource_mate_id,
    resource_format_id,
    resource_img,
    resource_price,
    is_focus,
    focus_img,
}, 'post');
