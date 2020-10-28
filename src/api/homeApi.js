import ajax from './index';

// 各个资源的总数量
export const getSourceCount = () => ajax('/api/auth/home/source_count');
// 各个资源购买总数
export const getBuyCount = () => ajax('/api/auth/home/buy_count');
// 获取网站配置信息
export const getWebSiteInfo = () => ajax('/api/auth/home/info');
// 修改网站配置信息
export const editWebSite = (
    token,
    site_name,
    site_keyword,
    site_des,
    site_logo,
    site_copy,
    site_bei,
) => ajax('/api/auth/home/edit', {
    token,
    site_name,
    site_keyword,
    site_des,
    site_logo,
    site_copy,
    site_bei,
}, 'post');


