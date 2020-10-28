const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/gaode_api',
		createProxyMiddleware({
			target: 'https://restapi.amap.com/v3',
			changeOrigin: true,
			pathRewrite: {
				'^/gaode_api': '/',
			},
		})
	);
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:5000',
			changeOrigin: true,
		})
	);
};
