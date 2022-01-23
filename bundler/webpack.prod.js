const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const JsonMinimizerPlugin = require("json-minimizer-webpack-plugin");

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'production',
        plugins:
        [
            new CleanWebpackPlugin({
                verbose: true,
            }),
            new CopyWebpackPlugin([ { 
                from: path.resolve(__dirname, '../static'),
                
            } ]),
            
        ],
        module: {
          rules: [
            {
              test: /\.json$/i,
              type: "asset/resource",
            },
          ],  
        },
        optimization: {
          minimize: true,
          minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new JsonMinimizerPlugin(),
          ],
            splitChunks: {
              chunks: 'async',
              minSize: 2000,
              maxSize: 5000,
              minRemainingSize: 0,
              minChunks: 2,
              maxAsyncRequests: 30,
              maxInitialRequests: 30,
              enforceSizeThreshold: 50000,
              cacheGroups: {
                defaultVendors: {
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  reuseExistingChunk: true,
                },
                default: {
                  minChunks: 2,
                  priority: -20,
                  reuseExistingChunk: true,
                },
              },
            },
          }
    },
    
)
