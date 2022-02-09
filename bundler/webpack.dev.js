import webpackMerge from 'webpack-merge';
import commonConfiguration from './webpack.common.js';

export default webpackMerge(commonConfiguration, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    contentBase: './dist',
    open: false,
    https: true,
    useLocalIp: false,
  },
});
