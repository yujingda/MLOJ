module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            '/api':{
                target:'http://101.201.101.186',
                changeOrigin:true,
                logLevel: 'debug',
                pathRewrite:{
                    '/api':'/api'
                }
            }
        }
    }
}