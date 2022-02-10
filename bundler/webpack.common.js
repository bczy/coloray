const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

export const entry = _resolve(__dirname, '../src/index.ts');
export const output = {
  filename: 'bundle.[fullhash].js',
  path: _resolve(__dirname, '../dist'),
};
export const plugins = [
  new CopyWebpackPlugin([{ from: _resolve(__dirname, '../static') }]),
  new HtmlWebpackPlugin({
    template: _resolve(__dirname, '../static/index.html'),
    minify: true,
  }),
];
export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};
export const module = {
  rules: [
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
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
    // JS
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },

    // CSS
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },

    // Images
    {
      test: /\.(jpg|png|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images/',
          },
        },
      ],
    },

    // Shaders
    {
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    },
  ],
};
