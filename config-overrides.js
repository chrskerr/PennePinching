
const { override, addWebpackPlugin, useBabelRc } = require( 'customize-cra' );
// const AntdDayjsWebpackPlugin = require( 'antd-dayjs-webpack-plugin' );
// const webpack = require('webpack');

// const dayjsPlugin = new AntdDayjsWebpackPlugin()

// module.exports = override( addWebpackPlugin( new webpack.DefinePlugin({ dayjsPlugin }) ) );
module.exports = override( useBabelRc() );
