const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: 'localhost',
            contentBase: './dist',
            open: false,
            https: true,
            useLocalIp: false
        }
    }
)
