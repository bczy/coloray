import webpackMerge from 'webpack-merge'
import commonConfiguration from './webpack.common.js'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { resolve } from 'path'
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin"

export default webpackMerge(
    commonConfiguration,
    {
        mode: 'production',
        plugins:
        [
            new CleanWebpackPlugin({
                verbose: true,
            }),
            new CopyWebpackPlugin([ { 
                from: resolve(__dirname, '../static'),
                
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
