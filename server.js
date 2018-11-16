const express = require('express');
const app = express();


/***************************** 开始启动反向代理 **********************************/
var proxy = require('http-proxy-middleware');//引入nodejs的反向代理模块


app.use('/PlatformMobileService/*', proxy({target: 'http://10.100.200.145:8081/', changeOrigin: true}));
app.listen(8080,()=>{
    console.log("项目启动");
});

// proxy middleware options
// var options = {
//     target: 'http://mobileapp.banggo.com', // target host
//     changeOrigin: true,               // needed for virtual hosted sites
// };
// // create the proxy (without context)
// var exampleProxy = proxy('/PlatformMobileService/*',options);
// app.use(exampleProxy);
// /***************************** 开始启动反向代理 **********************************/
//
// /**************************** 开启服务监听 ******************************/
// app.listen('http://169.254.245.143:8080', function() {
//     console.log('启动项目mpmdFront,端口：3000');
// });

