import webpackMerge from 'webpack-merge';
import commonConfiguration from './webpack.common.js';

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            contentBase: './dist',
            open: true,
            https: false,
            useLocalIp: true
        }
    }
)
