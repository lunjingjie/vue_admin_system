module.exports = {
  lintOnSave: false,
  // 去掉map文件的生成
  productionSourceMap: false,
  // 配置dev代理服务器
  devServer: {
    port: 9010,
    open: true,
    // 代理配置
    proxy: {
      '/api': {
        secure: false,
        // 解决跨域问题, 在本地虚拟一个服务器接受请求，
        // 并代理发送请求
        changeOrigin: true,
        // 目标host
        target: 'http://192.168.1.198:12000',
        // 192.168.1.100:1111/api/xxx => 192.168.1.100:1111/xxx
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
