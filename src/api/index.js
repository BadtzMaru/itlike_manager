import axios from 'axios';

// 环境的切换
/*const runVersion = process.env.NODE_ENV;
if (runVersion === 'development') {
    axios.defaults.baseURL = 'http://demo.itlike.com/web/xlmc/api';
} else if (runVersion === 'production') {
    axios.defaults.baseURL = 'http://demo.itlike.com/web/xlmc/api';
}*/

// 请求的超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;';

// 配置请求拦截器
axios.interceptors.request.use((config) => {
    // 1. 一些情求需要统一加token
    // 2. 统一设置符合服务器要求的信息
    // 3. 每次请求前加上请求动画
    return config;
}, (error) => {
    return Promise.error(error);
});

// 配置响应拦截器
axios.interceptors.response.use((response) => {
    // 数据过滤
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response.data);
    }
}, (error) => {
    console.log(error);
})

export default function ajax(url = '', params = {}, method = 'get') {
    // 0. 定义变量
    let promise;
    // 1. 返回 Promise
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();
        // 1.1 判断请求的类型
        if (method === 'GET') {
            promise = axios({url, params});
        } else if (method === 'POST') {
            promise = axios({method, url, data: params});
        }
        // 1.2 处理结果并返回
        promise.then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}
