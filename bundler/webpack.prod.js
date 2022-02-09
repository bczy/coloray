const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

export default webpackMerge(
    commonConfiguration,
    {
        mode: 'production',
        plugins:
        [
            new CleanWebpackPlugin()
        ]
    }
)
