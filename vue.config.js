let path = require("path")
module.exports = {
    //代理
    devServer: {
        proxy: {
            '/api': {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
    },

}