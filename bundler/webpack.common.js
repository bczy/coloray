const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/index.ts'),
    output:
    {
        filename: 'bundle.[fullhash].js',
        path: path.resolve(__dirname, '../dist'),
        
    },
    plugins:
    [
        new CopyWebpackPlugin([ { from: path.resolve(__dirname, '../static') } ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../static/index.html'),
            minify: true
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module:
    {
        rules:
        [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
                
            },
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    'style-loader',
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader',
                    'glslify-loader'
                ]
            }
        ]
    }
}
